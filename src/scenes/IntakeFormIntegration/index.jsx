import { React } from "react";
import { Box, useTheme } from '@mui/material';
import Header from "../../components/Header";
import RequestContent from "./components/RequestContent";
import { parseAllContents } from "../../common-components/IntakeJiraForm/utils";
import autoData from "./data/automated-forms-requests.json";
import { tokens } from "../../theme";


const IntakeFormIntegration = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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

      {/* CONTENT & BUTTON DATA */}
      {autoData.data && autoData.data.map((item, index) => (
        <Box key={index} display="flex" flexDirection="column" gap={2} sx={{ textAlign: 'center' }}>
          {item.element && item.element.map((data, inx) => (
            <Box key={inx}>{parseAllContents(data)}</Box>
          ))}

          {item.button && (
            <Box
              display="flex"
              flexWrap="wrap"
              alignContent="center"
              justifyContent="space-between"
              m={2}
            >
              {item.button.map((name, idx) => (
                <RequestContent key={idx} input={name} />
              ))}
          </Box>)}
        </Box>
      ))}

    </Box>
  );
};

export default IntakeFormIntegration;