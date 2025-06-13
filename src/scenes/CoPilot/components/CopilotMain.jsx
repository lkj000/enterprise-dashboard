import { React, useState } from "react";
import { Box } from '@mui/material';
import CopilotDropdown from './CopilotDropdown';
import CopilotTable from './CopilotTable';
import TileCharts from "./TileCharts";


const CopilotMain = ({ copilotData, tab, theme, colors }) => {

  const [ reportType, setReportType ] = useState('Daily');
  const [ port, setPort ] = useState('All');
  const [ selectVP, setVP ] = useState('All');
  const [ selectDirector, setDirector ] = useState('All');
  const [ selectManager, setManager ] = useState('All');
  const [ selectStatus, setStatus ] = useState('All');
  const [ viewState, setViewState ] = useState('All');
  const [ usageDays, setUsageDays ] = useState("28");
  const [ dataState, setDataState ] = useState('common');


  return (
    <Box>
      <CopilotDropdown
        input={copilotData?.input?.data ?? []}
        tab={tab}
        reportType={reportType}
        port={port}
        selectVP={selectVP}
        selectDirector={selectDirector}
        selectManager={selectManager}
        selectStatus={selectStatus}
        viewState={viewState}
        usageDays={usageDays}
        setReportType={setReportType}
        setPort={setPort}         
        setVP={setVP}
        setDirector={setDirector}
        setManager={setManager}     
        setStatus={setStatus}  
        setViewState={setViewState}
        setUsageDays={setUsageDays}
        setDataState={setDataState}
        theme={theme}
        colors={colors}
      />

      <TileCharts
        allData={copilotData}
        tab={tab}
        reportType={reportType}
        usageDays={usageDays}
        dataState={dataState}
        selectStatus={selectStatus}
        viewState={viewState}
        colors={colors}
      />

      <CopilotTable
        input={copilotData?.input?.data ?? []}
        lastRun={copilotData?.input?.update_date ?? ""}
        port={port}
        selectVP={selectVP}
        selectDirector={selectDirector}
        selectManager={selectManager}
        selectStatus={selectStatus}
        viewState={viewState}
      />
    </Box>
  );
};

export default CopilotMain;