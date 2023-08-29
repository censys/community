import os
import sched, time
import pickle
from datetime import datetime
import logging
import csv

from censys.asm import Events

from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError

# --- variables ---

# time (in minutes) that we check for new host risks
CHECK_INTERVAL = 60

# Risks of this level and higher will be alerted on
# options are 1 - low, 2 - medium, 3 - high, 4 - critical
RISK_SEVERITY_LOGLEVEL = 1

scheduler = sched.scheduler(time.time, time.sleep)

# --- functions ---

def load_lastrun():
    try:
        ct = None
        with open ('lastrun', 'rb') as fp:
            ct = pickle.load(fp)
            fp.close
    except FileNotFoundError:
        return None
    return ct


def save_lastrun():
    ct = datetime.utcnow()
    ct_formatted = ct.strftime('%Y-%m-%dT%H:%M:%SZ')
    with open('lastrun', 'wb') as fp:
        pickle.dump(ct_formatted, fp)
        fp.close
    return ct_formatted

def get_slack_client():
    return WebClient(token=os.environ['SLACK_BOT_TOKEN'])

def include_risk(severity):
    risk_level = 1
    if(severity == "medium"):
        risk_level = 2
    if(severity == "high"):
        risk_level = 3
    if(severity == "critical"):
        risk_level = 4
    return risk_level >= RISK_SEVERITY_LOGLEVEL

def get_host_risks():
  e = Events()

  lastrun = load_lastrun()
  if lastrun == None:
    cursor = e.get_cursor(filters=["HOST_RISK"])
  else:
    cursor = e.get_cursor(lastrun, filters=["HOST_RISK"])

  events = e.get_events(cursor)
  save_lastrun()

  host_risks = []
  for event in events:
    # only show logbook events with the 'add' tag
    if event["operation"] == "ADD" and include_risk(event["data"]["severity"]):
        host_risk = {}
        host_risk["timestamp"] = event["timestamp"]
        host_risk["ip_address"] = event["entity"]["ipAddress"]
        host_risk["risk_title"] = event["data"]["title"]
        host_risk["severity"] = event["data"]["severity"]
        host_risks.append(host_risk)

  return host_risks

def build_csv(dict):
    with open('host-risks.csv', 'w') as csvfile:
      writer = csv.DictWriter(csvfile, fieldnames=["timestamp", "ip_address", "risk_title", "severity"])
      writer.writeheader()
      writer.writerows(dict)

def main_loop(sc): 
    logging.info("Checking for new host risks.")
    
    #get censys host risks
    host_risks = get_host_risks()

    if len(host_risks) == 0:
      logging.info("No new host risks.")
      scheduler.enter((CHECK_INTERVAL*60), 1, main_loop, (sc,))
      return
    else:
      logging.info(f"{len(host_risks)} new host risks found.")

    # build the csv from the host risks dict
    build_csv(host_risks)

    client = get_slack_client()

    try:
        channels = client.users_conversations(types = ["public_channel","private_channel"])
        if channels['ok'] is True:
            channels_list = []
            # for every channel this bot user is invited to, send the alert and share the csv report
            for channel in channels['channels']:
                channels_list.append(channel['id'])
                response = client.chat_postMessage(channel=channel['id'], text=f"{len(host_risks)} new host risks found.")
                assert response["message"]["text"] == f"{len(host_risks)} new host risks found."

            client.files_upload(channels=channels_list, file=open('host-risks.csv', 'rb'))
    except SlackApiError as e:
        assert e.response["ok"] is False
        assert e.response["error"]
        logging.error(f"Slack error: {e.response['error']}")

    scheduler.enter((CHECK_INTERVAL*60), 1, main_loop, (sc,))

# --- main thread ---

#set the logging config
logging.basicConfig(handlers=[logging.FileHandler('log_alerts.log', 'a+', 'utf-8')], level=logging.INFO, format='%(asctime)s: %(message)s')

# create a new scheduler to run the main loop task every X minutes
scheduler.enter(0, 1, main_loop, (scheduler,))
scheduler.run()
