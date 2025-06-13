import { React } from 'react';
import { Box } from '@mui/material';
import ChartBox from '../../../../common-components/ChartBox';
import JiraLineChart from '../../../../components/JiraLineChart';
import TileBox from "../../../../components/TileBox";
import { getServiceChart } from './ServiceData';


const ServiceChart = ({ totCount, successCount, failedCount, graphData, colors }) => {


  const TileData = [
    { title: 'Total Workflow Count', text: totCount  },
    { title: 'Success Workflow Count', text: successCount  },
    { title: 'Failed Workflow Count', text: failedCount  }
  ];

  let chartData = [];
  if (Object.values(graphData).length > 0) {
    const graphValue = getServiceChart(graphData);
    chartData = [
      { "id": "Success Runs", "color": "#50C878", "data": graphValue.map((item) => ({ "x": item.date, "y": item.success })).reverse() },
      { "id": "Failure Runs", "color": "#E35335", "data": graphValue.map((item) => ({ "x": item.date, "y": item.failure })).reverse() },
      { "id": "Total Runs", "color": "#377eb8", "data": graphValue.map((item) => ({ "x": item.date, "y": item.total_runs })).reverse() }
    ];
  }


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
              <TileBox key={index} actionIcon={null} title={data.title} text={data.text} size="5" info={true} value={[]} />
            ))}
          </Box>
        </Box>

      {/* CHART */}
      {Object.values(graphData).length > 0 &&
        (<ChartBox title="Workflow History" colors={colors}>
          <div style={{ height: 400, position:'relative' }}>
            <JiraLineChart chartData={chartData} colorType={['#50C878','#E35335','#377eb8']} marginCss={[45,140,80,60]} legendX="Date" legendY="Value" maxValue={true} XaxisRotate={-30} legendTextBottom={80} legendTextRight={-10} legendXOffset={60} legendWidth="110px" />
          </div>
      </ChartBox>)}
    </Box>
  );
};

export default ServiceChart;