import { ResponsiveBar } from '@nivo/bar';
import { useTheme } from "@mui/material";
import { tokens } from "../theme";


const CustomChart = ({ data, dataIndex, dataKeys, mode, layout, marginCss, colorType, legendX, legendY, XaxisRotate, legendXOffset, topValue, legendTextBottom, legendTextRight, marker }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    //Marker data (Fix chart Max Value)
    var yMax = 'auto';
    const test = data.every(value => value[dataKeys] <= Object.values(marker)[0]);
    if(test){
        yMax = Math.ceil(Object.values(marker)[0] + 2);
    }

    // Legend Text
    const markerdata = [dataKeys[0], Object.keys(marker)[0]];
    const legendData = markerdata.map((item, index) => ({ id: item, color: colorType[index] }));

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
        <>
        <ResponsiveBar                
            data={data}
            keys={dataKeys}
            indexBy={dataIndex}
            margin={{ top: marginCss[0], right: marginCss[1], bottom: marginCss[2], left: marginCss[3] }}
            padding={0.3}
            groupMode={mode}
            layout={layout}
            maxValue={yMax}
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
            markers={[{
                axis: 'y',
                value: Object.values(marker)[0],
                lineStyle: {
                    stroke: 'red',
                    strokeWidth: 2
                },
                textStyle: {
                    fill: colors.grey[100],
                    fontSize: 14,
                    fontWeight: 'bold'
                },
                legend: `${Object.values(marker)[0]} (Enterprise)`,
                legendOrientation: 'horizontal',
                legendPosition: 'right',
                legendOffsetX: 12
            }]}
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
            enableLabel={false}
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
            legends={[]}
            theme={{
                axis: {
                    legend: {
                        text: {
                          fill: colors.grey[100],
                          fontSize: 13,
                          fontWeight:'bold'
                        }
                    },
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

        {/* Legend */}
        <div style={{ position: 'absolute', bottom: legendTextBottom, right: legendTextRight}}>
            {legendData.map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'baseline', marginBottom: '5px'}}>
                <div style={{ 
                    width: '13px', 
                    height: '13px', 
                    marginRight: '5px',
                    backgroundColor: item.color
                }}>
                </div>
                <span style={{color: colors.grey[100], fontSize: '12px', wordWrap: 'break-word', width: '100px'}}>{item.id}</span>
            </div>
            ))}
        </div>
        </>
    );

}

export default CustomChart;