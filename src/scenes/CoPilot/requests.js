import React, { lazy, Suspense, createContext, useContext } from 'react';
import { useQuery } from 'react-query';
import ProgressIcon from "../../common-components/ProgressIcon";
import { Tab1TileFiles } from "./components/CopilotAct/TileInfo";
import { Tab2AllFiles } from "./components/UsageReport/ImportFiles";
import { Tab1ChartFiles } from "./components/CopilotAct/ChartInfo";
import { getFileList } from '../../utils';


// GET ALL COPILOT FILES
const jsonFiles = {
  input : "./data-json/CopilotUserData.json",
  ...Tab1TileFiles,
  ...Tab2AllFiles,
  ...Tab1ChartFiles
};


// CONTEXT
const DataContext = createContext();
export const DataProvider = ({ children }) => {
  const { data: copilotData, isLoading } = useQuery('AllFiles', () => getFileList(jsonFiles));

  if (isLoading) {
    return <ProgressIcon />;
  }

  return (
    <DataContext.Provider value={copilotData}>
      {children}
    </DataContext.Provider>
  );
};
export const useData = () => useContext(DataContext);



// LAZY LOAD COMPONENTS
const CopilotMain = lazy(() => import('./components/CopilotMain'));
const FetchAllData = ({ tab, theme, colors }) => {
  const copilotData = useData();

  return (
    <Suspense fallback={<ProgressIcon />}>
      <CopilotMain copilotData={copilotData} tab={tab} theme={theme} colors={colors} />
    </Suspense>
  );
};
export default FetchAllData;