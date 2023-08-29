
import sched, time
import pickle
import logging
import os
from dotenv import load_dotenv

from censys.asm import Events
from tenable.io import TenableIO

load_dotenv()

# --- variables ---

# time (in minutes) that we check for new host changes
# this should be set to 24 hours (1440 minutes)
CHECK_INTERVAL = 1440

TENABLE_API_KEY = os.getenv("TENABLE_API_KEY")
TENABLE_API_SECRET = os.getenv("TENABLE_API_SECRET")
TIO = TenableIO(access_key=TENABLE_API_KEY, 
                secret_key=TENABLE_API_SECRET,
                vendor='Censys External Scan',
                product='Censys ASM',
                build='0.0.1'
                )

scheduler = sched.scheduler(time.time, time.sleep)

# --- functions ---

def load_last_event():
    try:
        ct = None
        with open ('lastrun', 'rb') as fp:
            ct = pickle.load(fp)
            fp.close
    except FileNotFoundError:
        return None
    return ct


def save_last_event(last_event_id):
    with open('lastrun', 'wb') as fp:
        pickle.dump(last_event_id, fp)
        fp.close
    return last_event_id

# gets all associated and disassociated hosts from censys in a dictionary
def get_new_hosts():
    e = Events()

    last_event_id = load_last_event()
    if last_event_id == None:
        cursor = e.get_cursor(filters=["HOST"])
    else:
        cursor = e.get_cursor(last_event_id, filters=["HOST"])

    events = e.get_events(cursor)

    hosts = {}
    hosts_associated = []
    hosts_disassociated = []

    for event in events:
        if last_event_id == None or event['id'] > last_event_id:
            last_event_id = event['id'] + 1
        if event["operation"] == "ASSOCIATE":
            hosts_associated.append(event['entity']['ipAddress'])
            # if we are associating a host, make sure we clean up any old disassocations
            if event['entity']['ipAddress'] in hosts_disassociated:
                hosts_disassociated.remove(event['entity']['ipAddress'])

        elif event["operation"] == "DISASSOCIATE":
            hosts_disassociated.append(event['entity']['ipAddress'])
            # if we are disassociating a host, make sure we clean up any old assocations
            if event['entity']['ipAddress'] in hosts_associated:
                hosts_associated.remove(event['entity']['ipAddress'])

    save_last_event(last_event_id)

    hosts['associated'] = hosts_associated
    hosts['disassociated'] = hosts_disassociated

    print(hosts)

    return hosts

# returns True if ip exists in Tenable. False if it does not exist in Tenable
def check_ip_exists_in_tenable(censys_ip, tenable_ips):
    for tenable_ip in tenable_ips:
        if tenable_ip['ipv4'] == censys_ip:
            return True
    return False

# imports all provided IPs (an array) to Tenable Vulnerability Management
def import_ips_to_tenable(ips):

    # get a current list of tenable IPs
    tenable_ips = TIO.assets.list()

    # go through all ips we are adding from censys
    for censys_ip in ips:
        # Check if the IP is not already present in Tenable.
        if check_ip_exists_in_tenable(censys_ip, tenable_ips) == False:

            print(f"Adding IP {censys_ip} to Tenable")
            
            new_tenable_ip = TIO.assets.asset_import('Censys Scan', {
                'ipv4': [censys_ip],
            })

            if new_tenable_ip is not None:
                print("Successfully added Censys IP to Tenable")
            else:
                print("Error adding Censys IP to Tenable")

# removes all provided IPs (an array) from Tenable Vulnerability Management
def remove_ips_from_tenable(ips):

    # get a current list of tenable IPs
    tenable_ips = TIO.assets.list()

    # go through all ips we are adding from censys
    for censys_ip in ips:
        # Check if the IP is present in Tenable.
        if check_ip_exists_in_tenable(censys_ip, tenable_ips):

            print(f"Removing IP {censys_ip} to Tenable")
            
            removed_asset = TIO.asset.delete(censys_ip)

            if removed_asset is not None:
                # if the asset was successfully removed from Tenable
                
                print("Successfully removed disassociated Censys IP from Tenable")

            else:
                print("Error removing disassociated Censys IP from Tenable")

def main_loop(sc): 
    logging.info("Checking for new Censys hosts since last run.")
    
    #get censys hosts, associated and disassociated since lastrun
    hosts = get_new_hosts()

    if len(hosts['associated']) == 0 and len(hosts['disassociated']) == 0:
      logging.info("No new hosts found in Censys.")
      scheduler.enter((CHECK_INTERVAL*60), 1, main_loop, (sc,))
      return
    else:
        logging.info(f"{len(hosts['associated'])} new hosts found.")
        import_ips_to_tenable(hosts['associated'])

        logging.info(f"{len(hosts['disassociated'])} hosts found to be disassociated.")
        remove_ips_from_tenable(hosts['disassociated'])

    scheduler.enter((CHECK_INTERVAL*60), 1, main_loop, (sc,))

# --- main thread ---

#set the logging config
logging.basicConfig(handlers=[logging.FileHandler('log_hosts.log', 'a+', 'utf-8')], level=logging.INFO, format='%(asctime)s: %(message)s')

# create a new scheduler to run the main loop task every X minutes
scheduler.enter(0, 1, main_loop, (scheduler,))
scheduler.run()