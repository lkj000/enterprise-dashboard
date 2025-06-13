import { React } from "react";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { ResponsiveLine } from "@nivo/line";

const LineChartXY = ({input, dataLegend, labelX, labelY, zAxis, XaxisRotate}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  var data = [
    {
      "id" : labelX,
      "data": input
    }
  ];

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
      margin={{ top: 50, right: 100, bottom: 110, left: 80 }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 0,
        max: yMax,
        stacked: true,
        reverse: false
      }}
      yFormat=" >-.2f"
      enableSlices='x'
      enableCrosshair={false}
      // enablePointLabel={true}
      // pointLabel="y"
      // pointLabelYOffset={0}
      crosshairType="top-right"
      colors={{ scheme: "accent" }}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: XaxisRotate,
        legend: dataLegend, // changed
        legendOffset: 60,
        legendPosition: 'middle'
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
      // pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
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
    ]}
    sliceTooltip={(input) => {
      return (
        <div style={{ 
          background: 'white', 
          color: 'black',
          padding: '9px 12px',
          border: '1px solid #ccc',
          display: 'inline-flex',
          alignItems: 'center'
        }}>
          <span style={{
            height: '11px',
            width: '11px',
            backgroundColor: input.slice.points[0].color,
            borderRadius: '50%',
            marginRight: '5px'
          }}></span>
          {zAxis ? <span>{input.slice.points[0].data.x} - <b>{input.slice.points[0].data.y}</b> On: {new Intl.DateTimeFormat('en-US',{year: 'numeric', month: '2-digit', day: '2-digit'}).format(new Date(input.slice.points[0].data.z))}</span> :
             <span>{input.slice.points[0].data.x} - <b>{input.slice.points[0].data.y}</b></span> } 
        </div>
      )
    }}
    />
  );
};

export default LineChartXY;
