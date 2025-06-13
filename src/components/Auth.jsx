import { useContext } from "react";
import { UserGroupsContext } from "./UserContext";

const useAskeMeAuth = () => {
    const userGroups = useContext(UserGroupsContext);
    if (userGroups.includes("platform-dashboard") || userGroups.includes("askme-pilot")) {
      return true;
    }
    return false;
  }
  
const useDashboardAuth = () => {
    const userGroups = useContext(UserGroupsContext);
    if (userGroups.includes("platform-dashboard")) {
      return true;
    }
    return false;
}

const useLogsAuth = () => {
    const userGroups = useContext(UserGroupsContext);
    if (userGroups.includes("platform-dashboard") || userGroups.includes("kpi-reports-logs")) {
      return true;
    }
    return false;
}

const useProductivityProgramAuth = () => {
  const userGroups = useContext(UserGroupsContext);
  if (userGroups.includes("platform-dashboard") || userGroups.includes("prod-prog")) {
    return true;
  }
  return false;
}

export { useAskeMeAuth, useDashboardAuth, useLogsAuth, useProductivityProgramAuth };
