import json
import datetime

def read_json_file(js_file_path):
    with open(js_file_path, 'r') as file:
        return json.load(file)

# def read_js_file(js_file_path):
#     with open(js_file_path, 'r') as file:
#         content = file.read()
#         split_content = content.split('export const allRepoRuntimeData =')
#         if len(split_content) < 2:
#             raise ValueError(f"Unable to find 'export const allRepoRuntimeData =' in file {js_file_path}")
#         json_str = split_content[1].strip()
#         return json_str

def get_current_week():
    current_date = datetime.date.today()
    start_of_week = current_date - datetime.timedelta(days=current_date.weekday())
    return start_of_week.isoformat()

def update_weekly_data(automation_user_data, current_week, automation_user_count, other_users_count):    
    if not any(record['date'] == current_week for record in automation_user_data):        
        total_count = automation_user_count + other_users_count
        automation_user_data.append({
            'date': current_week,
            'automation_user_count': automation_user_count,
            'other_users_count': other_users_count,
            'total_count': total_count
        })
    return automation_user_data

def create_user_mapping(user_details):
    return {detail['user']: detail for detail in user_details}

def count_aggregation(data, user_mapping, automation_user_id, automation_user_file):
    user_count = {}
    automation_user_data = []
    current_week = get_current_week()

    try:
        with open(automation_user_file, 'r') as file:
            automation_user_data = json.load(file)
    except FileNotFoundError:
        pass

    for repo in data:
        for workflow in repo['workflows']:
            for run in workflow['total_workflow_runs']:
                user = run['q']
                if user in user_mapping:
                    display_name = user_mapping[user]['display_name']
                    manager = user_mapping[user]['manager']
                else:
                    display_name = "Automation User"
                    manager = "Babak Rahimi"
                user_count[user] = {
                    'count': user_count.get(user, {'count': 0})['count'] + 1,
                    'display_name': display_name,
                    'manager': manager
                }
    
    automation_user_count = user_count.get(automation_user_id, {'count': 0})['count']
    other_users_count = sum(details['count'] for user, details in user_count.items() if user != automation_user_id)
    automation_user_data = update_weekly_data(automation_user_data, current_week, automation_user_count, other_users_count)

    # Write the automation user data to file
    with open(automation_user_file, 'w') as file:
        json.dump(automation_user_data, file, indent=2)

    return user_count

def write_json_file(data, output_file):
    with open(output_file, 'w') as file:
        json.dump(data, file, indent=2)

def main(js_file_path, user_details_file, output_file, automation_user_id, automation_user_file):
    #json_str = read_js_file(js_file_path)
    data = read_json_file(js_file_path)
    user_details = read_json_file(user_details_file)
    user_mapping = create_user_mapping(user_details)
    aggregated_count = count_aggregation(data, user_mapping, automation_user_id, automation_user_file)
    formatted_output = [{'user':user, **details} for user, details in aggregated_count.items()]
    write_json_file(formatted_output, output_file)

js_file_path = 'src/data-json/allRepoRuntimeData.json'
user_details_file = 'src/data-json/allUserData.json'
output_file = 'src/data-json/allRepoRuntimeDataByUser.json'
automation_user_id = 'esd00gh'
automation_user_file = 'src/data-json/allRepoRuntimeDataByUserChart.json'
main(js_file_path, user_details_file, output_file, automation_user_id, automation_user_file)
