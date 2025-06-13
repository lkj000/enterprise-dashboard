import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import { tokens } from "../../theme";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CodeIcon from "@mui/icons-material/Code";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import SummarizeIcon from "@mui/icons-material/Summarize";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import GitHubIcon from "@mui/icons-material/GitHub";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import PolicyOutlinedIcon from "@mui/icons-material/PolicyOutlined";
import FlightOutlinedIcon from "@mui/icons-material/FlightOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import OfflineBoltOutlinedIcon from "@mui/icons-material/OfflineBoltOutlined";
import PatternIcon from "@mui/icons-material/Pattern";
import NaturePeopleIcon from "@mui/icons-material/NaturePeople";
// import SafewayLogo from '../../Assets/safeway-logo-removebg-preview.png';
import Albertsons from "../../Assets/albertsons-logo.png";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import EditRoadIcon from "@mui/icons-material/EditRoad";
import HandymanIcon from "@mui/icons-material/Handyman";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import RadarIcon from "@mui/icons-material/Radar";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import GppBadOutlinedIcon from "@mui/icons-material/GppBadOutlined";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import LabelIcon from "@mui/icons-material/Label";
import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import SevereColdIcon from "@mui/icons-material/SevereCold";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import TokenIcon from "@mui/icons-material/Token";
import DeviceHubOutlinedIcon from "@mui/icons-material/DeviceHubOutlined";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import CorporateFareOutlinedIcon from "@mui/icons-material/CorporateFareOutlined";
import XIcon from "@mui/icons-material/X";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import TimelineIcon from "@mui/icons-material/Timeline";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import SecurityIcon from "@mui/icons-material/Security";
import HubIcon from "@mui/icons-material/Hub";
import SafetyCheckIcon from "@mui/icons-material/SafetyCheck";
import CommitIcon from "@mui/icons-material/Commit";
import KeyIcon from "@mui/icons-material/Key";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import GavelIcon from "@mui/icons-material/Gavel";
import ArchitectureIcon from "@mui/icons-material/Architecture";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import AssignmentLateOutlinedIcon from '@mui/icons-material/AssignmentLateOutlined';
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import EventRepeatOutlinedIcon from "@mui/icons-material/EventRepeatOutlined";
import DescriptionIcon from "@mui/icons-material/Description";
import PlaylistAddCheckCircleIcon from "@mui/icons-material/PlaylistAddCheckCircle";
import FileOpenOutlinedIcon from "@mui/icons-material/FileOpenOutlined";
import DesignServicesOutlinedIcon from "@mui/icons-material/DesignServicesOutlined";
import LogoDevOutlinedIcon from '@mui/icons-material/LogoDevOutlined';
import DeveloperModeOutlinedIcon from '@mui/icons-material/DeveloperModeOutlined';
import IntegrationInstructionsOutlinedIcon from "@mui/icons-material/IntegrationInstructionsOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import ShowFeedbackIcon from "@mui/icons-material/Feedback";
import {
  useAskeMeAuth,
  useDashboardAuth,
  useLogsAuth,
  useProductivityProgramAuth
} from "../../components/Auth";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";

const Item = ({
  title,
  title2,
  to,
  icon,
  selected,
  setSelected,
  lastPath,
  Parent,
}) => {
  const theme = useTheme();
  const {
    palette: { mode },
  } = theme;
  const colors = tokens(mode);

  const currentPath = to === lastPath;

  const textColor = currentPath
    ? mode === "light"
      ? colors.tertiary[600]
      : "#868dfb"
    : colors.grey[100];

  const backgroundColor = currentPath
    ? mode === "light"
      ? colors.grey[900]
      : "transparent"
    : "transparent";

  const style = {
    color: textColor,
    backgroundColor: backgroundColor,
  };

  return (
    <ListItem
      // style={style}
      sx={{
        ...style,
        "&:hover": {
          color: mode === "light" ? colors.tertiary[600] : "#868dfb",
          backgroundColor: mode === "light" && colors.grey[900],
        },
        "&:active": {
          color: mode === "light" ? colors.tertiary[600] : "#6870fa",
        },
      }}
      onClick={() => setSelected(title, title2)}
      key={{ icon }}
      component={Link}
      to={to}
    >
      <ListItemIcon style={style}>{icon}</ListItemIcon>

      <ListItemText primary={title} secondary={title2}></ListItemText>
    </ListItem>
  );
};

