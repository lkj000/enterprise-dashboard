import { React } from "react";
import { Box, Grid } from '@mui/material';
import CommonContent from "./CommonContent";
import { parseAllContents } from "../../../../common-components/IntakeJiraForm/utils";


const ProductTeam = ({ tabContent }) => {


  return (
    <Box>

      {/* CONTENT & BUTTON DATA */}
      {tabContent && tabContent.map((item, index) => (
        <Box key={index} display="flex" flexDirection="column" gap={2} sx={{ textAlign: 'center', marginTop: '20px' }}>
          {item.element && item.element.map((data, inx) => (
            <Box key={inx}>{parseAllContents(data)}</Box>
          ))}

          {item.button && (
            <Grid container spacing={2.5} justifyContent="center">
              {item.button.map((name, idx) => (
                <CommonContent key={idx} input={name} />
              ))}
          </Grid>)}
        </Box>
      ))}

    </Box>
  );
};

export default ProductTeam;