import React, { lazy, Suspense } from 'react';
import { useQuery } from 'react-query';
import ProgressIcon from "../../common-components/ProgressIcon";


// FUNCTION TO FETCH THE FILE
const getGCPData = async () => {
  try {
    const response = await fetch('./data-json/gcp-projects.json');
    if (!response.ok) {
      return { lastRun: "", data: [] };
    }
    const result = await response.json();
    const data = result?.data?.map((item, i) => ({ ...item, sNo: i + 1 })) || [];
    const lastRun = result?.update_date || "";
    return { lastRun, data };
  } catch (error) {
    console.log("Failed to fetch GCP Projects data:", error);
    return { lastRun: "", data: [] };
  }
};


// LAZY LOAD COMPONENTS
const GCPMain = lazy(() => import('./components/GCPMain'));
export const FetchGCPData = ({ theme, colors }) => {
  const { data: GCPData, isLoading } = useQuery('GCP Data', getGCPData);

  if (isLoading) {
    return <ProgressIcon />;
  }

  return (
    <Suspense fallback={<ProgressIcon />}>
      <GCPMain data={GCPData.data} lastRun={GCPData.lastRun} theme={theme} colors={colors} />
    </Suspense>
  );
};