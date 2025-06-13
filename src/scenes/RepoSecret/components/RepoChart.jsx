import { React } from 'react';
import { Box , Grid, Typography } from '@mui/material';
import MultiLineChart from '../../../components/MultiLineChart';
import PieChart from '../../../components/PieChart';
import { total, commonData, lineData } from '../requests';
import { ChartStyle as styles } from "./styles";


const RepoChart = ({ colors }) => {


  return (
    <Box style={styles.mainBox}>
      <Grid container>

        <Grid item xs={10} sm={10} md={10} lg={10} style={styles.grid1}>
          <Box style={styles.box1}>
            <Typography color={colors.grey[100]} style={styles.typo}>
              Secrets Over Time
            </Typography>
            <Box style={styles.box2}>
              <div style={styles.chart1}>
                <MultiLineChart data={lineData}  labelY="# of Secrets" fixedData={false} XaxisRotate={-45} graphCss={[50,100,110,60]} translateX={120}/>
              </div>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={2} sm={2} md={2} lg={2} style={styles.grid2}>
          <Box style={styles.box1}>
            <Typography color={colors.grey[100]} style={styles.typo}>
              Repositories Pie Chart
            </Typography>
            <Box style={styles.box3}>
              <PieChart data={commonData} total={total} legendX={-76}/>
            </Box>
          </Box>
        </Grid> 
                   
      </Grid>
  </Box>
  );
};

export default RepoChart;