import json

# Load the JSON file
with open('UserData.json') as f:
    users = json.load(f)

print(len(users))
 #Loop through each object in the main array
for user in users:
    print("Working with user:", user['displayName'])
    portfolio = "" 
    hierarchy = []
    managerID = user['manager']
    counter = 0
    break_while_loop = False

    while counter < 5:
        for manager in users:
            if manager['userPrincipalName'] == managerID:
                if counter > 0 and managerID not in ["riyer00@safeway.com", "jsabe13@safeway.com", "TNGUY25@safeway.com", "ahug104@safeway.com"]:
                    hierarchy.append({
                        "managerName": manager['displayName'],
                        "managerJob": manager['jobTitle']
                    })
                managerID = manager['manager']
                if managerID == "riyer00@safeway.com":
                    print("Found portfolio Digital (Ramiya Iyer)!\n")
                    portfolio = "Digital (Ramiya Iyer)"
                    break_while_loop = True
                    break
                elif managerID == "jsabe13@safeway.com":
                    print("Found portfolio COG (Jim Saber)!\n")
                    portfolio = "COG (Jim Saber)"
                    break_while_loop = True
                    break
                elif managerID == "TNGUY25@safeway.com":
                    print("Found portfolio Manila!\n")
                    portfolio = "Manila"
                    break_while_loop = True
                    break
                elif managerID == "ahug104@safeway.com":
                    print("Found portfolio Information Security (Aaron Hughes)!\n")
                    portfolio = "Information Security (Aaron Hughes)"
                    break_while_loop = True
                    break       
                break
        if break_while_loop:
            break
        counter += 1
    
    if portfolio == "":
        print("No portfolio found!\n")
        user['hierarchy'] = []
    else:
        user['hierarchy'] = hierarchy
        
    user['portfolio'] = portfolio
    
    
    
# Write the updated users data to a new file
with open('UserData.json', 'w') as f:
    f.write('[\n')
    for i, user in enumerate(users):
        if i != 0:
            f.write(',\n')
        f.write(json.dumps(user))
    f.write('\n]')

# Adding VP and Director Fields
# Read the JSON file
with open('UserData.json', 'r') as file:
  data = json.load(file)

# Iterate through each record
for record in data:
  if record['hierarchy']:
    hierarchy = record['hierarchy']
    if len(hierarchy) == 1:
       if record['portfolio'] == 'Manila' :
          record['director'] = hierarchy[0].get('managerName')
          director_manager = next((user["manager"] for user in data if user["displayName"] == record['director']), "")
          vp_data = next((user for user in data if user["userPrincipalName"] == director_manager ), "")
          record['vp'] = vp_data["displayName"]                  
       else:
          manager = next((user["displayName"] for user in data if user["userPrincipalName"] == record['manager']), "")
          record['director'] = manager
          record['vp'] = hierarchy[0].get('managerName')
    elif len(hierarchy) >= 2:
        if record['portfolio'] == 'Manila' :
          record['director'] = hierarchy[-1].get('managerName')
          director_manager = next((user["manager"] for user in data if user["displayName"] == record['director']), "")
          vp_data = next((user for user in data if user["userPrincipalName"] == director_manager ), "")
          record['vp'] = vp_data["displayName"]
        else:
          record['director'] = hierarchy[-2].get('managerName')
          record['vp'] = hierarchy[-1].get('managerName')   
  else:
      if record['orgid'].count('.') == 2 and record['portfolio'] == 'Manila':
          manager = next((user["displayName"] for user in data if user["userPrincipalName"] == record['manager']), "")
          record['director'] = manager         
          director_manager = next((user["manager"] for user in data if user["displayName"] == manager ), "")
          vp_data = next((user for user in data if user["userPrincipalName"] == director_manager ), "")
          record['vp'] = vp_data["displayName"]  
      elif record['orgid'].count('.') == 2 and record['portfolio'] != 'Manila':     
          manager_data = next((user for user in data if user["userPrincipalName"] == record['manager']), "")
          record['director'] = None
          record['vp'] = manager_data['displayName']
      elif record['orgid'].count('.') == 1 :
          record['director'] = None
          record['vp'] = None
          managerID = record['manager']
          if managerID == "riyer00@safeway.com":
            print("Found portfolio Digital (Ramiya Iyer)!\n")
            record['portfolio'] = "Digital (Ramiya Iyer)"
          elif managerID == "jsabe13@safeway.com":
            print("Found portfolio COG (Jim Saber)!\n")
            record['portfolio'] = "COG (Jim Saber)"
          elif managerID == "TNGUY25@safeway.com":
            print("Found portfolio Manila!\n")
            record['portfolio'] = "Manila"
          elif managerID == "ahug104@safeway.com":
            print("Found portfolio Information Security (Aaron Hughes)!\n")
            record['portfolio'] = "Information Security (Aaron Hughes)"    
      elif record['orgid'].count('.') == 0 :
          record['director'] = None
          record['vp'] = None
          userID = record['userPrincipalName']
          if userID == "riyer00@safeway.com":
            print("Found portfolio Digital (Ramiya Iyer)!\n")
            record['portfolio'] = "Digital (Ramiya Iyer)"
          elif userID == "jsabe13@safeway.com":
            print("Found portfolio COG (Jim Saber)!\n")
            record['portfolio'] = "COG (Jim Saber)"
          elif userID == "TNGUY25@safeway.com":
            print("Found portfolio Manila!\n")
            record['portfolio'] = "Manila"
          elif userID == "ahug104@safeway.com":
            print("Found portfolio Information Security (Aaron Hughes)!\n")
            record['portfolio'] = "Information Security (Aaron Hughes)"    
      else: 
          record['director'] = None
          record['vp'] = None
          record['portfolio'] = None

# Write the updated JSON back to the same file
with open('UserData.json', 'w') as file:
  file.seek(0)  # Move the file pointer to the beginning
  file.truncate()  # Clear the file content
  json.dump(data, file)

# Read the user data and copilot user data
with open("UserData.json") as users_file, open("CopilotUserData.json") as copilot_user_file:
    users = json.load(users_file)
    json_data = json.load(copilot_user_file)

# Access the 'data' key in the JSON file
copilotusers = json_data.get('data', [])

# Process each user record
for i, obj in enumerate(users, start=1):
    print(f"Processing record {i}")
    # initialize the coplit value 
    copilot = 'No'
    
    # Truncate the domain part in a single command
    userPrincipalName = obj.get("userPrincipalName", "").split("@")[0]
    print(userPrincipalName)
    
    # Find the copilot status for the user
    copilot = next((copilotuser["CopilotEnabled"] for copilotuser in copilotusers if copilotuser["user"] == userPrincipalName), "No")
    
    # Update the user object with copilot status
    obj["copilotEnabled"] = copilot

# Overwrite the original UserData.json file with the modified data
with open("UserData.json", "w", encoding="utf-8") as users_file:
    json.dump(users, users_file, indent=4)

print("All users processed")



