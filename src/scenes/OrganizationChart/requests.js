import React, { lazy, Suspense } from 'react';
import { useQuery } from 'react-query';
import ProgressIcon from "../../common-components/ProgressIcon";
import { getOrgData } from './components/OrgFunc';


// GET ALL COPILOT FILES
export const jsonFiles = {
  "it" : "./data-json/UserData.json",
  "hr (business)": "./data-json/UserData/UserDataHR.json",
  "merchandise (business)": "./data-json/UserData/UserDataMerchandising.json",
  "pharmacy (business)": "./data-json/UserData/UserDataPharmacy.json",
  "supplychain (business)": "./data-json/UserData/UserDataSupplyChain.json"
};


// FUNCTION TO FETCH DATA
const getOrgFileInfo = async (tab) => {
  try {
    const response = await fetch(jsonFiles[tab]);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return getOrgData(data);
  } catch (error) {
    console.error(`Error fetching OrgChart data for ${tab}:`, error);
    return [];
  }
};


// LAZY LOAD COMPONENTS
const OrgTier5 = lazy(() => import('./components/OrgTier5'));
const OrgTier4 = lazy(() => import('./components/OrgTier4'));
const FetchAllData = ({ tab, theme, colors }) => {
  const { data: orgdata, isLoading, error } = useQuery(['OrgData', tab], () => getOrgFileInfo(tab), {
    enabled: !!tab, // Only run the query if tab is not null or undefined
  });

  if (isLoading) {
    return <ProgressIcon />;
  }

  if (error) {
    console.error(`Error loading OrgChart data for ${tab}:`, error);
    return <div>Error loading data</div>;
  }

  if (!orgdata) {
    return <div>No data available</div>;
  }

  return (
    <Suspense fallback={<ProgressIcon />}>
      {tab === "hr" ? <OrgTier4 {...orgdata} theme={theme} colors={colors} /> : 
        <OrgTier5 {...orgdata} theme={theme} colors={colors} />}
    </Suspense>
  );
};
export default FetchAllData;