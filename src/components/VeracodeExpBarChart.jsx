import { ResponsivePie } from '@nivo/pie';
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const VeracodeExpBarChart = ({data, total, filterName, sendDataPie, legendX, legendY, colorType}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const margin={top: 40, right: 80, bottom: 80, left: 60};

  const handlePieClick = (e) => {
    const {id, value} = e;
    var labelCheck= {id, value, filterName};
    sendDataPie(labelCheck);
  }

  const handleCenterClick = () => {
    var newFilterName = filterName;
    sendDataPie(newFilterName);
  }

  return (
    <div style={{height: 500, width: '100%', position: 'relative', marginTop: '-30px' }}>
    <ResponsivePie
        data={data}
        onClick={handlePieClick}
        theme={{
          // added
          labels: {
            text: {
              fontSize: '13px'
            }
          },
          legends: {
            text: {
              fill: colors.grey[100],
              fontSize: '13px'
            },
            items: {
              text: {
                fill: colors.grey[100],
                fontSize: '13px'
              }
            }
          },
          tooltip:{
            container: {
              color: 'black',
            },
          }
        }}
        margin={margin}
        innerRadius={0.55}
        cornerRadius={3}
        // colors={{ scheme: 'pastel1' }}
        colors={colorType === true ? ['#50C878','#E35335','#377eb8','#808080','#8F00FF','#FA86C4'] : { scheme: 'pastel1' }}
        borderWidth={2}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        enableArcLabels={false}
        //arcLabelsSkipAngle={10}
        // arcLabelsRadiusOffset={1.3}
        // arcLabelsTextColor={{
        //     from: 'color',
        //     modifiers: [
        //         [
        //             'darker',
        //             2
        //         ]
        //     ]
        // }}
        // enableArcLinkLabels={false}
        arcLinkLabel={['value']}
        arcLinkLabelsSkipAngle={5}
        arcLinkLabelsDiagonalLength={10}
        arcLinkLabelsStraightLength={15}
        arcLinkLabelsTextOffset={8}
        arcLinkLabelsThickness={2}
        arcLinkLabelsTextColor={colors.grey[100]}
        arcLinkLabelsColor={{ from: 'color' }}
        activeOuterRadiusOffset={8}
        legends={[
          {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: legendX,
              translateY: legendY,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 21,
              itemDirection: 'left-to-right',
              itemOpacity: 1,
              symbolSize: 13,
              symbolShape: 'circle',
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
    />
    <div style={{
      position: 'absolute',
      top: -35,
      bottom: 0,
      left:  margin.left,
      right:  margin.right,
      // transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: colors.grey[100],
      pointerEvents: 'none'
    }}>
      <div onClick={handleCenterClick} style={{ pointerEvents: 'visible'}}>
        {total}
      </div>
    </div> 
    </div>
  );
};

export default VeracodeExpBarChart;