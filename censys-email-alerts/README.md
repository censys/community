# Censys New Host Risks Email Alerts
This script searches every 60 minutes *(by default)* for newly discovered host risks in the [Censys ASM platform](https://censys.io/). If any are found, emails will be sent to all configured recipients with a csv attachment of all newly found risks.

```
Checking for new host risks...
No new host risks.
Checking for new host risks...
No new host risks.
Checking for new host risks...
No new host risks.
Checking for new host risks...
11 new host risks found.
Email we will be sending from: exampleSender@gmail.com
Sent email alert to: exampleReceiver@example.com
```
![](https://i.imgur.com/r3Nr4Tz.png)

# Steps for getting started:
- Install the libraries in requirements.txt
   - ```pip install --upgrade -r requirements.txt```
- Set your Censys ASM API key
   - ```censys asm config```
   - (find your ASM API key here: https://app.censys.io/integrations)
- Set the variables in the **alert_host_risks.py** file
   - **MAIL_RECIPIENTS** - add any email addresses you want to recieve alerts
   - **MAIL_SUBJECT** - the subject line of the alert email
   - **MAIL_BODY** - the body of the alert email
   - **CHECK_INTERVAL** - how often to check for new host risks *(in minutes)*
   - **RISK_SEVERITY_LOGLEVEL** - choose the minimum risk level you want to be alerted on. Options are 1, 2, 3, 4. (low, medium, high, critical)
- Generate a Google API credential *(steps below)*

## Generate a Gmail API credential:

   This script requires the use of a Gmail account to send emails on its behalf. To do this, we will need to generate a json credential for that Google account.
   - Go to https://console.developers.google.com
   - **Create a project**, and give it a title like "Censys-Email-Alerts" 

   - ![](https://i.imgur.com/t1xMArI.png)

   - Go to **OAuth Consent Screen**
      - User Type -> **External**
      - Fill out the sections **App Information** and **Developer contact information**
      - On the next page in **Scopes**, manually add the following scopes
         - *https://www.googleapis.com/auth/gmail.compose*
         - *https://www.googleapis.com/auth/gmail.send*
      - On the next page in **Test Users**, add your own gmail address
      - Go back to the dashboard


   - **Create Credentials**, by going to "Credentials" within your project

   - ![](https://i.imgur.com/EI7DgTe.png)

   - Select **OAuth client ID**, by going to "Credentials" within your project

   - ![](https://i.imgur.com/pSGMD0U.png)

   - **Download** the JSON credential
      - rename it to **credentials.json**
      - move it to this directory
   

## Now just run the script:
``` 
python alert_host_risks.py
```

You will be asked to sign in the with a Google account in your browser. Sign in with one of the accounts that you added in **Test Users** in your application and grant it both of the **scopes** we defined *(compose and send)*. It will then successfully grant access and generate a **token.json** in this directory. This is the OAuth refresh token so that you won't have to sign in again until its expiration date is reached.


The script is set to run every 60 minutes by default. When new host risks are discovered, an email will be sent to the configured **MAIL_RECIPIENTS** with an attached csv.
