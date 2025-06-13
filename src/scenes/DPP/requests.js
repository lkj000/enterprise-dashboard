import React, { lazy, Suspense } from 'react';
import { useQuery } from 'react-query';
import ProgressIcon from "../../common-components/ProgressIcon";
import { getDPPData } from "./components/HandleDropdowns";
import { UsageFiles } from "./components/tiles/TilesInput";
import { getFileList } from '../../utils';


// LAZY LOAD COMPONENTS
const CommonDPP = lazy(() => import('./components/CommonDPP'));
const FetchDPPData = ({ theme, colors }) => {
  const { data: dppData, isLoading: isDPPDataLoading } = useQuery('DPP data', getDPPData);
  const { data: usageData, isLoading } = useQuery('Copilot usage files', () => getFileList(UsageFiles));


  if (isLoading || isDPPDataLoading) {
    return <ProgressIcon />;
  }

  return (
    <Suspense fallback={<ProgressIcon />}>
      <CommonDPP data={dppData} usage={usageData} theme={theme} colors={colors} />
    </Suspense>
  );
};
export default FetchDPPData;