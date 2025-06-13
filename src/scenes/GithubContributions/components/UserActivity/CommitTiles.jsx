import {React} from "react";
import { Box } from '@mui/material';
import CommitOutlinedIcon from '@mui/icons-material/CommitOutlined';
import AltRouteOutlinedIcon from '@mui/icons-material/AltRouteOutlined';
import AutoModeOutlinedIcon from '@mui/icons-material/AutoModeOutlined';
import IconTiles from "../../../../common-components/IconTiles";

const CommitTiles = ({ input, selectIndex, colors }) => {

  const tilesData = [
    {
        title: "Total Contributions in Last 30 days",
        icon: (<AutoModeOutlinedIcon
            sx={{ color: colors.tertiary[600], fontSize: "28px" }}
        />),
        value: input[selectIndex].totalContributions,
        span: 4,
        mt: '28px'
    },
    {
        title: "Commits in Last 30 days",
        icon: (<CommitOutlinedIcon
            sx={{ color: colors.tertiary[600], fontSize: "28px" }}
        />),
        value: input[selectIndex].totalCommitContributions,
        span: 4,
        mt: '30px'
    },
    {
        title: "PR's created in Last 30 days",
        icon: (<AltRouteOutlinedIcon
            sx={{ color: colors.tertiary[600], fontSize: "28px" }}
        />),
        value: input[selectIndex].totalPullRequestContributions,
        span: 4,
        mt: '30px'
    }
  ];

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gridAutoRows="140px"
      gap="20px"
      marginBottom="40px"
    >
      <IconTiles data={tilesData} colors={colors} />
    </Box>
  );
};

export default CommitTiles;