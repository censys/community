# Censys New Host Risks Slack Alerts
[Slack bot](https://slack.com/help/articles/115005265703-Create-a-bot-for-your-workspace) that sends alerts for newly discovered host risks in the [Censys ASM platform](https://censys.io/).

![](https://i.imgur.com/OqIWkPK.png)

## Steps for getting started:
- Install the libraries in requirements.txt
   - ```pip install --upgrade -r requirements.txt```
- Set your Censys ASM API key
   - ```censys asm config```
   - (find your ASM API key here: https://app.censys.io/integrations)
- Set the variables in the **alert_host_risks.py** file
   - **CHECK_INTERVAL** - how often to check for new host risks *(in minutes)*
   - **RISK_SEVERITY_LOGLEVEL** - choose the minimum risk level you want to be alerted on. Options are 1, 2, 3, 4. (low, medium, high, critical)
   - feel free to also change any of the wording in the message that is sent to channels *(in main_loop())*
- Define your Slack bot *(steps below)*

## Define the bot in your Slack workspace:

   This script requires the use of a Slack bot account to send messages on its behalf. To do this, we will need to generate a slack bot and invite it to our Slack workspace.
   - Go to [api.slack.com](https://api.slack.com/apps?new_granular_bot_app=1)
   - **Create an app**, and give it a title like "Censys Alerting" 

   - Go to **Basic Information**
      - Here you can change the name, description, and picture of your bot
      - *I have included an app icon in this repo at /images/censys.jpeg*

      - ![](https://i.imgur.com/oznqMAz.png)

   - Go to **OAuth and Permissions**
      - Add the following scopes to the **Bot Token** section
      - ![](https://i.imgur.com/ulQc5Kb.png)
      
      - Install the bot to your workspace
      - ![](https://i.imgur.com/kgopkDc.png)

      - Copy the **Bot User OAuth Token**
      - ![](https://i.imgur.com/LRicxmu.png)

      - Open a new Terminal window
         - change directory to this folder
         - run the following: *(replace 'xoxb-your-token' with the Bot User OAuth Token we just copied)*
         ```
         export SLACK_BOT_TOKEN="xoxb-your-token"
         ```
   - **Invite the bot user to the channels** you want it to alert in by going to your channel settings. Under the "Integrations" tab, go to "Add an App".
   - ![](https://i.imgur.com/p4gkSm3.png)

Now just run the script:
``` 
python3 alert_host_risks.py
```

The script is set to run every 60 minutes by default. When new host risks are discovered, the bot will send alert all channels in Slack it is a member of with an attached csv report.
