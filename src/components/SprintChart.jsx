import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const SprintChart = ({ chartData, colorType, legendX, legendY, maxValue }) => {
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

  return (
    <div style={{ height: 400 }}>
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
                },
              },
              ticks: {
                line: {
                  stroke: colors.grey[100],
                  strokeWidth: 1,
                },
                text: {
                  fill: colors.grey[100],
                },
              },
            },
            legends: {
              text: {
                fill: colors.grey[100],
              },
            }
        }}
        borderColor={{
            from: "color",
            modifiers: [["darker", "1.6"]],
        }}
        margin={{ top: 10, right: 250, bottom: 200, left: 100 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 0, max: yMax, stacked: false, reverse: false }}
        yFormat=" >-.2~f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -90,
          legend: legendX,
          legendOffset: 180,
          legendPosition: 'middle'
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: legendY,
          legendOffset: -40,
          legendPosition: 'middle',
          format: (value => (value === Math.floor(value)) ? value: "")  // If y axis value is decimal
        }}
        // colors={{ scheme: 'category10' }}
        colors={colorType}  
        colorBy={(bar) => bar.value}
        pointSize={5}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 130,
            translateY: 0,
            itemsSpacing: 5,
            itemDirection: 'left-to-right',
            itemWidth: 100,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
        tooltip={(input) => {
            return(
            <div style={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)', // semi-transparent black background
              color: 'white',
              padding: '8px',
              borderRadius: '4px',
              boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.25)'
            }}>
              <div style={{ display: 'flex', alignItems:'center'}}>
                <span style={{ 
                  width: '11px', 
                  height: '11px', 
                  marginRight: '5px', 
                  backgroundColor: input.point.serieColor, 
                  borderRadius: '50%'
                }}>
                </span>
                {input.point.serieId}:<strong>{input.point.data.yFormatted}</strong>
              </div>
            </div>
        )}}
      />
    </div>
  );
};

export default SprintChart;