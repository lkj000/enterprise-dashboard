import React, { useEffect, useState } from "react";
import { Box, Divider, Tab, Typography, useTheme } from '@mui/material';
import { TabContext, TabList, TabPanel } from "@mui/lab";

import { tokens } from "../../theme";
import Header from "../../components/Header";
import CommonTable from "./components/CommonTable.jsx";
import RequestProcess from "./components/RequestProcess.jsx";
import CommonRequest from "./components/CommonRequest.jsx";
import automaded_forms_requests from './data/automated-forms-requests.json';
import { parseHtml } from "./utils.js";


const IntakeFormsNetwork = () => {
  const [tabsData, setTabsData] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [value, setValue] = useState('0');
  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setTabsData(automaded_forms_requests.data);
  }, []);

  return (
    <Box m="25px">

      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={automaded_forms_requests.title}
          subtitle={automaded_forms_requests.subTitle} />

      </Box>

      <Divider color={colors.tertiary[400]} />
      <Box display="flex" mb="25px" marginTop={2}>
        <Typography variant="h6" style={{ fontWeight: 'bold' }}>
          {parseHtml(automaded_forms_requests.description)}
        </Typography>
      </Box>

      {/* TABS */}
      <TabContext value={value}>
        {/** TAB TITELS */}
        <Box sx={{
          borderBottom: 1,
          borderColor: 'divider',
          mt: -1.5,
          mb: 3.5
        }}>
          <TabList
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
          >
            {tabsData.map(({ tabTitle }, index) => (
              <Tab
                label={tabTitle}
                value={index.toString()}
                style={{ fontSize: '14.5px', fontWeight: 'medium', textTransform: 'none' }}
                iconPosition="start"
              />
            ))}
          </TabList>
        </Box>

        {/* CONTENT */}
        {
          tabsData.map((data, index) => (
            <TabPanel value={index.toString()} >
              {
                index === 0 ?
                  <RequestProcess input={data} /> :
                  <CommonRequest input={data.formData} />
              }
              {
                data.ticketSamples &&
                <CommonTable input={data.ticketSamples}
                />}
            </TabPanel>
          ))
        }

      </TabContext>
    </Box>
  );
};

export default React.memo(IntakeFormsNetwork);
