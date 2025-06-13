import { useQuery } from 'react-query';

const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('A network error occured, Please try again later');
    }
    return await response.json();
};

const fetchJiraData = async () => {
    const [userResponse, issueResponse] = await Promise.all([
        fetchData('./data-json/jiraUsersActivity.json'),
        fetchData('./data-json/jiraIssuesList.json')
    ]);

    const issueMap = issueResponse.reduce((issueArray, data) => {
        const userId = data.userid.toLowerCase();
        if (!issueArray[userId]) {
            issueArray[userId] = [];
        }
        issueArray[userId].push(data.issues);
        return issueArray;
    }, {});

    const userData = userResponse.map((item) => {
        const weeklyData = Array.from({length: 11}, (_, i) => item[`week${i+1}`]);
        return {
            ...item,
            weeklyData,
            issues: issueMap[item.userid.toLowerCase()][0] || [],
        }
    });

    return userData;
};

export const useJiraData = () => {
    return useQuery('jiraData', fetchJiraData);
};