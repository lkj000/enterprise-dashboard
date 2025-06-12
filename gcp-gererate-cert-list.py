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
        dict: A dictionary containing the update date and a list of formatted repository data.
    """

    with open(file_path, 'r') as f:
        data = json.load(f)

    with open(appowners_file_path, 'r') as f:
        appowners_data = json.load(f)

    with open(userdata_file_path, 'r') as f:
        userdata = json.load(f)

    appowners_dict = {item['AppCode']: item['AppOwner'] for item in appowners_data}
    userdata_dict = {item['displayName']: {"director": item['director'], "vp": item['vp'], "portfolio": item['portfolio']} for item in userdata}

    repository_names = []
    for item in data:
        appcode = item.get('appcode', '').upper()
        appowner = appowners_dict.get(appcode, 'Unknown')
        user_info = userdata_dict.get(appowner, {})
        if user_info == {}:
            user_info = userdata_dict.get(extract_first_and_last_name(appowner), {})
            appowner = extract_first_and_last_name(appowner)
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
            "AppCode": appcode,
            "DNS": item.get('dns', ''),
            "IP": item.get('ip', ''),
            "StartDate": item.get('startdate', ''),
            "EndDate": item.get('enddate', ''),
            "Issuer": item.get('issuer', ''),
            "Status": item.get('status', ''),
            "DaysToExpire":item.get('days_to_expire', ''),
            "AppOwner": appowner,
            "Team": director,
            "Department": vp,
            "Portfolio": portfolio
        })

    # Add the update_date and wrap the data in a "data" key
    result = {
        "update_date": datetime.now().strftime("%m/%d/%Y"),
        "data": repository_names
    }

    return result

# Replace 'gcp-generate-cert.json', 'appowners_list.json', and 'UserData.json' with the actual paths to your JSON files
file_path = 'gcp-generate-cert.json'
appowners_file_path = 'new_appowners_data.json'
userdata_file_path = 'UserData.json'
repository_data = extract_repository_names(file_path, appowners_file_path, userdata_file_path)

# Print the result as a JSON string with double quotes
print(json.dumps(repository_data, indent=4))
