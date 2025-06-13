import { React, useEffect, useState } from "react";
import { Box, Tab, useTheme } from '@mui/material';
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Header from "../../components/Header";
import AppRequest from "./components/appservice/AppRequest";
import ProductTeam from "./components/product/ProductTeam";
import autoData from "./data/automated-forms-requests.json";
import { parseAllContents } from "../../common-components/IntakeJiraForm/utils";
import { tokens } from "../../theme";


const IntakeFormServices = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [ value, setValue ] = useState('0');
  const [ tabsData, setTabsData ] = useState([]);
  
  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setTabsData(autoData.data);
  }, []);


  return (
    <Box m="25px">

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={autoData.title} subtitle={autoData.subTitle} />
      </Box>

      {/* NOTES */}
      {autoData.notes && (
        <Box 
          display="flex"
          flexDirection={"column"}
          mb={5}
          backgroundColor={colors.primary[400]}
          sx={{
            width: "100%",
            height: "96%",
            filter: "drop-shadow(0px 4px 3px rgba(0, 0, 0, 0.2))",
            borderRadius: "5px",            
            padding: 2,
          }}
        >
          <Box display="flex" gap={3}>
            {autoData.notes.map((data, index) => (
              <Box key={index}>{parseAllContents(data)}</Box>
            ))}
          </Box>
        </Box>
      )}

      {/* TABS */}
      <TabContext value={value}>
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
        {tabsData.map((data, index) => (
          <TabPanel value={index.toString()}>
            {index === 0 ? <AppRequest tabContent={data.tabContent} colors={colors} />
              : <ProductTeam tabContent={data.tabContent} />}
            </TabPanel>
          ))
        }

      </TabContext>

    </Box>
  );
};

export default IntakeFormServices;