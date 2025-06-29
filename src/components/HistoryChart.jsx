import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { HistoryCount } from "../data/historyWorkflow";

const HistoryChart = ({ isHistory = false }) => {
  const { palette: { mode }} = useTheme();
  const colors = tokens(mode);

  var data = HistoryCount[0].data;

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
        },
        tooltip:{
          container: {
            color: "black",
          },
        },
      }}
      keys={["Count"]}
      indexBy="Month"
      margin={{ top: 50, right: 120, bottom: 50, left: 60 }}
      padding={0.5}
      groupMode='grouped'
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: mode === 'light' ? "category10": "accent" }}
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
        legend: isHistory ? undefined : "Month", // changed
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isHistory ? undefined : "Count", // changed
        legendPosition: "middle",
        legendOffset: -40,
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
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
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

export default HistoryChart;