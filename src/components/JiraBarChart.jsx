import { ResponsiveBar } from '@nivo/bar';
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const JiraBarChart = ({ data, dataIndex, dataKeys, colorType, legendX }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return(
        <div style={{height: 400, position: 'relative'}} boxShadow="0px 4px 10px rgba(0, 0, 0, 0.5)" 
        sx={{ filter: 'drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.2))', borderRadius: '5px' }} 
     >
            <ResponsiveBar                
                data={data}
                keys={dataKeys}
                indexBy={dataIndex}
                margin={{ top: 50, right: 180, bottom: 60, left: 60 }}
                padding={0.3}
                groupMode="grouped"
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                // colors={{ scheme: 'accent' }}     
                colors={colorType}    
                // colorBy={(bar) => bar.indexValue} 
                colorBy={(bar) => bar.id} 
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: legendX,
                    legendPosition: 'middle',
                    legendOffset: 52,
                    truncateTickAt: 0
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '',
                    legendPosition: 'middle',
                    legendOffset: -40,
                    truncateTickAt: 0
                }}
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
                            {indexValue} - {id}  : {value}
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
                        // dataFrom: 'indexes',
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 150,
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
                ariaLabel="Jira User Activity Chart"
             />
        </div>
    );

}

export default JiraBarChart;