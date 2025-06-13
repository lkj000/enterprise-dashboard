import React, { lazy, Suspense } from 'react';
import { useQuery } from 'react-query';
import ProgressIcon from "../../common-components/ProgressIcon";


// FUNCTION TO FETCH THE FILE
const getGCPRenew = async () => {
  try {
    const response = await fetch('./data-json/gcp-generate-cert-list.json');
    if (!response.ok) {
      return { lastRun: "", data: [] };
    }
    const result = await response.json();
    const data = result?.data?.map((item, i) => ({ ...item, sNo: i + 1 })) || [];
    const lastRun = result?.update_date || "";
    return { lastRun, data };
  } catch (error) {
    console.log("Failed to fetch data (GCP Renewal):", error);
    return { lastRun: "", data: [] };
  }
};


// LAZY LOAD COMPONENTS
const RenewMain = lazy(() => import('./components/RenewMain'));
export const FetchGCPRenew = ({ theme, colors }) => {
  const { data: GCPRenew, isLoading } = useQuery('GCP Renewal', getGCPRenew);

  if (isLoading) {
    return <ProgressIcon />;
  }

  return (
    <Suspense fallback={<ProgressIcon />}>
      <RenewMain data={GCPRenew.data} lastRun={GCPRenew.lastRun} theme={theme} colors={colors} />
    </Suspense>
  );
};