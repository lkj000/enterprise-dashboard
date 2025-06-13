export function getOrgData (userInfo) {
  let newData = [], input = [];
  
  //Map userPrincipalName to display name (MANAGER)
  userInfo.forEach(item => {
    newData[item.userPrincipalName] = item.displayName;
  });
  
  //Remove service accounts
  var testData = userInfo.filter(item =>!item.displayName.toLowerCase().includes('(') || item.displayName.toLowerCase().includes('contractor'));
  var filteredData = testData.filter(item => /\d$/.test(String(item.userPrincipalName.split("@")[0]) ));
  
  input = filteredData.map(({mail, portfolio, hierarchy, ...user}, i) => {
    return {
      ...user,
      id: i+1,
      userPrincipalName: user.userPrincipalName.split("@")[0],
      manager: newData[user.manager]
    }
  });
  
  let tierInfo = {}, objInfo = {}, defaultFilter = {};
  let maxLength = Math.max(...filteredData.map(item => item.orgid.split(".").length)); // Max Tiers Count
  for(let i=1; i<= maxLength; i++) {
    let newdata = input.filter(item => item.orgid.split(".").length === i); // Filter Tiers
    let finalData = newdata.filter(data => {    // Check if user has no direct reportee in next tier
      let count = input.reduce((acc, item) => item.orgid.startsWith(data.orgid + ".") ? acc + 1 : acc, 0);
      return count > 0;
    }); 
    tierInfo[`Tier${i}`] = finalData;
    defaultFilter[`Tier${i}`] = finalData.map(item => item.displayName).sort();
    let obj = {};
    finalData.forEach(item => {  obj[item.displayName] = item  });
    objInfo[`Tier${i}`] = obj;
  };
  
  return { input, tierInfo, objInfo, defaultFilter };
};