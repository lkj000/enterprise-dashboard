import { Box, IconButton, useTheme, Dialog, DialogTitle, Typography, DialogContent, Divider } from "@mui/material";
import { React, useState, useContext, useEffect } from "react";
import { useLocation } from "react-router";
//import { AdminContext } from "../../components/UserContext";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import HelpCenterOutlinedIcon from '@mui/icons-material/AutoStories';
import Icon from '../../Assets/albertsons-logo.png';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import WikiInfo from "../../components/WikiInfo";
import robot from '../../Assets/robot12.mp4';
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import './style/style.css';
import messages from './data/adaMessages.json';
import AddFeedbackIcon from '@mui/icons-material/AddComment';
import { Tooltip } from "@mui/material";
import FeedbackModal from "../Feedback/components/FeedbackModal";
import SnackbarAlert from "../../components/SnackbarAlert";


const Topbar = ({ isSidebar }) => {

    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("success");

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }, 10000);
        return () => clearInterval(interval);
    }, []);
    const [openPopup, setOpenPopup] = useState(false);

    const handleVideoClick = () => {
        setOpenPopup(true);
    };

    const handleClosePopup = () => {
        setOpenPopup(false);
    };

    const location = useLocation();
    //const login_path = location.pathname;
    const { palette: { mode }} = useTheme();
    const colorMode = useContext(ColorModeContext);
    //const { setAdminValue } = useContext(AdminContext);
    //const [adminPSD, setAdminPSD] = useState('');
    const [openWiki, setOpenWiki] = useState(false);
    const [pathWiki, setPathWiki] = useState((null));
    const colors = tokens(mode);

    const handleWikiClickOpen = () => {
        setPathWiki(location.pathname);
        setOpenWiki(true);
    }

    const handleCloseWiki = () => {
        setOpenWiki(false);
    }

    if (isSidebar === false) {
        return (


            <Box display="flex" justifyContent="flex-end" maxHeight="20px" padding="15px">

                <IconButton padding-top="15px" onClick={colorMode.toggleColorMode}>
                    {mode === "light" ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}


                </IconButton>
            </Box>

        );
    }


    return (
        <Box display="flex" justifyContent="space-between" p={2} style={{ padding: '10px 18px 0 18px' }}>
            {/* SEARCH BAR */}
            <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px" maxHeight="40px" margin="5px" sx={{ display: 'none' }} >
                <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
                <IconButton type="button" sx={{ p: 1 }}>
                    <SearchIcon />
                </IconButton>
            </Box>
            <Box display="flex" style={{ margin: '0px', marginLeft: "80px" }} >




            </Box>
            <Box display="flex" flexDirection="row" justifyContent="center" maxHeight="50px" style={{ margin: '0px', borderColor: colors.tertiary[400], height: '70px', width: "70%" }}>
                <Box display="flex" justifyContent="flex-end" style={{ margin: '0px', borderColor: colors.tertiary[400], marginTop: '0px', width: "5%" }} >
                    <video src={robot} alt="robot" style={{ backgroundColor: colors.tertiary[400], boxShadow: '0px 4px 8px rgba(128, 128, 128, 0.5)', marginRight: '5px' }} autoPlay loop muted
                        onClick={handleVideoClick} className="cloud-border" />
                </Box>
                <Box display="flex" className="cloud-border" style={{ marginLeft: '1px', borderColor: colors.tertiary[400], paddingLeft: '5px' }} width="80%" onClick={handleVideoClick}  >

                    <span style={{ color: colors.tertiary[400], marginLeft: '25px', marginRight: '25px', fontSize: '16px', wordWrap: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal' }}>
                        {messages[currentMessageIndex].msg}
                    </span>


                </Box>
            </Box>
            {/* ICONS */}
            <Box display="flex" maxHeight="40px">
                <Tooltip title="Add Feedback" placement="bottom">
                    <IconButton onClick={() => setFeedbackModalOpen(true)}>
                        <AddFeedbackIcon sx={{color: mode === 'light' && colors.tertiary[600]}}/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Wiki" placement="bottom">
                    <IconButton onClick={handleWikiClickOpen}>
                        <HelpCenterOutlinedIcon sx={{color: mode === 'light' && colors.tertiary[600]}}/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Change Theme" placement="bottom">
                    <IconButton onClick={colorMode.toggleColorMode}>
                        {mode === "light" ? (
                            <DarkModeOutlinedIcon sx={{color: colors.tertiary[600]}}/>
                        ) : (
                            <LightModeOutlinedIcon />
                        )}
                    </IconButton>
                </Tooltip>
                {localStorage.getItem('shortname') ? (
                    <Box
                        sx={{
                            marginTop: '6px',
                            width: 30,
                            height: 30,
                            backgroundColor: mode === 'light' ? colors.tertiary[600] : '#4cceac',
                            borderRadius: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'black',
                            cursor: 'pointer',
                            '&:hover': { color: 'white' }
                        }} >
                        <Typography variant="h6" >{localStorage.getItem("shortname")} </Typography>
                    </Box>
                )
                    :
                    (
                        <IconButton>
                            <AccountCircleOutlinedIcon sx={{color: mode === 'light' && colors.tertiary[600]}}/>
                        </IconButton>
                    )}

                

                <Dialog open={openWiki} onClose={handleCloseWiki} fullWidth maxWidth="lg">
                    <Box m={5}>
                        <Box display="flex" flexDirection="row" justifyContent="center">
                            <img src={Icon} alt="Logo" height="100px" />
                            <DialogTitle fontSize={30} fontWeight={600} marginLeft={-3} marginTop={1}>Wiki Information</DialogTitle>
                        </Box>
                        <WikiInfo path={pathWiki} />
                    </Box>
                </Dialog>

                <Dialog open={openPopup} onClose={handleClosePopup} fullWidth maxWidth="lg">
                    <DialogTitle fontSize={30} fontWeight={400}><video src={robot} alt="robot" style={{ maxWidth: '75px', maxHeight: '75px', margin: '0px', backgroundColor: colors.tertiary[400], boxShadow: '0px 4px 8px rgba(128, 128, 128, 0.5)' }} autoPlay loop muted className="cloud-border"
                    />  <span style={{ marginLeft: '35%', marginbottom: "10px" }} >COMING SOON!</span></DialogTitle>
                    <Divider />
                    <DialogContent>
                        <Typography fontSize={20} fontWeight={200}>
                            <span className="typing-line" id="line1">Hey! This is Ada. 😊</span><br />
                            <span className="typing-line" id="line2">I hear you! Things could be a lot simpler and you could use some help.</span>
                            <span className="typing-line" id="line3">The good news is, help is on the way. 😉 </span>
                            <span className="typing-line" id="line4">I am your new AI Assistant, and I have so many skills and so much knowledge for you to leverage.</span>
                            <span className="typing-line" id="line5">My creators designed me to offer you amazing capabilities without breaking the bank. 😅</span><br />
                            <span className="typing-line" id="line6">Get ready to experience a whole new level of assistance.  </span>
                            <span className="typing-line" id="line7">I can't wait to meet you. 😌 </span><br />


                            <span className="typing-line" id="line8">Sincerely,  <span className="signature">Ada</span>
                            </span><br />
                            <span className="typing-line" id="line9">P.S. I am named after <strong>Ada Lovelace</strong>, the first female computer programmer. What an honor! </span>

                        </Typography>
                    </DialogContent>
                </Dialog>

                <FeedbackModal 
                    open={feedbackModalOpen} 
                    setOpen={setFeedbackModalOpen}
                    setAlertOpen={setAlertOpen}
                    setAlertMessage={setAlertMessage}
                    setAlertSeverity={setAlertSeverity}
                />
                
                <SnackbarAlert open={alertOpen} severity={alertSeverity} onClose={() => setAlertOpen(false)}>
                    {alertMessage}
                </SnackbarAlert>
                
            </Box>

        </Box>
    );
};


export default Topbar