const ItemDashboard = ({
  title,
  title2,
  to,
  icon,
  setSelected,
  lastPath,
  textStyle,
}) => {
  const theme = useTheme();
  const {
    palette: { mode },
  } = theme;
  const colors = tokens(mode);
  const currentPath = to === lastPath;

  const textColor = currentPath
    ? mode === "light"
      ? colors.tertiary[600]
      : "#868dfb"
    : colors.grey[100];

  const backgroundColor = currentPath
    ? mode === "light"
      ? colors.grey[900]
      : "transparent"
    : "transparent";

  const style = {
    color: textColor,
    backgroundColor: backgroundColor,
  };

  return (
    <ListItem
      // style={style}
      sx={{
        ...style,
        "&:hover": {
          color: mode === "light" ? colors.tertiary[600] : "#868dfb",
          backgroundColor: mode === "light" && colors.grey[900],
        },
        "&:active": {
          color: mode === "light" ? colors.tertiary[600] : "#6870fa",
        },
      }}
      onClick={() => setSelected(title, title2)}
      key={{ icon }}
      component={Link}
      to={to}
    >
      <ListItemIcon style={style}>{icon}</ListItemIcon>

      <ListItemText
        primary={title}
        secondary={title2}
        primaryTypographyProps={{
          style: { fontSize: "15px", fontWeight: "bold" },
        }}
      ></ListItemText>
    </ListItem>
  );
};

