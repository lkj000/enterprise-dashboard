import { ResponsiveBar } from '@nivo/bar';
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const BarChartUser = ({ data, dataIndex, dataKeys, mode, layout, marginCss, colorType, legendX, legendY, XaxisRotate, legendXOffset, translateX, topValue, label }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

//Value - Top of Bar Chart 
  const formatValue = (value) => `${value}`;

  const calculateStackTotals = bars => bars.reduce((acc, bar) => ({ ...acc, [bar.data.index]: (acc[bar.data.index] || 0) + bar.data.value }), {});
  const findTopBars = bars => bars.reduce((acc, bar) => ({ ...acc, [bar.data.index]: (!acc[bar.data.index] || bar.y < acc[bar.data.index].y) ? bar : acc[bar.data.index] }), {});
  
  const chartLayers = [
    'grid', 'axes', 'bars', 'markers', 'legends',
    props => {
      const stackTotals = calculateStackTotals(props.bars);
      const topBars = findTopBars(props.bars);
  
      return (
        <g>
          {props.bars.map(bar => bar.key === topBars[bar.data.index].key && (
            <text
              key={bar.key}
              x={bar.x + bar.width / 2}
              y={bar.y - 8}
              textAnchor="middle"
              fill={colors.grey[100]}
              fontSize={13}
              fontWeight="600"
            >
              {formatValue(stackTotals[bar.data.index])}
            </text>
          ))}
        </g>
      );
    }
  ];

  const defaultLayers = ['grid', 'axes', 'bars', 'markers', 'legends'];

    return(
        <ResponsiveBar boxShadow="0px 4px 10px rgba(0, 0, 0, 0.5)" 
        sx={{ filter: 'drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.2))', borderRadius: '5px' }} 
                    
            data={data}
            keys={dataKeys}
            indexBy={dataIndex}
            margin={{ top: marginCss[0], right: marginCss[1], bottom: marginCss[2], left: marginCss[3] }}
            padding={0.3}
            groupMode={mode}
            layout={layout}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}   
            colors={colorType}    
            // colorBy={(bar) => bar.indexValue} 
            colorBy={(bar) => bar.id} 
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: XaxisRotate,
                legend: legendX,
                legendPosition: 'middle',
                legendOffset: legendXOffset,
                truncateTickAt: 0
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: legendY,
                legendPosition: 'middle',
                legendOffset: -40,
                truncateTickAt: 0
            }}
            layers={topValue ? chartLayers : defaultLayers}
            enableLabel={label}
            tooltip={({
                id,
                value,
                color,
                indexValue
              }) => <div style={{
                padding: 12,
                color,
                background: '#222222'
              }}>
                    <strong>
                        {indexValue} 
                        <div>{id}  : {value}</div>
                    </strong>
                </div>
            }
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'brighter',
                        3.0
                    ]
                ]
            }}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: translateX,
                    translateY: 0,
                    itemTextColor: colors.grey[100],
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 15,
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
            theme={{
                axis: {
                    legend: {
                        text: {
                          fill: colors.grey[100],
                          fontSize: 13,
                          fontWeight:'bold'
                        }
                    },
                    //   domain: {
                    //     line: {
                    //       stroke: colors.grey[100],
                    //     },
                    //   },
                    ticks: {
                        line: {
                            stroke: colors.grey[100],
                            strokeWidth: 1,
                        },
                        text: {
                            fill: colors.grey[100],
                            fontSize: 12
                        },
                    }
                },
                labels: {
                    text: {
                        fontSize: 14
                    }
                }
            }}
            ariaLabel="User Activity Chart"
         />
    );

}

export default BarChartUser;