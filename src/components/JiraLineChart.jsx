import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const JiraLineChart = ({ chartData, colorType, marginCss, legendX, legendY, maxValue, XaxisRotate, legendTextBottom, legendTextRight, legendXOffset, legendWidth }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    //If dataset are all 0 in y-axis
    var yMax='auto';
    if(maxValue){
      function areAllValuesAreZero(item) {
        return item.data.every(point=> point.y === 0);
      }
      yMax = chartData.every(areAllValuesAreZero) ? 1 : 'auto';
    }

    // Legend Text
    const legendData = chartData.map((item) => ({
      id: item.id,
      color: item.color
    })).reverse();

  return (
    <>
      <ResponsiveLine
        data={chartData}
        theme={{
            // added
            axis: {
              domain: {
                line: {
                  stroke: colors.grey[100],
                },
              },
              legend: {
                text: {
                  fill: colors.grey[100],
                  fontSize: '14px'
                },
              },
              ticks: {
                line: {
                  stroke: colors.grey[100],
                  strokeWidth: 2,
                },
                text: {
                  fill: colors.grey[100],
                  fontWeight:'bold'
                },
              },
            },
            legends: {
              text: {
                fill: colors.grey[100]
              },
            }
        }}
        borderColor={{
            from: "color",
            modifiers: [["darker", "1.6"]],
        }}
        margin={{ top: marginCss[0], right: marginCss[1], bottom: marginCss[2], left: marginCss[3] }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 0, max: yMax, stacked: false, reverse: false }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: XaxisRotate,
          legend: legendX,
          legendOffset: legendXOffset,
          legendPosition: 'middle',
          tickLabel: {
            fontSize:'14px',
            fontWeight: 'bold'
          }
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: legendY,
          legendOffset: -50,
          legendPosition: 'middle',
          format: (value => (value === Math.floor(value)) ? value: "")  // If y axis value is decimal
        }}
        // colors={{ scheme: 'category10' }}
        colors={colorType}  
        colorBy={(bar) => bar.value}
        pointSize={4}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[]} // Hide Legends
        tooltip={(input) => {
            return(
            <div style={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)', // semi-transparent black background
              color: 'white',
              padding: '8px',
              borderRadius: '4px',
              boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.25)'
            }}>
              <div style={{ display: 'flex', alignItems:'baseline'}}>
                <span style={{ 
                  width: '11px', 
                  height: '11px', 
                  marginRight: '5px', 
                  backgroundColor: input.point.serieColor, 
                  borderRadius: '50%'
                }}>
                </span>
                {input.point.serieId.split(' ').length > 3 ? 
                    <div style={{wordWrap: 'break-word', width: '130px'}}>{input.point.serieId} : <b>{input.point.data.y}</b></div> 
                    : 
                    <>{input.point.serieId} : <b>{input.point.data.y}</b></>
                }
              </div>
            </div>
        )}}
      />

      {/* Legend */}
      <div style={{ position: 'absolute', bottom: legendTextBottom, right: legendTextRight}}>
        {legendData.map((item, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'baseline', marginBottom: '5px'}}>
            <div style={{ 
              width: '11px', 
              height: '11px', 
              marginRight: '5px',
              backgroundColor: item.color, 
              borderRadius: '50%'
            }}>
            </div>
              <span style={{color: colors.grey[100], fontSize: '12px', wordWrap: 'break-word', width: legendWidth}}>{item.id}</span>
         </div>
        ))}
      </div>

    </>
  );
};

export default JiraLineChart;