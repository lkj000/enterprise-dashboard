import React, { useState } from 'react';
import { MuiAccordion } from '../styles';
import { Typography, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const HistoryAccordion = ({ data, i }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div>
      <MuiAccordion expanded={expanded === `panel${i}`} onChange={handleChange(`panel${i}`)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography fontSize="16px">{data.index} - {data.date}</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ overflowY: 'auto', maxHeight: 'auto' }}>
          {(data.artifacts).map((file, indexArtifact) => {
            return (
              <Typography key={indexArtifact} fontSize="16px" padding="5px">
                {indexArtifact + 1} - {file}
              </Typography>
            )
          })}
        </AccordionDetails>
      </MuiAccordion>
    </div>
  );
};

export default HistoryAccordion;