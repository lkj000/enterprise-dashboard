import React, { useState } from 'react';
import { Box, Typography, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { MuiAccordion } from './styles';


const CustomAccordion = ({ defaultValue, title, isDisplay, stylesInfo = {}, colors, children }) => {

  const [expanded, setExpanded] = useState(defaultValue);

  const handleChange = (event, isExpanded) => {
    setExpanded(isExpanded);
  };


  return (
    <Box style={{ ...stylesInfo }}>
      <MuiAccordion expanded={expanded} onChange={handleChange} sx={{ backgroundColor: colors.primary[400], boxShadow: 'none', filter: 'drop-shadow(0px 4px 3px rgba(0, 0, 0, 0.2))', borderRadius: '5px' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography fontSize="16px" sx={{ display: isDisplay ? (expanded ? 'none' : 'block') : 'block', paddingTop: '4px', paddingBottom: '0px' }}>
            {title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ maxHeight: 'auto', padding: '4px' }}>
          {children}
        </AccordionDetails>
      </MuiAccordion>
    </Box>
  );
};

export default CustomAccordion;