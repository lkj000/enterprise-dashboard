import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";


const CopilotUsageBarChart = ({data, chartKeys, indexKey}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //Sort the data (desc)
  const sortDataDesc = (data) => {
    return data.sort((a,b) =>  b.day - a.day);
  }

  const sortData = sortDataDesc(data);

  //Value -  Bar Chart
  const formatValue = (value) => `${value}`;

  const chartLayers = [
    'grid','axes','bars','markers','legends',
    (props) => (
      <g>
        {props.bars.map((bar) => (
          <text
            key={bar.key}
            x={ bar.x + bar.width /2}
            y={ bar.y + -8}
            textAnchor="middle"
            fill={colors.grey[100]}
            fontSize={12}
            fontWeight="600"
          >
            {formatValue(bar.data.value)}
          </text>
        ))}
      </g>
    )
  ]

  return (
    <ResponsiveBar
      data={sortData}
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
        },
        tooltip:{
          container: {
            color: "black",
          },
        },
      }}
      keys={chartKeys}
      indexBy={indexKey}
      margin={{ top: 50, right: 120, bottom: 150, left: 60 }}
      padding={0.25}
      groupMode='grouped'
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "accent" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -90,
        legendPosition: "middle",
        legendOffset: 32,
      }}
      layers={chartLayers}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-left",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 90,
          itemsSpacing: 50,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 10,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
      }}
    />
  );
};

export default CopilotUsageBarChart;