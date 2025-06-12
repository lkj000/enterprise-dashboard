import json
from datetime import datetime

def extract_first_and_last_name(full_name):
    """Extracts the first and last name from a full name string,
    removing any middle names."""
    names = full_name.split()
    return f"{names[0]} {names[-1]}"

def extract_repository_names(file_path, appowners_file_path, userdata_file_path):
    """Extracts repository names from a JSON file and formats them with appcode, appowner, director, and vp.

    Args:
        file_path (str): The path to the JSON file.
        appowners_file_path (str): The path to the appowners JSON file.
        userdata_file_path (str): The path to the UserData JSON file.

    Returns:
        dict: A dictionary containing the update_date and a list of formatted repository names under the data key.
    """

    with open(file_path, 'r') as f:
        data = json.load(f)

    with open(appowners_file_path, 'r') as f:
        appowners_data = json.load(f)

    with open(userdata_file_path, 'r') as f:
        userdata = json.load(f)

    appowners_dict = {item['AppCode']: item['AppOwner'] for item in appowners_data}
    appowners_dict_ldap = {item['AppCode']: item['AppOwnerldap'] for item in appowners_data}
    userdata_dict = {item['userPrincipalName'].split('@')[0].upper(): {"director": item['director'], "vp": item['vp'], "portfolio": item['portfolio'], "displayName": item['displayName']} for item in userdata}

    repository_names = []
    for item in data:
        appcode = item.get('appcode', '').upper()
        appowner = appowners_dict.get(appcode, 'Unknown')
        appowners_ldap = appowners_dict_ldap.get(appcode, 'Unknown').upper()
        user_info = userdata_dict.get(appowners_ldap, {})

        # Check if AppOwnerldap is empty and match AppOwner with displayName
        if appowners_ldap == '':
            for user in userdata:
                if user.get('displayName', '').upper() == appowner.upper():
                    user_info = {"director": user['director'], "vp": user['vp'], "portfolio": user['portfolio']}
                    break

        director = user_info.get('director')
        vp = user_info.get('vp')
        portfolio = user_info.get('portfolio', 'Unknown')

        # Update portfolio if it is an empty string
        if portfolio == "Unknown":
            portfolio = "Not Available"

        # If director is null but vp and displayName are not null, replace director with displayName
        if director is None and vp is not None and portfolio not in ["Not Available", "Manila"]:
            director = appowner

        # If both director and vp are None and portfolio is "Manila", set director and vp accordingly
        if director is None and vp is None and portfolio == "Manila":
            director = appowner
            vp = "Trung Nguyen"

        # If director and vp are empty strings but portfolio is neither empty nor "Manila", set vp to appowner
        if director is None and vp is None and portfolio not in ["Not Available", "Manila"]:
            vp = appowner
            director = "Not Available"

        # Exclude entries where both director and vp are null (unless portfolio is "Manila")
        if director is None and vp is None:
            director = "Not Available"
            vp = "Not Available"
        # Update AppOwner if it is "Unknown Unknown"
        if appowner == "Unknown Unknown":
            appowner = "Not Available"
        if portfolio == "":
            portfolio = "Not Available"
        repository_names.append({
            "S-AccountEmail": item.get('sa_email', ''),
            "Project": item.get('project', ''),
            "AppCode": appcode,
            "Environment": item.get('environment', ''),
            "Expiry": item.get('expiry', ''),
            "KeyID": item.get('keyid', ''),
            "KeyType": item.get('keytype', ''),
            "DaysToExpire": item.get('days_to_expire', ''),
            "AutoRenew": item.get('auto_renew', ''),
            "Auto_Renew_GCP_Target_Project": item.get('auto_renew_gcp_target_project', ''),
            "Auto_Renew_GCP_Secret_ID": item.get('auto_renew_gcp_secret_id', ''),
            "Auto_Renew_GHA_Repositories": item.get('auto_renew_gha_repositories', ''),
            "Auto_Renew_GHA_GHA_Secret_ID": item.get('auto_renew_gha_gha_secret_id', ''),
            "Auto_Renew_Email_DGS": item.get('auto_renew_email_dgs', ''),
            "Auto_Renew_Email_ADGroups": item.get('auto_renew_email_adgroups', ''),
            "Live": item.get('live', ''),
            "AppOwner": appowner,
            "Team": director,
            "Department": vp,
            "Portfolio": portfolio
        })

    # Add update_date and wrap repository_names under the data key
    result = {
        "update_date": datetime.now().strftime("%m/%d/%Y"),
        "data": repository_names
    }

    return result

# Replace 'abc.json', 'appowners_list.json', and 'UserData.json' with the actual paths to your JSON files
file_path = 'gcp-sa-report.json'
appowners_file_path = 'new_appowners_data.json'
userdata_file_path = 'UserData.json'
repository_data = extract_repository_names(file_path, appowners_file_path, userdata_file_path)

# Print the result as a JSON string with double quotes
print(json.dumps(repository_data, indent=4))
