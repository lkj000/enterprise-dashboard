import { React, useEffect, useMemo } from "react";
import { useSearchParams } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import CustomAccordion from "../../../common-components/Accordion/CustomAccordion";
import MultiselectDropdown from "../../../common-components/MultiselectDropdown";
import CopyIcon from '@mui/icons-material/ContentCopy';
import IconClick from "../../../common-components/IconClick";
import { keyData, getProjTables, encodeURL, decodeURL } from "../requests";
import { getEpicMermaid, getSelectedEpicMermaid } from "./charts/MermaidData";


const PlanDropdown = ({ input, selectedRows, projKey, setProjKey, setProjTables, setChartData, setSelectedRows, theme, colors }) => {

  const [searchParams] = useSearchParams();
  const memoProjTables = useMemo(() => getProjTables(projKey, input), [projKey, input]);


  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const path1 = searchParams.get('projectKey');
    const path2 = searchParams.get('selectedEpic');
    if (path1) {
      const keys = path1.split(',');
      setProjKey(keys);
      const tableData = getProjTables(keys, input);
      setProjTables(tableData);
      if (path2) {
        const rows = decodeURL(path2);
        const selectedData = rows.map(Number).map((row) => tableData.epic[row]);
        setSelectedRows(rows);
        setChartData(getSelectedEpicMermaid(selectedData));
      } else {
        setSelectedRows(null);
        setChartData('');
      }
    }
  }, [searchParams, setProjKey, setProjTables, setChartData, setSelectedRows]);
  /* eslint-enable react-hooks/exhaustive-deps */


  useEffect(() => {
    setProjTables(memoProjTables);
    if (selectedRows === null || selectedRows.length === 0) {
      setChartData('');
    } else {
      setChartData(getSelectedEpicMermaid(selectedRows.map((row) => memoProjTables.epic[row])));
    }
  }, [memoProjTables, selectedRows, setProjTables, setChartData]);


  // PROJECT KEY
  const handleProjectKey = (_event, newKey) => {
    if (newKey.length > 10) {
      alert('You cannot select more than 10 project keys.');
      return;
    }
    setProjKey(newKey);
    if (newKey.length === 0) {
      setProjTables({ epic: [], feature: [] });
      setChartData('');
      setSelectedRows([]);
    }
    const tableData = getProjTables(newKey, input);
    setProjTables(tableData);
    setSelectedRows(tableData.epic.map((_, index) => index));
    setChartData(getEpicMermaid(tableData));
  };


  // COPY URL
  const copyURL = async () => {
    try {
      const { host, pathname } = window.location;
      const joinedProjKey = projKey.join(',');
      const params1 = `?projectKey=${joinedProjKey}`;
      const params2 = selectedRows.length ? `&selectedEpic=${encodeURL(selectedRows)}` : '';
      const url = projKey.length ? `${host}${pathname}${params1}${params2}` : `${host}${pathname}`;
      await navigator.clipboard.writeText(url);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };



  return (
    <CustomAccordion
      defaultValue={true}
      title="Filters"
      isDisplay={true}
      stylesInfo={{ marginBottom: '40px'}}
      colors={colors}
    >
      <Grid container>
        <MultiselectDropdown
          title="Project Key"
          subtitle="Project Key"
          options={keyData}
          value={projKey}
          handleChange={handleProjectKey}
          theme={theme}
          colors={colors}
        />

        {projKey.length > 0 && (<Box marginTop={6}>
        <IconClick 
          title="Copy Link"
          icon={(<CopyIcon />)}
          handleClick={copyURL}
          colors={colors}
        />
        </Box>)}

      </Grid>
    </CustomAccordion>
  );
}

export default PlanDropdown;