import React, { lazy, Suspense } from 'react';
import { useQuery } from 'react-query';
import ProgressIcon from "../../common-components/ProgressIcon";
import { callExpressServerEndpointSync, HttpStatusCodes } from "../../utils";


// (Get logs data from Log file)
export const getLogInfo = async () => {
  try {
    const response = await callExpressServerEndpointSync('GET', 'log', null);
    if (response.status === HttpStatusCodes.OK) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching logs data:', error);
    return [];
  }
};


// LAZY LOAD COMPONENTS - TO FETCH LOGS DATA (TAB 1)
const TrafficMain = lazy(() => import('./components/Traffic/TrafficMain'));
export const FetchData = ({ theme, colors }) => {
  const { data: logsData, isLoading } = useQuery('logsData', getLogInfo);

  if (isLoading) {
    return <ProgressIcon />;
  }

  return (
    <Suspense fallback={<ProgressIcon />}>
      <TrafficMain data={logsData} theme={theme} colors={colors} />
    </Suspense>
  );
};


export const getURLChart = (data) => {
  const timestampCounts = data.reduce((acc, curr) => {
    acc[curr.Timestamp] = (acc[curr.Timestamp] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(timestampCounts).map((timestamp) => ({
    x: timestamp,
    y: timestampCounts[timestamp]
  })).slice(-30);
};
