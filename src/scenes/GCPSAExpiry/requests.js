import React, { lazy, Suspense } from 'react';
import { useQuery } from 'react-query';
import ProgressIcon from "../../common-components/ProgressIcon";


// FUNCTION TO FETCH THE FILE
const getGCPSAData = async () => {
  try {
    const response = await fetch('./data-json/gcp-sa-expiry.json');
    if (!response.ok) {
      return { lastRun: "", data: [] };
    }
    const result = await response.json();
    const data = result?.data?.map((item, i) => ({ ...item, sNo: i + 1 })) || [];
    const lastRun = result?.update_date || "";
    return { lastRun, data };
  } catch (error) {
    console.log("Failed to fetch data:", error);
    return { lastRun: "", data: [] };
  }
};


// LAZY LOAD COMPONENTS
const SAMain = lazy(() => import('./components/SAMain'));
export const FetchGCPData = ({ theme, colors }) => {
  const { data: GCPSAData, isLoading } = useQuery('GCP SA Data', getGCPSAData);

  if (isLoading) {
    return <ProgressIcon />;
  }

  return (
    <Suspense fallback={<ProgressIcon />}>
      <SAMain data={GCPSAData.data} lastRun={GCPSAData.lastRun} theme={theme} colors={colors} />
    </Suspense>
  );
};

// CUSTOM DATE FORMATTER
export const dateFormatter = (value) => {
  const year = value.substring(0, 4);
  const month = value.substring(4, 6);
  const day = value.substring(6, 8);
  return `${year}-${month}-${day}`;
};
