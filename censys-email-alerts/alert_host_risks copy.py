from __future__ import print_function
import os.path
import base64
import pickle
from datetime import datetime
import sched, time
import logging

from googleapiclient.errors import HttpError
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials

from censys.asm import Events, HostsAssets

import csv
import mimetypes
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email.mime.image import MIMEImage
from email.mime.audio import MIMEAudio

# --- variables ---

MAIL_RECIPIENTS = ['tanner@censys.io']
MAIL_SUBJECT = "[Censys Alerts] New host risks discovered."
MAIL_BODY = "Attached is a csv of all new host risks that were discovered."
CHECK_INTERVAL = 60
RISK_SEVERITY_LOGLEVEL = 1

# If modifying these scopes, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/gmail.compose', 'https://www.googleapis.com/auth/gmail.send']

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

def get_gmail_service():
    creds = None
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.

    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    return build('gmail', 'v1', credentials=creds)

def create_message(sender, to, subject, message_text):
  """Create a message for an email.

  Args:
    sender: Email address of the sender.
    to: Email address of the receiver.
    subject: The subject of the email message.
    message_text: The text of the email message.

  Returns:
    An object containing a base64url encoded email object.
  """
  message = MIMEText(message_text)
  message['to'] = to
  message['from'] = sender
  message['subject'] = subject

  b64_bytes = base64.urlsafe_b64encode(message.as_bytes())
  b64_string = b64_bytes.decode()
  return {'raw': b64_string}

def create_message_with_attachment(sender, to, subject, message_text, file):
    """Create a message for an email.

    Args:
      sender: Email address of the sender.
      to: Email address of the receiver.
      subject: The subject of the email message.
      message_text: The text of the email message.
      file: The path to the file to be attached.

    Returns:
      An object containing a base64url encoded email object.
    """
    message = MIMEMultipart()
    message['to'] = to
    message['from'] = sender
    message['subject'] = subject

    msg = MIMEText(message_text)
    message.attach(msg)

    content_type, encoding = mimetypes.guess_type(file)

    if content_type is None or encoding is not None:
      content_type = 'application/octet-stream'
    main_type, sub_type = content_type.split('/', 1)
    if main_type == 'text':
      fp = open(file, 'r')
      msg = MIMEText(fp.read(), _subtype=sub_type)
      fp.close()
    elif main_type == 'image':
      fp = open(file, 'r')
      msg = MIMEImage(fp.read(), _subtype=sub_type)
      fp.close()
    elif main_type == 'audio':
      fp = open(file, 'r')
      msg = MIMEAudio(fp.read(), _subtype=sub_type)
      fp.close()
    else:
      fp = open(file, 'r')
      msg = MIMEBase(main_type, sub_type)
      msg.set_payload(fp.read())
      fp.close()

    filename = os.path.basename(file)
    msg.add_header('Content-Disposition', 'attachment', filename=filename)
    message.attach(msg)

    b64_bytes = base64.urlsafe_b64encode(message.as_bytes())
    b64_string = b64_bytes.decode()
    return {'raw': b64_string}

def send_message(service, user_id, message):
  """Send an email message.

  Args:
    service: Authorized Gmail API service instance.
    user_id: User's email address. The special value "me"
    can be used to indicate the authenticated user.
    message: Message to be sent.

  Returns:
    Sent Message.
  """
  try:
    message = (service.users().messages().send(userId=user_id, body=message)
               .execute())
    #print ('Message Id: %s' % message['id'])
    return message
  except HttpError as error:
    logging.error('An error occurred: %s' % error)

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

    service = get_gmail_service()

    # get the google profile of the user that gave us their permission to send emails on their behalf
    profile = service.users().getProfile(userId='me').execute()
    logging.info('Email address sending from: %s' % profile['emailAddress'])

    for recipient in MAIL_RECIPIENTS:
        message = create_message_with_attachment(profile['emailAddress'], recipient, MAIL_SUBJECT, MAIL_BODY, 'host-risks.csv')
        send_message(service, "me", message)
        logging.info('Sent email alert to: %s' % recipient)

    scheduler.enter((CHECK_INTERVAL*60), 1, main_loop, (sc,))

# --- main thread ---

if __name__ == '__main__':

    #set the logging config
    logging.basicConfig(handlers=[logging.FileHandler('log_alerts.log', 'a+', 'utf-8')], level=logging.INFO, format='%(asctime)s: %(message)s')

    # create a new scheduler to run the main loop task every X minutes
    scheduler.enter(0, 1, main_loop, (scheduler,))
    scheduler.run()