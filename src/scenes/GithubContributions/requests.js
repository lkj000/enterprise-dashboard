// For getRepoData
export async function getRepoData() {
  const response = await fetch('./data-json/appCodeContributionData.json');
  const RepoData = await response.json();
  let repoIndex = 0;
  return RepoData.flatMap(repo => 
    repo.total_user_appcode_commits.map(commit => {
      const { total_user_appcode_commits, ...rest } = repo;
      return {
        index: ++repoIndex,
        ...rest,
        ...commit
      };
    })
  );
}

// For getUserData
let getDate = [];
export async function getUserData() {
  const response = await fetch('./data-json/userContributionHistory.json');
  const UserData = await response.json();
  getDate = [UserData.from_date, UserData.til_date];
  return UserData.user_data;
}


export const getDateField = () => {
  const formatYearTwoDigits = (dateString) => {
    const [month, day, year] = dateString.split('/');
    return `${month}/${day}/${year.slice(-2)}`;
  };
  return [formatYearTwoDigits(getDate[0]), formatYearTwoDigits(getDate[1])];
};