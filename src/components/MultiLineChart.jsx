import { React } from "react";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { ResponsiveLine } from "@nivo/line";

const MultiLineChart = ({data, dataLegend, labelY, fixedData, XaxisRotate, graphCss, translateX}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //If dataset are all 0 in y-axis
  function areAllValuesAreZero(item) {
    return item.data.every(point=> point.y === 0);
  }

  var yMax = data.every(areAllValuesAreZero) ? 1 : 'auto';

  return (
    <ResponsiveLine
      data={data}
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
              // fontSize: '14px',
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
      // margin={fixedData === false ? { top: 50, right: 100, bottom: 110, left: 60 } : { top: 50, right: 100, bottom: 110, left: 80 }}
      margin={{ top: graphCss[0], right: graphCss[1], bottom: graphCss[2], left: graphCss[3] }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 0,
        max: yMax,
        stacked: false,
        reverse: false
      }}
      yFormat=" >-.2f"
      enableSlices={false}
      enableCrosshair={false}
      crosshairType="top-right"
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: 'bottom',
        tickSize: 8,
        tickPadding: 5,
        tickRotation: XaxisRotate,
        legend: dataLegend, // changed
        legendOffset: 80,
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
        legend: labelY, // changed
        legendOffset: -50,
        legendPosition: 'middle',
        format: (value => (value === Math.floor(value)) ? value: "")  // If y axis value is decimal
      }}
      pointSize={4}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh={true}
      colors={fixedData === false ? (d) => d.color : { scheme: "dark2" }}
      // colors={(serie)=> generateColor(data.findIndex((d) => d.id === serie.id))}
      legends={fixedData === false ? [] : 
        [
          {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: translateX,
              translateY: 0,
              itemsSpacing: 2,
              itemDirection: 'left-to-right',
              itemWidth: 100,
              itemHeight: 20,
              itemOpacity: 0.85,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                  {
                      on: 'hover',
                      style: {
                          itemOpacity: 1
                      }
                  }
              ]
          }
      ]
    }
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
            {input.point.serieId}: <strong>{input.point.data.y}</strong>
          </div>
        </div>
      )}}
    />
  );
};

export default MultiLineChart;