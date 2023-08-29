# Censys Tenable Vulnerability Management Integration
The Censys Tenable Vulnerability Management integration sits between the Censys Attack Surface Management platform and your Tenable Vulnerability Management instance.

The integration queries the Censys ASM platform's logbook API and feeds newly found hosts into Tenables' vulnerability management tool. It also provides a list of hosts that are no longer found to be part of an organization's attack surface, which can be used to remove IPs from the Tenable Vulnerability Management assets dashboard.

All IPs brought in from Censys will have 'Censys' as the source in Tenable to make them easy to sort on.

## In this guide: 
- [Installation Considerations](#installation-considerations)
- [Installation and Authentication](#install-the-libraries-and-authenticate)
- [Running the Program](#running-the-program)
- [Results in Tenable Vulnerability Management](#results-in-tenable-vulnerability-management)

# Installation considerations

The Censys Tenable Vulnerability Management integration is packaged to run as a Python script, which can be deployed on a variety of infrastructure types. High availability and concurrency management is at the discretion of the user. 

This integrations works with the [Tenable Vulnerability Management](https://www.tenable.com/products/tenable-io/) product.

# Installation and Authentication
- Install the libraries in requirements.txt
   - ```pip install --upgrade -r requirements.txt```
- Set your Censys ASM API key
   - ```censys asm config```
   - (find your Censys ASM API key here: https://app.censys.io/integrations)
- Rename the **.env_example** file to **.env**
   - Set your Tenable API keys in the **.env** file
      - (Your Tenable API keys can be generated like so: https://docs.tenable.com/security-center/Content/GenerateAPIKey.htm)

# Running the Program
You can open a terminal window, change directories to this folder, and run the script like so:
``` 
python3 sync_to_tenable_vm.py
```

An example output is provided below. It will log which IPs were associated and disassociated and their status on being added or removed from Tenable
```
tanner@workspace % python3 sync_to_tenable_vm.py
{'associated': ['1.1.1.1', '1.1.1.2'], 'disassociated': []}
Adding IP 1.1.1.1 to Tenable VM
Successfully added Censys IP to Tenable VM
Adding IP 1.1.1.2 to Tenable VM
Successfully added Censys IP to Tenable VM
```

# Results in Tenable Vulnerability Management

After the integration begins sending Censys logbook events to Tenable Vulnerability Management, hosts discovered by Censys will be fed into Tenables' vulnerability management system for scanning and monitoring.

![](https://i.imgur.com/yJcPRaj.png)