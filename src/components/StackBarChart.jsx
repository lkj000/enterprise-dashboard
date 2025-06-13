import { ResponsiveBar } from '@nivo/bar';
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { categoricalColorSchemes } from '@nivo/colors';

const StackBarChart = ({ data, onClickBar /* see data tab */ }) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const desiredColor = categoricalColorSchemes.dark2[1];
    const sortedData = data.filter(pValue => pValue.exemptions > 0).sort((a, b) => b.exemptions - a.exemptions);

    return(
        <div style={{height: 550, width: '100%', position: 'relative', marginTop: '-30px', marginBottom: '30px'}}>
            <ResponsiveBar
                data={sortedData}
                onClick={(data) => {
                    if (onClickBar) onClickBar(data);
                }}
                keys={['exemptions']}
                indexBy="Portfolio"
                margin={{ top: 20, right: 60, bottom: 150, left: 60 }}
                pixelRatio={1}
                padding={0.45}
                innerPadding={0}
                minValue="auto"
                maxValue="auto"
                groupMode="stacked"
                layout="vertical"
                reverse={false}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={desiredColor}
                colorBy="id"
                borderWidth={0}
                borderRadius={0}
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
                        <span>Department: {indexValue}</span>
                        <br />
                        <strong>
                            {id==="total"?"Without Exception":"With Exception"}: {value}
                        </strong>
                    </div>}
                borderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            1.6
                        ]
                    ]
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: -45,
                    legend: 'Department',
                    legendPosition: 'middle',
                    legendOffset: 135
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Exception count (Repo)',
                    legendPosition: 'middle',
                    legendOffset: -40
                }}
                enableGridX={false}
                enableGridY={true}
                enableLabel={true}                
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
                isInteractive={true}
                legends={[]}
                theme={{
                    axis: {
                      legend: {
                        text: {
                          fill: colors.grey[100],
                          fontSize: 13
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
            />
        </div>
    );
};

export default StackBarChart;
