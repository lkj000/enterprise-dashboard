import json
import pandas as pd
from datetime import datetime

def extract_first_and_last_name(full_name):
  """Extracts the first and last name from a full name string,
  removing any middle names."""
  names = full_name.split()
  if len(names) > 2:
    return f"{names[0]} {names[-1]}"
  else:
    return full_name
  

# Load JSON data from file
with open('tatertotDetectData.json', 'r') as file, open("UserData.json") as users_file, open("appowners_list.json") as appowners_file:
    data = json.load(file)
    appowners = json.load(appowners_file)
    users = json.load(users_file)
    
# Convert the relevant part of the JSON data to a DataFrame
# Assuming the JSON structure has a list of records under a key, e.g., 'records'

# Assuming 'table_data' is a list of dictionaries
for item in data['table_data']:
    # intializing variables
    item['AppCode'] = ""
    item['AppOwner'] = ""
    item['Team'] = ""
    item['Department'] = ""
    item['Portfolio'] = ""
    # setting variables values
    repo_name = item['repository'].split('/')[-1]
    item['AppCode'] = repo_name.split('-')[0]
    item['AppOwner'] = next((appowner["AppOwner"] for appowner in appowners if appowner["AppCode"].lower() == item['AppCode'].lower()), "")
    item['Team'] = next((user["director"] for user in users if extract_first_and_last_name(user["displayName"].lower()) == extract_first_and_last_name(item['AppOwner'].lower())), "")
    item['Department'] = next((user["vp"] for user in users if extract_first_and_last_name(user["displayName"].lower()) == extract_first_and_last_name(item['AppOwner'].lower())), "")
    item['Portfolio'] = next((user["portfolio"] for user in users if extract_first_and_last_name(user["displayName"].lower()) == extract_first_and_last_name(item['AppOwner'].lower())), "")
    if item['Team'] is None and item['Department'] is not None :
        item['Team'] = item['AppOwner']
    elif (item['Team'] is None and item['Department'] is None and ( item['Portfolio'] != "Manila" or item['Portfolio']) is not None) : 
        item['Team'] = 'Not Applicable'
        item['Department']  = item['AppOwner']
    elif item['Team'] is None and item['vp'] is None and item['Portfolio'] == "Manila" :
        item['Team'] = item['AppOwner']
        item['Department']  = 'Trung Nguyen'


# Add the updated_date key with the current date in MM-DD-YYYY format
updated_date = datetime.now().strftime("%m/%d/%Y")
final_data = {"updated_date": updated_date}

# Merge the updated_date key with the original data
final_data.update(data)

# Write the updated JSON data back to the file
with open('tatertotDetectData.json', 'w') as file:
    json.dump(final_data, file, indent=4)
