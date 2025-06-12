import json
with open('src/data/veracode.js', 'r') as f:
    data = f.read()
    data = data.replace('export const VeracodeData = ', '')
    veracodejs = json.loads(data)

with open('src/data-json/userInfo/UserData.json', 'r') as f:
    userData = json.load(f)

for v in veracodejs:
    appOwner = v['ApplicationOwner']
    user = [u for u in userData if u['displayNane'] == appOwner]
    realVp = user[0].get('vp', None) if len(user) > 0 else None
    v['PortfolioVP'] = realVp

with open('src/data/veracodejs', 'w') as f:
    f.write('export const VeracodeData = ' + json.dumps(veracodejs, indent=2))