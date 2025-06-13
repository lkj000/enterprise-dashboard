import { ACRPolicyData } from "../../data/acrpolicy";
import { callExpressServerEndpointSync } from "../../utils";

// ACR POLICY - 1 
export const policyData = ACRPolicyData[0].policy;
export const policyHeaders = [
  "Enterprise Standards - Lifecycle Policy for Enterprise ACR",
  "For more information please reach out to Platform.Containers@albertsons.com"
];

// ACR HISTORY - 2
const fetchData = async (url) => {
  try {
    const response = await callExpressServerEndpointSync("GET", url);
    return response.status === 200 ? response.data : [];
  } catch (error) {
    console.log("Failed to fetch data:", error);
    return [];
  }
};

export const getRepoList = () => fetchData("acr/metrics/repositories");
export const getImgList = ({ repoName }) => fetchData(`acr/metrics/repositories/${repoName}/images`);
