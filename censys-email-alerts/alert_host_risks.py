from __future__ import print_function
import os.path
import base64
import pickle
from datetime import datetime
import sched, time
import logging

import win32com.client as win32

from censys.asm import Events, HostsAssets

import csv
import mimetypes
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email.mime.image import MIMEImage
from email.mime.audio import MIMEAudio

# --- variables ---

MAIL_RECIPIENTS = "tanner@censys.io"
MAIL_SUBJECT = "[Censys Alerts] New host risks discovered."
MAIL_BODY = "Attached is a csv of all new host risks that were discovered."
CHECK_INTERVAL = 60
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

def include_risk(severity):
    risk_level = 1
    if(severity == "medium"):
        risk_level = 2
    if(severity == "high"):
        risk_level = 3
    if(severity == "critical"):
        risk_level = 4
    return risk_level >= RISK_SEVERITY_LOGLEVEL

def create_and_send_message():
  
  try:
    outlook = win32.Dispatch('outlook.application')
    mail = outlook.CreateItem(0)
    mail.To = MAIL_RECIPIENTS
    mail.Subject = MAIL_SUBJECT
    mail.Body = MAIL_BODY
    #mail.HTMLBody = '<h2>HTML Message body</h2>' #this field is optional

    # To attach a file to the email (optional):
    attachment  = "host-risks.csv"
    mail.Attachments.Add(attachment)

    mail.Send()
  except:
    logging.error('An error occurred while sending')

def get_host_risks():
  e = Events()
  h = HostsAssets()

  lastrun = load_lastrun()
  if lastrun == None:
    cursor = e.get_cursor(filters=["HOST_RISK"])
  else:
    cursor = e.get_cursor(lastrun, filters=["HOST_RISK"])

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
    
    # get censys host risks
    host_risks = get_host_risks()

    if len(host_risks) == 0:
      logging.info("No new host risks.")
      scheduler.enter((CHECK_INTERVAL*60), 1, main_loop, (sc,))
      return
    else:
      logging.info(f"{len(host_risks)} new host risks found.")

    # build the csv from the host risks dict
    build_csv(host_risks)

    message = create_and_send_message()
    logging.info('Sent email alert to: ' % MAIL_RECIPIENTS)

    scheduler.enter((CHECK_INTERVAL*60), 1, main_loop, (sc,))

# --- main thread ---

if __name__ == '__main__':

    #set the logging config
    logging.basicConfig(handlers=[logging.FileHandler('log_alerts.log', 'a+', 'utf-8')], level=logging.INFO, format='%(asctime)s: %(message)s')

    # create a new scheduler to run the main loop task every X minutes
    scheduler.enter(0, 1, main_loop, (scheduler,))
    scheduler.run()