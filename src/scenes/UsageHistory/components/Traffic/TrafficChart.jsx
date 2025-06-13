import { React } from 'react';
import { Box } from '@mui/material';
import ChartBox from '../../../../common-components/ChartBox';
import JiraLineChart from '../../../../components/JiraLineChart';
import TileBox from "../../../../components/TileBox";
import { getURLChart } from "../../requests";


const TrafficChart = ({ input, selectURL, URLData, colors }) => {

  const TileData = [
    { column: true, title: 'Total URL Hits', text: input.length  },
    { column: URLData.length, title: `${selectURL} URL Hits`, text: URLData.length }
  ];

  const chartData = URLData.length > 0 ? 
    [{ "id": selectURL, "color": "#50C878", "data": getURLChart(URLData) }] : [];


  return (
    <Box>
        
      {/* TILES */}
        <Box display="flex" flexDirection="column" justifyContent="space-between" sx={{ positionLeft:15, marginBottom: 5 }}>
          <Box
            display="grid"
            gridTemplateColumns="repeat(16, 1fr)"
            gridAutoRows="100px"
            gap="10px"
            marginBottom="10px"
          >
            {TileData.map((data, index) => (
              data.column ? (
                <TileBox key={index} actionIcon={null} title={data.title} text={data.text} size="5" info={true} value={[]} />
              ) : null
            ))}
          </Box>
        </Box>

        {/* CHART */}
        {chartData.length > 0 &&
        (<ChartBox title="URL Hits History (Last 30 Days)" colors={colors}>
          <div style={{ height: 400, position:'relative' }}>
            <JiraLineChart chartData={chartData} colorType={['#50C878']} marginCss={[45,140,80,60]} legendX="Date" legendY="Value" maxValue={true} XaxisRotate={-30} legendTextBottom={80} legendTextRight={-10} legendXOffset={60} legendWidth="115px" />
          </div>
        </ChartBox>)}

    </Box>
  );
};

export default TrafficChart;