const Sidebar = ({ isSidebar }) => {
  const theme = useTheme();
  const {
    palette: { mode },
  } = theme;
  const colors = tokens(mode);
  //const isAdminAuth = useAdminAuth();
  const hasAskMeAuth = useAskeMeAuth();
  const hasDashboardAuth = useDashboardAuth();
  const hasLogsAuth = useLogsAuth();
  const hasProductivityProgramAuth = useProductivityProgramAuth();

  //Hover
  const location = useLocation();
  const lastPath = location.pathname;

  const [selected, setSelected] = useState("Dashboard");
  const [isOpen, setIsOpen] = useState(true);

  const [openABS, setOpenABS] = useState(false);
  const [openDPP, setOpenDPP] = useState(false);
  const [openGithub, setOpenGithub] = useState(false);
  const [openSelfService, setOpenSelfService] = useState(false);
  const [opentIntakeFormsNetwork, setOpentIntakeFormsNetwork] = useState(false);

  const [openCentralWorkflows, setOpenCentralWorkflows] = useState(false);
  const [openCICD, setOpenCICD] = useState(false);
  const [openCompliance, setOpenCompliance] = useState(false);
  const [openVeracode, setOpenVeracode] = useState(false);
  const [openSonar, setOpenSonar] = useState(false);
  const [openPPM, setOpenPPM] = useState(false);
  const [openInfosec, setOpenInfosec] = useState(false);
  const [openAdmin, setOpenAdmin] = useState(false);
  const [openArt, setOpenArt] = useState(false);

  const handleClickABS = () => {
    setOpenABS(!openABS);
  };

  const handleClickDPP = () => {
    setOpenDPP(!openDPP);
  };

  const handleClickGithub = () => {
    setOpenGithub(!openGithub);
  };
  const handleClickSelfService = () => {
    setOpenSelfService(!openSelfService);
  };

  const handleClickIntakeForms = () => {
    setOpentIntakeFormsNetwork(!opentIntakeFormsNetwork);
  };

  const handleClickCentralWorkflows = () => {
    setOpenCentralWorkflows(!openCentralWorkflows);
  };

  const handleClickCICD = () => {
    setOpenCICD(!openCICD);
  };
  const handleClickArt = () => {
    setOpenArt(!openArt);
  };
  const handleClickCompliance = () => {
    setOpenCompliance(!openCompliance);
  };
  const handleClickVeracode = () => {
    setOpenVeracode(!openVeracode);
  };

  const handleClickSonar = () => {
    setOpenSonar(!openSonar);
  };

  const handleClickPPM = () => {
    setOpenPPM(!openPPM);
  };

  const handleClickInfosec = () => {
    setOpenInfosec(!openInfosec);
  };

  const handleClickAdmin = () => {
    setOpenAdmin(!openAdmin);
  };

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const pathActions = {
      "/gharepository": setOpenGithub,
      "/ghatools": setOpenSelfService,
      "/intakeformsnetwork": setOpentIntakeFormsNetwork,
      "/intakeformservices": setOpentIntakeFormsNetwork,
      "/intakeformintegration": setOpentIntakeFormsNetwork,
      "/intakeformb2b": setOpentIntakeFormsNetwork,
      "/copilotusers": setOpenGithub,
      "/jiraactivity": setOpenPPM,
      "/teamactivity": setOpenPPM,
      "/sprintactivity": setOpenPPM,
      "/kanbanboards": setOpenPPM,
      "/snowhistory": setOpenPPM,
      "/snowhistoryuser": setOpenPPM,
      "/activity": setOpenPPM,
      "/productinitiatives": setOpenPPM,
      "/planning": setOpenPPM,
      "/risk": setOpenPPM,
      "/performance": setOpenCICD,
      "/workflowactivity": setOpenCICD,
      "/release": setOpenCentralWorkflows,
      "/newfeatures": setOpenCentralWorkflows,
      "/veracode": setOpenVeracode,
      "/veracodeexemptions": setOpenVeracode,
      "/sonarqube": setOpenSonar,
      "/sonarexemptions": setOpenSonar,
      "/sonarexclusions": setOpenSonar,
      "/compliance": setOpenCompliance,
      "/reposecret": setOpenCompliance,
      "/architectapproval": setOpenAdmin,
      "/organizationchart": setOpenABS,
      "/dpp": setOpenDPP,
      "/artifactory": setOpenArt,
      "/xraycve": setOpenArt,
      "/xraycvesummary": setOpenArt,
      "/cyberdefensematrix": setOpenInfosec,
      "/admin": setOpenAdmin,
      "/fullperformance": setOpenAdmin,
      "/runnertools": setOpenAdmin,
      "/runnergroups": setOpenAdmin,
      "/deploymenthistory": setOpenAdmin,
      "/inprogress": setOpenAdmin,
      "/vmhealth": setOpenAdmin,
      "/versioning": setOpenAdmin,
      "/acr": setOpenAdmin,
      "/gcpprojects": setOpenCompliance,
      "/gcpsaexpiry": setOpenCompliance,
      "/gcprenewal": setOpenCompliance,
      "/exemptionrunners": setOpenAdmin,
      "/status": setOpenAdmin,
      "/usagehistory": setOpenAdmin,
      "/veracodeexemptionsadmin": setOpenAdmin,
      "/veracodecve": setOpenVeracode,
      "/veracodecvesummary": setOpenVeracode,
      "/prismacve": setOpenVeracode,
      "/prismacvesummary": setOpenVeracode,
    };

    const lowerCasePath = lastPath.toLowerCase();

    if (pathActions[lowerCasePath]) {
      pathActions[lowerCasePath](true);
    }
  }, [lastPath]);

  const openedMixin = (theme) => ({
    width: 240,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });

  const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });
  if (isSidebar === false) {
    return null;
  }
  return (
    <Box
      boxShadow="0px 4px 10px rgba(0, 0, 0, 0.5)"
      sx={{
        "& .css-15b8vjn-MuiPaper-root-MuiDrawer-paper": {
          background: `${colors.primary[400]} !important`,
        },
        "& .css-1jmvhar-MuiListItem-root": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 15px 5px 20px !important",
        },
        "& .css-1evlaxh": {
          background: `rgb(20, 27, 45) !important`,
        },
        "& .css-1at6zkh": {
          backgroundColor: "transparent !important",
        },
        "& .css-1f2xuhi-MuiDrawer-docked .MuiDrawer-paper": {
          width: "250px !important",
        },
      }}
      style={{ height: "100vh" }}
    >
      <Drawer
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.5)"
        open={isOpen}
        sx={{
          width: 240,
          flexShrink: 0,
          whiteSpace: "nowrap",
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
          ...(isOpen && {
            ...openedMixin(theme),
            "& .MuiDrawer-paper": openedMixin(theme),
          }),
          ...(!isOpen && {
            ...closedMixin(theme),
            "& .MuiDrawer-paper": closedMixin(theme),
          }),
        }}
        variant="permanent"
        anchor="left"
      >
        {/* LOGO AND MENU ICON */}
        <div
          // onClick={() => setIsCollapsed(!isCollapsed)}
          // icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
          //   style={{
          //   margin: "20px 0 20px 0",
          //   color: colors.grey[100],
          // }}
          sx={{
            ...theme.mixins.toolbar,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: theme.spacing(0, 1),
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p="10px"
          >
            {isOpen && (
              <>
                <img height="40px" width="30px" src={Albertsons} alt="" />
                <Typography variant="h5" color={colors.grey[100]}>
                  DevOps Dashboard
                </Typography>
              </>
            )}
            <IconButton onClick={toggleDrawer}>
              <MenuOutlinedIcon />
            </IconButton>
          </Box>
        </div>

        <List>
          <Divider sx={{ boxShadow: "0px 4px 20px rgba(128, 128, 128, 1)" }} />
          <ItemDashboard
            title="Dashboard"
            to="/Home"
            icon={<HomeOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
            lastPath={lastPath}
          />
          <Divider sx={{ boxShadow: "0px 4px 20px rgba(128, 128, 128, 1)" }} />

          <ItemDashboard
            title="Introduction"
            to="/Intro"
            icon={<LocalMoviesIcon />}
            selected={selected}
            setSelected={setSelected}
            lastPath={lastPath}
          />

          <Divider sx={{ boxShadow: "0px 4px 20px rgba(128, 128, 128, 1)" }} />

          {hasAskMeAuth ? (
            <>
              <ItemDashboard
                title="Ask Me"
                title2="Private Preview"
                to="/AskMe"
                icon={<EmojiPeopleIcon />}
                selected={selected}
                setSelected={setSelected}
                lastPath={lastPath}
              />
              <Divider
                sx={{ boxShadow: "0px 4px 20px rgba(128, 128, 128, 1)" }}
              />
            </>
          ) : null}

          {hasDashboardAuth ? (
            <>
              <ListItemButton onClick={handleClickABS}>
                <ListItemIcon>
                  <LabelIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Albertsons"
                  primaryTypographyProps={{
                    style: { fontWeight: "bold", fontSize: "15px" },
                  }}
                />
                {openABS ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openABS} timeout="auto" unmountOnExit>
                <Item
                  title="Organization Chart"
                  to="/OrganizationChart"
                  icon={<CorporateFareOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  lastPath={lastPath}
                />
              </Collapse>
              <Divider
                sx={{ boxShadow: "0px 4px 20px rgba(128, 128, 128, 1)" }}
              />{" "}
            </>
          ) : null}
          <ListItemButton onClick={handleClickSelfService}>
            <ListItemIcon>
              <MiscellaneousServicesIcon />
            </ListItemIcon>
            <ListItemText
              primary="Self-Service"
              primaryTypographyProps={{
                style: { fontWeight: "bold", fontSize: "15px" },
              }}
            />
            {openSelfService ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={openSelfService} timeout="auto" unmountOnExit>
            <Item
              title="Self-Service"
              to="/GHATools"
              title2="GitHub Actions"
              icon={<HandymanIcon />}
              selected={selected}
              setSelected={setSelected}
              lastPath={lastPath}
            />
          </Collapse>
          <Divider sx={{ boxShadow: "0px 4px 20px rgba(128, 128, 128, 1)" }} />
          <ListItemButton onClick={handleClickIntakeForms}>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText
              primary="Intake Forms"
              primaryTypographyProps={{
                style: { fontWeight: "bold", fontSize: "15px" },
              }}
            />
            {opentIntakeFormsNetwork ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={opentIntakeFormsNetwork} timeout="auto" unmountOnExit>
            <Item
              title="Network and UC"
              to="/IntakeFormsNetwork"
              title2="Jira"
              icon={<PlaylistAddCheckCircleIcon />}
              selected={selected}
              setSelected={setSelected}
              lastPath={lastPath}
            />
            <Item
              title="App Services"
              to="/IntakeFormServices"
              title2="Jira"
              icon={<DesignServicesOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              lastPath={lastPath}
            />
            <Item
              title="Integration Services"
              to="/IntakeFormIntegration"
              title2="Jira"
              icon={<IntegrationInstructionsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              lastPath={lastPath}
            />
            <Item
              title="B2B Platform"
              to="/IntakeFormB2B"
              title2="Jira"
              icon={<BusinessOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              lastPath={lastPath}
            />
          </Collapse>
          <Divider sx={{ boxShadow: "0px 4px 20px rgba(128, 128, 128, 1)" }} />
          <ListItemButton onClick={handleClickPPM}>
            <ListItemIcon>
              <TimelineIcon />
            </ListItemIcon>
            <ListItemText
              primary="KPI Reports"
              primaryTypographyProps={{
                style: { fontWeight: "bold", fontSize: "15px" },
              }}
            />
            {openPPM ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={openPPM} timeout="auto" unmountOnExit>
            <Item
              title="GitHub Contributions"
              title2={"GitHub"}
              to="/Activity"
              icon={<CommitIcon />}
              selected={selected}
              setSelected={setSelected}
              lastPath={lastPath}
            />
            <Item
              title="User Activity"
              title2="Jira"
              to="/JiraActivity"
              icon={<AccountTreeIcon />}
              selected={selected}
              setSelected={setSelected}
              lastPath={lastPath}
            />
            <Item
              title="Team Activity"
              title2="Jira"
              to="/TeamActivity"
              icon={<Groups2OutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              lastPath={lastPath}
            />
            <Item
              title="Sprint Activity"
              title2="Jira"
              to="/SprintActivity"
              icon={<FlagCircleIcon />}
              selected={selected}
              setSelected={setSelected}
              lastPath={lastPath}
            />

            <Item
              title="Kanban Activity"
              title2="Jira"
              to="/KanbanBoards"
              icon={<ScoreboardIcon />}
              selected={selected}
              setSelected={setSelected}
              lastPath={lastPath}
            />

            <Item
              title="Planning "
              title2="Jira"
              to="/Planning"
              icon={<EditCalendarOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              lastPath={lastPath}
            />

            <Item
              title="Product Initiatives"
              title2="Jira"
              to="/ProductInitiatives"
              icon={<MonetizationOnIcon />}
              selected={selected}
              setSelected={setSelected}
              lastPath={lastPath}
            />

            <Item
              title="Risk"
              title2="Jira"
              to="/Risk"
              icon={<WarningAmberOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              lastPath={lastPath}
            />

            <Item
              title="User Activity"
              title2="Service Now"
              to="/SNOWHistoryUser"
              icon={<AcUnitIcon />}
              selected={selected}
              setSelected={setSelected}
              lastPath={lastPath}
            />

            <Item
              title="Team Activity"
              title2="Service Now"
              to="/SNOWHistory"
              icon={<SevereColdIcon />}
              selected={selected}
              setSelected={setSelected}
              lastPath={lastPath}
            />

            {hasLogsAuth && (
              <Item
                title="Logs"
                title2="GitHub"
                to="/Logs"
                icon={<DescriptionOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
                lastPath={lastPath}
              />
            )}
          </Collapse>

          {hasProductivityProgramAuth && (<>
            <Divider sx={{ boxShadow: "0px 4px 20px rgba(128, 128, 128, 1)" }} />
            <ListItemButton onClick={handleClickDPP}>
              <ListItemIcon>
                <LogoDevOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primary="DPP"
                primaryTypographyProps={{
                  style: { fontWeight: "bold", fontSize: "15px" },
                }}
              />
              {openDPP ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openDPP} timeout="auto" unmountOnExit>
              <Item
                title="Productivity Program"
                title2={"Developer"}
                to="/DPP"
                icon={<DeveloperModeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
                lastPath={lastPath}
              />
            </Collapse>
          </>)}

          <Divider sx={{ boxShadow: "0px 4px 20px rgba(128, 128, 128, 1)" }} />

          <ListItemButton onClick={handleClickGithub}>
            <ListItemIcon>
              <GitHubIcon />
            </ListItemIcon>
            <ListItemText
              primary="GitHub"
              primaryTypographyProps={{
                style: { fontWeight: "bold", fontSize: "15px" },
              }}
            />
            {openGithub ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={openGithub} timeout="auto" unmountOnExit>
            <Item
              title="GitHub Repositories"
              to="/GHARepository"
              title2="GitHub"
              icon={<CodeIcon />}
              selected={selected}
              setSelected={setSelected}
              lastPath={lastPath}
            />

            <Item
              title="GitHub Copilot Users"
              to="/CopilotUsers"
              title2="GitHub Cloud"
              icon={<FlightOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              lastPath={lastPath}
            />
          </Collapse>
          <Divider sx={{ boxShadow: "0px 4px 20px rgba(128, 128, 128, 1)" }} />
          <ListItemButton onClick={handleClickCentralWorkflows}>
            <ListItemIcon>
              <HubIcon />
            </ListItemIcon>
            <ListItemText
              primary="Central Workflows"
              primaryTypographyProps={{
                style: { fontWeight: "bold", fontSize: "15px" },
              }}
            />
            {openCentralWorkflows ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openCentralWorkflows} timeout="auto" unmountOnExit>
            <Item
              title="Release Notes"
              to="/Release"
              title2="GitHub Actions"
              icon={<NewReleasesIcon />}
              selected={selected}
              setSelected={setSelected}
              lastPath={lastPath}
            />
            <Item
              title="Upcoming Features"
              to="/NewFeatures"
              title2="GitHub Actions"
              icon={<EditRoadIcon />}
              selected={selected}
              setSelected={setSelected}
              lastPath={lastPath}
            />
          </Collapse>
          <Divider sx={{ boxShadow: "0px 4px 20px rgba(128, 128, 128, 1)" }} />
          <ListItemButton onClick={handleClickCICD}>
            <ListItemIcon>
              <PrecisionManufacturingIcon />
            </ListItemIcon>
            <ListItemText
              primary="CICD"
              primaryTypographyProps={{
                style: { fontWeight: "bold", fontSize: "15px" },
              }}
            />
            {openCICD ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openCICD} timeout="auto" unmountOnExit>
            <Item
              title="Performance"
              to="/Performance"
              title2="GitHub Actions"
              icon={<OfflineBoltOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              lastPath={lastPath}
            />
            <Item
              title="Workflow Activity"
              to="/WorkflowActivity"
              title2="GitHub Actions"
              icon={<NaturePeopleIcon />}
              selected={selected}
              setSelected={setSelected}
              lastPath={lastPath}
            />
          </Collapse>
          <Divider sx={{ boxShadow: "0px 4px 20px rgba(128, 128, 128, 1)" }} />
          <ListItemButton onClick={handleClickArt}>
            <ListItemIcon>
              <WarehouseIcon />
            </ListItemIcon>
            <ListItemText
              primary="Artifactory"
              primaryTypographyProps={{
                style: { fontWeight: "bold", fontSize: "15px" },
              }}
            />
            {openArt ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openArt} timeout="auto" unmountOnExit>
            <Item
              title2="JFrog"
              title="Cleanup Policy"
              to="/Artifactory"
              icon={<CleaningServicesIcon />}
              selected={selected}
              setSelected={setSelected}
              lastPath={lastPath}
            />

            {hasDashboardAuth && (
              <Item
                title2="Azure"
                title="Container Registry"
                to="/ACR"
                icon={<CleaningServicesIcon />}
                selected={selected}
                setSelected={setSelected}
                lastPath={lastPath}
              />
            )}
            <Item
              title="Xray Vulnerabilities"
              to="/XrayCVE"
              title2="Xray"
              icon={<XIcon />}
              selected={selected}
              setSelected={setSelected}
              lastPath={lastPath}
            />
            <Item
              title="CVE Summary"
              to="/XrayCVESummary"
              title2="Xray"
              icon={<SummarizeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              lastPath={lastPath}
            />
          </Collapse>
          <Divider sx={{ boxShadow: "0px 4px 20px rgba(128, 128, 128, 1)" }} />
          <ListItemButton onClick={handleClickVeracode}>
            <ListItemIcon>
              <PolicyOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primary="Vulnerability Scan"
              primaryTypographyProps={{
                style: { fontWeight: "bold", fontSize: "15px" },
              }}
            />
            {openVeracode ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openVeracode} timeout="auto" unmountOnExit>
            <Item
              title="Veracode Weekly Scan"
              to="/Veracode"
              title2="Platform Scan (SCA)"
              icon={<SafetyCheckIcon />}
              selected={selected}
              setSelected={setSelected}
              lastPath={lastPath}
            />
            <Item
              title="Application Vulnerabilities"
              to="/VeracodeCVE"
              title2="Veracode (SCA)"
              icon={<GppMaybeIcon />}
              selected={selected}
              setSelected={setSelected}
              lastPath={lastPath}
            />
            <Item
              title="CVE Summary"
              to="/VeracodeCVESummary"
              title2="Veracode"
              icon={<SummarizeIcon />}
              selected={selected}
              setSelected={setSelected}
              lastPath={lastPath}
            />

            <Item
              title="Veracode Exemptions"
              title2="Pipeline Scan (SAST)"
              to="/VeracodeExemptions"
              icon={<GppBadOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              lastPath={lastPath}
            />

            <Item
              title="Container Vulnerabilities"
              to="/PrismaCVE"
              title2="Prisma"
              icon={<GppMaybeIcon />}
              selected={selected}
              setSelected={setSelected}
              lastPath={lastPath}
            />
            <Item
              title="CVE Summary"
              to="/PrismaCVESummary"
              title2="Prisma"
              icon={<SummarizeIcon />}
              selected={selected}
              setSelected={setSelected}
              lastPath={lastPath}
            />
          </Collapse>
          <Divider sx={{ boxShadow: "0px 4px 20px rgba(128, 128, 128, 1)" }} />

          <ListItemButton onClick={handleClickSonar}>
            <ListItemIcon>
              <ArchitectureIcon />
            </ListItemIcon>
            <ListItemText
              primary="Code Quality"
              primaryTypographyProps={{
                style: { fontWeight: "bold", fontSize: "15px" },
              }}
            />
            {openSonar ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openSonar} timeout="auto" unmountOnExit>
            <Item
              title="SonarQube Results"
              to="/SonarQube"
              title2="Pipeline Scan"
              icon={<ViewInArOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              lastPath={lastPath}
            />

            <Item
              title="Sonar Exemptions"
              to="/SonarExemptions"
              title2="Pipeline Scan"
              icon={<RadarIcon />}
              selected={selected}
              setSelected={setSelected}
              lastPath={lastPath}
            />

            <Item
              title="Sonar Exclusions"
              to="/SonarExclusions"
              title2="Pipeline Scan"
              icon={<AssignmentLateOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              lastPath={lastPath}
            />
          </Collapse>
          <Divider sx={{ boxShadow: "0px 4px 20px rgba(128, 128, 128, 1)" }} />
          <ListItemButton onClick={handleClickCompliance}>
            <ListItemIcon>
              <AssuredWorkloadIcon />
            </ListItemIcon>
            <ListItemText
              primary="Compliance"
              primaryTypographyProps={{
                style: { fontWeight: "bold", fontSize: "15px" },
              }}
            />
            {openCompliance ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openCompliance} timeout="auto" unmountOnExit>
            <Item
              title="Compliance"
              title2="CICD"
              to="/Compliance"
              icon={<GavelIcon />}
              selected={selected}
              setSelected={setSelected}
              lastPath={lastPath}
            />
            <Item
              title="Secrets in Repositories"
              title2="GitHub"
              to="/RepoSecret"
              icon={<KeyIcon />}
              selected={selected}
              setSelected={setSelected}
              lastPath={lastPath}
            />
            <Item
              title="GCP Projects"
              title2="GCP"
              to="/GCPProjects"
              icon={<AssignmentOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              lastPath={lastPath}
            />
            <Item
              title="Service Accounts Expiry"
              title2="GCP"
              to="/GCPSAExpiry"
              icon={<EventRepeatOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              lastPath={lastPath}
            />
            <Item
              title="Certificate Renewal"
              title2="GCP"
              to="/GCPRenewal"
              icon={<FileOpenOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              lastPath={lastPath}
            />
            {hasDashboardAuth && (
              <Item
                title="EA Permit - PTx"
                title2="CMDB"
                to="/ArchitectApproval"
                icon={<FactCheckOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
                lastPath={lastPath}
              />
            )}
          </Collapse>
          <Divider sx={{ boxShadow: "0px 4px 20px rgba(128, 128, 128, 1)" }} />

          <ListItemButton onClick={handleClickInfosec}>
            <ListItemIcon>
              <SecurityIcon />
            </ListItemIcon>
            <ListItemText
              primary="Infosec"
              primaryTypographyProps={{
                style: { fontWeight: "bold", fontSize: "15px" },
              }}
            />
            {openInfosec ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openInfosec} timeout="auto" unmountOnExit>
            <Item
              title="Cyber Defense Matrix"
              title2="Org Info"
              to="/CyberDefenseMatrix"
              icon={<PatternIcon />}
              selected={selected}
              setSelected={setSelected}
              lastPath={lastPath}
            />
          </Collapse>

          {hasDashboardAuth ? (
            <>
              <Divider
                sx={{ boxShadow: "0px 4px 20px rgba(128, 128, 128, 1)" }}
              />
              <ListItemButton onClick={handleClickAdmin}>
                <ListItemIcon>
                  <AdminPanelSettingsIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Admin"
                  primaryTypographyProps={{
                    style: { fontWeight: "bold", fontSize: "15px" },
                  }}
                />
                {openAdmin ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openAdmin} timeout="auto" unmountOnExit>
                <Item
                  title="Full Performance"
                  to="/FullPerformance"
                  icon={<AutoGraphIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  lastPath={lastPath}
                />
                <Item
                  title="Runner Tools"
                  to="/RunnerTools"
                  icon={<BuildOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  lastPath={lastPath}
                />
                <Item
                  title="Runner Groups"
                  to="/RunnerGroups"
                  icon={<DirectionsRunIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  lastPath={lastPath}
                />
                <Item
                  title="Deployment History"
                  to="/DeploymentHistory"
                  icon={<TimelineOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  lastPath={lastPath}
                />
                <Item
                  title="In Progress"
                  to="/InProgress"
                  icon={<SportsScoreIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  lastPath={lastPath}
                />

                <Item
                  title="VM Health Check"
                  to="/VMHealth"
                  icon={<MonitorHeartIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  lastPath={lastPath}
                />
                <Item
                  title="Versioning"
                  to="/Versioning"
                  icon={<ManageHistoryIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  lastPath={lastPath}
                />

                <Item
                  title="Exemption Runners"
                  to="/ExemptionRunners"
                  icon={<DeviceHubOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  lastPath={lastPath}
                />
                <Item
                  title="Infrastructure Status"
                  to="/Status"
                  icon={<AutorenewIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  lastPath={lastPath}
                />
                <Item
                  title="Usage History"
                  title2="Dashboard"
                  to="/UsageHistory"
                  icon={<OpenInNewOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  lastPath={lastPath}
                />

                <Item
                  title="Veracode Exemptions"
                  title2="Admin"
                  to="/VeracodeExemptionsAdmin"
                  icon={<TokenIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  lastPath={lastPath}
                />

                <Item
                  title="Feedback"
                  title2="Show Feedback"
                  to="/Feedback"
                  icon={<ShowFeedbackIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  lastPath={lastPath}
                />
              </Collapse>
            </>
          ) : null}
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
