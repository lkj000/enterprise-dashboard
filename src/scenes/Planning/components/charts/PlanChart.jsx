import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { Box, IconButton, Divider } from '@mui/material'; 
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { handleFullScreen, handleRenderChart, ganttStyle, colorCode } from './ChartFunc';
import './styles.css';


const PlanChart = ({ chartData, mode, colors }) => {

  const chartRef = useRef(null);

  const FullScreenFunc = () => {
    handleFullScreen(chartRef);
  };
  

  useEffect(() => {
    mermaid.initialize({ startOnLoad: false, gantt: ganttStyle });
    const renderChart = () => {
      if (chartRef.current) {
        mermaid.render('mermaidChart', chartData).then(({ svg }) => {
          handleRenderChart(chartRef, svg);
        });
      }
    };

    renderChart(); 

    const intervalId = setInterval(renderChart, 10000); 
    return () => clearInterval(intervalId); 
  }, [chartData, mode]);


  return (
    <Box>
      <Box display="flex" justifyContent="flex-end">
        <IconButton onClick={FullScreenFunc} color="secondary" sx={{ fontSize: 30 }}>
          <FullscreenIcon  fontSize="inherit"/>
        </IconButton>

        <Box display="flex" flexDirection="row" m={1}>
          {Object.keys(colorCode).map((item, index) => (
            <Box key={index} display="flex" alignItems="center" mr={2}>
              <Box className="legend-box" bgcolor={colorCode[item]} />
              <span style={{ color: colors.grey[100], fontSize: '14px' }}>{item}</span>
            </Box>
          ))}
        </Box>
      </Box>

      <Divider/>

      <Box ref={chartRef} className="mermaid" marginTop="5%">
        {/* The chart will be rendered inside this Box */}
      </Box>
    </Box>
  );
};

export default PlanChart;