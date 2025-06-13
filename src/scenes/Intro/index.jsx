import { useState, useRef } from "react";
import { Box, List, ListItem, ListItemText } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { tokens } from "../../theme";
import Header from "../../components/Header";


const Intro = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const filePath = process.env.PUBLIC_URL + "/assets/";

  const videoPlaylist = [
    { src: `${filePath}/Ada2.mp4`, title: " Ask Ada" },
    { src: `${filePath}/SelfService.mp4`, title: "Self-Service" },
    { src: `${filePath}/GitHub.mp4`, title: "GitHub KPI" },
    { src: `${filePath}/Jira.mp4`, title: "Jira KPI" },
    { src: `${filePath}/SNOW.mp4`, title: "Service Now KPI" }  
  ];

  const handleVideoEnd = () => {
    if (currentVideoIndex < videoPlaylist.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    } else {
      setCurrentVideoIndex(0);
    }
  };

  const handleVideoSelect = (index) => {
    setCurrentVideoIndex(index);
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <Box m="25px" container className="main-box">
      <Header title="Introduction" subtitle="DevOps Dashboard" />
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box width="100%">
          <List sx={{ display: 'flex', flexDirection: 'row', overflowX: 'auto' }}>
            {videoPlaylist.map((video, index) => (
              <ListItem
                button
                key={index}
                selected={index === currentVideoIndex}
                onClick={() => handleVideoSelect(index)}
                sx={{
                  backgroundColor: index === currentVideoIndex ? `${colors.tertiary[400]}` : `${colors.primary[400]}`,
                  borderRadius: '8px',
                  boxShadow:"0px 4px 10px rgba(0, 0, 0, 0.5)" ,
                  border: index === currentVideoIndex ? `4px solid ${colors.tertiary[400]}` : 'none',
                  color: index === currentVideoIndex ? `${colors.tertiary[200]}` : `${colors.tertiary[400]}`,
                  '&:hover': {
                    backgroundColor: 'inherit',
                    border: `2px solid ${colors.tertiary[400]}`,
                  },
                  minWidth: '15px',
                  textAlign: 'center',
                  margin: '5px',
                }}
              >
                <ListItemText  primaryTypographyProps={{ fontSize: '16px', fontWeight: 'bold' }}primary={video.title} />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box width="100%" mt={2}>
          <video
            ref={videoRef}
            src={videoPlaylist[currentVideoIndex].src}
            style={{
              boxShadow:"0px 4px 10px rgba(0, 0, 0, 0.5)" ,
              marginRight: '5px',
              width: '100%',
              aspectRatio: '2 / 0.9'
            }}
            autoPlay={isPlaying}
            loop={false}
            controls
            className="cloud-border"
            onEnded={handleVideoEnd}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Intro;
