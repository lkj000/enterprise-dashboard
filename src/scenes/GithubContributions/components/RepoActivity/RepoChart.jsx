import {React} from "react";
import { Box, Grid } from '@mui/material';
import MultiLineChart from "../../../../components/MultiLineChart";
import { generateColor } from "../../../../utils";
import { MainBox, BoxStyle } from './styles';

const RepoChart = ({ data, colors }) => {

  var graphArray = data.map((item) => ({
    id: item.user,
    color: generateColor(),
    data: item.appcode_total_weekly_commits.map((commit, j) => ({
      x: `Week ${j + 1}`,
      y: commit,
    })),
  }));


  return ( 
    <MainBox backgroundColor={colors.primary[400]}>
      <div style={ BoxStyle.box1 }>
        <MultiLineChart data={graphArray} dataLegend="Weeks" labelY="# of Commits" fixedData={false} XaxisRotate={-45} graphCss={[50,100,110,80]} translateX={120} />
      </div>
      <Grid container sx={ BoxStyle.box2 }>
        {graphArray.map((dataset,index) => (
          <Box key={index} sx={ BoxStyle.box3 }>
            <div style={{...BoxStyle.box4, backgroundColor: dataset.color }}></div>
            <div style={ BoxStyle.box5 }>{dataset.id}</div>
          </Box>
        ))}
      </Grid>
    </MainBox>
  );
};

export default RepoChart;