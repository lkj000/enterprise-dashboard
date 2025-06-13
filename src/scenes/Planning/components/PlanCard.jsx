import { React, useState, useEffect } from "react";
import { Box } from '@mui/material';
import PlanChart from "./charts/PlanChart";
import PlanDropdown from "./PlanDropdown";
import EpicTable from  "./tables/EpicTable";
import FeatureTable from "../../SprintActivity/components/tables/FeatureTable";


const PlanCard = ({ data, theme, colors }) => {

  const [ projKey, setProjKey ] = useState([]);
  const [ projTables, setProjTables ] = useState({ epic: [], feature: [] });
  const [ selectedRows, setSelectedRows ] = useState([]);
  const [ selectedEpic, setSelectedEpic ] = useState([]);
  const [ chartData, setChartData ] = useState('');

  useEffect(() => {
    setChartData(selectedEpic);
  }, [selectedEpic]);

  useEffect(() => {
    if (selectedRows === null || selectedRows.length === 0) {
      setChartData('');
    }
  }, [selectedRows]);


  return (
    <Box>
      <PlanDropdown
        input={data}
        selectedRows={selectedRows}
        projKey={projKey}
        setProjKey={setProjKey}
        setProjTables={setProjTables}
        setChartData={setChartData}
        setSelectedRows={setSelectedRows}
        theme={theme}
        colors={colors}
      />

      {chartData.length > 0  && (
      <PlanChart
        chartData={chartData}
        mode={theme.palette.mode}
        colors={colors}
      />)}

      {/*Tables */}
      <EpicTable
        input={projTables}
        projKey={projKey}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        setSelectedEpic={setSelectedEpic}
      />
      <FeatureTable input={projTables} />

    </Box>
  );
}

export default PlanCard;