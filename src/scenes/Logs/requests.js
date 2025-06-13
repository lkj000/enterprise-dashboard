import React, { lazy, Suspense } from 'react';
import { useQuery } from 'react-query';
import ProgressIcon from "../../common-components/ProgressIcon";
import { set1DataFilter, set2DataFilter, set3DataFilter } from '../../utils';


// FUNCTION TO FETCH LOGS DATA
export const getLogsData = async () => {
  try {
    const response = await fetch('./data-json/all_user_audit_logs.json');
    if (!response.ok) {
      return { update_date: "", data: [] };
    }
    const jsonData = await response.json();
    const filteredData = jsonData.data?.filter(item => item.display_name !== 'Not Available').map((item, index) => ({ sNo: index + 1, ...item })) || [];
    return { update_date: jsonData?.update_date || "", data: filteredData };
  } catch (error) {
    console.error(`Error fetching all_user_audit_logs.json:`, error);
    return { update_date: "", data: [] };
  }
};


// LAZY LOAD COMPONENTS
const LogMain = lazy(() => import('./components/LogMain'));
export const FetchData = ({ theme, colors }) => {
  const { data: logsData, isLoading } = useQuery('Logs Data', getLogsData);

  if (isLoading) {
    return <ProgressIcon />;
  }

  return (
    <Suspense fallback={<ProgressIcon />}>
      <LogMain data={logsData.data} lastRun={logsData.update_date} theme={theme} colors={colors} />
    </Suspense>
  );
};


// DROPDOWN OPTIONS
export const functionMap = {
  "set1DataFilter": set1DataFilter,
  "set2DataFilter": set2DataFilter,
  "set3DataFilter": set3DataFilter
};

export const UpdateFields = (port, selectVP, selectDirector, userID) => {
  return {
    portfolio: port,
    vp: selectVP,
    director: selectDirector,
    user: userID
  };
};