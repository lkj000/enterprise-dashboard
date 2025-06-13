import { React, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Grid, useTheme } from '@mui/material';
import Dropdown from "../../common-components/Dropdown";
import Header from "../../components/Header";
import SummaryTable from "./components/SummaryTable";
import { textData, getSummaryData, getCveNames } from "./requests";
import { tokens } from "../../theme";


const XrayCVESummary = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const cveParam = searchParams.get('cve');

  const [ cveID, setCveID ] = useState(cveParam || 'All');
  const [ input, setInput ] = useState([]);


  useEffect(() => {
    fetch(textData).then((r) => r.text()).then((text) => {
      setInput(getSummaryData(text));
    });
    if (cveParam) {
      setCveID(cveParam);
    }
  }, [cveParam]);


  // CVE ID
  const handleChangeCveID = (_event, newID) => {
    const id = newID || 'All';
    setCveID(id);
    const params = new URLSearchParams(id !== 'All' ? { cve: id } : {});
    navigate(`?${params.toString()}`);
  };

   
  return (
    <Box m="25px">

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Xray CVE Summary" />
      </Box>

      <Box display="flex" marginBottom="40px" sx={{
        width: '100%',
        height: 'auto'
      }}>
        <Grid container>
          <Dropdown
            title="CVE ID"
            subtitle="CVE ID"
            options={getCveNames(input)}
            value={cveID}
            handleChange={handleChangeCveID}
            theme={theme}
            colors={colors}
          />
        </Grid>
      </Box>
      
      <SummaryTable input={input} cveID={cveID} />

    </Box>
  );
};

export default XrayCVESummary;