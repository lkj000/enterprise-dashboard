import {  useEffect,useState, useMemo } from "react";
import { Routes, Route, Navigate ,useLocation} from "react-router-dom";
import React, { Suspense } from 'react';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { UserGroupsContext } from "./components/UserContext";
import { QueryClient, QueryClientProvider } from "react-query";
import ProgressIcon from "./common-components/ProgressIcon";
import { captureData } from "./logconfig";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import NetworkConnection from "./scenes/global/NetworkConnection";
import Dashboard from "./scenes/dashboard";

const RepoSecret = React.lazy(() => import('./scenes/RepoSecret'));
const CopilotUsers = React.lazy(() => import('./scenes/CoPilot'));
const Veracode = React.lazy(() => import('./scenes/veracode'));
const ReleaseNotes = React.lazy(() => import('./scenes/ReleaseNotes'));
const UpcomingFeature = React.lazy(() => import('./scenes/UpcomingFeature'));
const Compliance = React.lazy(() => import('./scenes/compliance'));
const ArchitectApproval = React.lazy(() => import('./scenes/ArchitectApproval'));
const GHAWorkflow = React.lazy(() => import('./scenes/GHARepository'));
const Performance = React.lazy(() => import('./scenes/Performance'));
const FullPerformance = React.lazy(() => import('./scenes/FullPerformance'));
const WorkflowActivity = React.lazy(() => import('./scenes/workflowActivity'));
const RunnerTools = React.lazy(() => import('./scenes/runnerTools'));
const Artifact = React.lazy(() => import('./scenes/artifact'));
const RunnerGroups = React.lazy(() => import('./scenes/runnerGroups'));
const DeploymentHistory = React.lazy(() => import('./scenes/deploymentHistory'));
const ProductInitiatives = React.lazy(() => import('./scenes/ProductInitiatives'));
const SonarExemptions = React.lazy(() => import('./scenes/sonarExemptions'));
const VeracodeExemptions = React.lazy(() => import('./scenes/veracodeExemptions'));
const VeracodeExemptionsAdmin = React.lazy(() => import('./scenes/VeracodeExemptionsAdmin'));
const GithubContributions = React.lazy(() => import('./scenes/GithubContributions'));
const JiraActivity = React.lazy(() => import('./scenes/JiraActivity'));
const ExemptionRunners = React.lazy(() => import('./scenes/ExemptionRunners'));
const UnderConstruction = React.lazy(() => import('./scenes/underConstruction'));
const DPP = React.lazy(() => import('./scenes/DPP'));
const ProtectedRoutes = React.lazy(() => import('./components/ProtectedRoutes'));

const ACR = React.lazy(() => import('./scenes/ACR'));

const Intro = React.lazy(() => import('./scenes/Intro'));
const GHATools = React.lazy(() => import('./scenes/GHATools'));
const CyberDefenseMatrix = React.lazy(() => import('./scenes/CyberDefenseMatrix'));


const UsageHistory = React.lazy(() => import('./scenes/UsageHistory'));
  
const Risk = React.lazy(() => import('./scenes/Risk'));
const SonarQube = React.lazy(() => import('./scenes/sonarQube'));
const SonarExclusions = React.lazy(() => import('./scenes/sonarExclusions'));
const TeamActivity = React.lazy(() => import('./scenes/TeamActivity'));
const SprintActivity = React.lazy(() => import('./scenes/SprintActivity'));
const KanbanBoards = React.lazy(() => import('./scenes/KanbanBoards'));
const Infrastructure = React.lazy(() => import('./scenes/Infrastructure'));
const OrganizationChart = React.lazy(() => import('./scenes/OrganizationChart'));
const SNOWHistory = React.lazy(() => import('./scenes/SNOWHistory'));
const SNOWHistoryUser = React.lazy(() => import('./scenes/SNOWHistoryUser'));
const GenAiAskMe = React.lazy(() => import('./scenes/AskMe'));
const InProgress = React.lazy(() => import('./scenes/InProgress'));
const Logs = React.lazy(() => import('./scenes/Logs'));
const VeracodeCve = React.lazy(() => import('./scenes/VeracodeCve'));
const PrismaCve = React.lazy(() => import('./scenes/PrismaCve'));
const PrismaCveSummary = React.lazy(() => import('./scenes/PrismaCVESummary'));
const VeracodeCveSummary = React.lazy(() => import('./scenes/VeracodeCVESummary'));
const Planning = React.lazy(() => import('./scenes/Planning'));
const XrayCVE = React.lazy(() => import('./scenes/XrayCVE'));
const XrayCVESummary = React.lazy(() => import('./scenes/XrayCVESummary'));
const IntakeFormsNetwork = React.lazy(() => import('./scenes/IntakeFormsNetwork'));
const IntakeFormServices = React.lazy(() => import('./scenes/IntakeFormServices'));
const IntakeFormIntegration = React.lazy(() => import('./scenes/IntakeFormIntegration'));
const IntakeFormB2B = React.lazy(() => import('./scenes/IntakeFormB2B'));
const GCPProjects = React.lazy(() => import('./scenes/GCPProjects'));
const GCPSAExpiry = React.lazy(() => import('./scenes/GCPSAExpiry'));
const GCPRenewal = React.lazy(() => import('./scenes/GCPRenewal'));
const Feedback = React.lazy(() => import('./scenes/Feedback'));

const queryClient = new QueryClient();

// add use Effect
const App = ({userGroups}) => {
  const location = useLocation();
  const [theme, colorMode] = useMode();
  const [isSidebar] = useState(true);
  //const [adminValue, setAdminValue] = useState(null);

  useEffect(() => {
    captureData(location.pathname);
  }, [location.pathname]);

  const routes = useMemo(() => (
    <Routes>
    <Route exact path="/" element={<ProtectedRoutes />}>
      <Route path="/Home" element={<Dashboard />} />
      <Route path="/AskMe" element={<GenAiAskMe />} />
      <Route path="/Feedback" element={<Feedback />} />
      <Route
        path="/OrganizationChart"
        element={<OrganizationChart />}
      />
      <Route path="/Release" element={<ReleaseNotes />} />
      <Route path="/NewFeatures" element={<UpcomingFeature />} />
      <Route
        path="/ArchitectApproval"
        element={<ArchitectApproval />}
      />
      <Route path="/Veracode" element={<Veracode />} />
      <Route
        path="/SonarExemptions"
        element={<SonarExemptions />}
      />
      <Route
        path="/VeracodeExemptions"
        element={<VeracodeExemptions />}
      />
      <Route
        path="/VeracodeExemptionsAdmin"
        element={<VeracodeExemptionsAdmin />}
      />
      <Route path="/VeracodeCVE" element={<VeracodeCve />} />
      {/* New */}
      <Route path="/PrismaCVE" element={<PrismaCve />} />
      <Route
        path="/PrismaCVESummary"
        element={<PrismaCveSummary />}
      />
      <Route
        path="/VeracodeCVESummary"
        element={<VeracodeCveSummary />}
      />
      <Route path="/Compliance" element={<Compliance />} />
      <Route path="/GHARepository" element={<GHAWorkflow />} />
      <Route path="/Activity" element={<GithubContributions />} />
      <Route path="/TeamActivity" element={<TeamActivity />} />
      <Route path="/JiraActivity" element={<JiraActivity />} />
      <Route
        path="/SprintActivity"
        element={<SprintActivity />}
      />
      <Route path="/KanbanBoards" element={<KanbanBoards />} />
      <Route path="/Performance" element={<Performance />} />
      <Route
        path="/ProductInitiatives"
        element={<ProductInitiatives />}
      />
      <Route path="/Risk" element={<Risk />} />
      <Route path="/Logs" element={<Logs />} />
      <Route path="/DPP" element={<DPP />} />
      <Route
        path="/FullPerformance"
        element={<FullPerformance />}
      />
      <Route
        path="/WorkflowActivity"
        element={<WorkflowActivity />}
      />
      <Route path="/Artifactory" element={<Artifact />} />
      <Route path="/XrayCVE" element={<XrayCVE />} />
      <Route path="/XrayCVESummary" element={<XrayCVESummary />} />
      <Route path="/RunnerTools" element={<RunnerTools />} />
      <Route path="/RunnerGroups" element={<RunnerGroups />} />
      <Route
        path="/DeploymentHistory"
        element={<DeploymentHistory />}
      />
      <Route path="/InProgress" element={<InProgress />} />
      <Route path="/VMHealth" element={<UnderConstruction />} />
      <Route path="/GHATools" element={<GHATools />} />
      <Route path="/Versioning" element={<UnderConstruction />} />
      <Route path="/ACR" element={<ACR />} />
      <Route path="/Intro" element={<Intro />} />
      <Route
        path="/CyberDefenseMatrix"
        element={<CyberDefenseMatrix />}




      />
  <Route path="/CopilotUsers" element={<CopilotUsers />} />
      <Route path="/RepoSecret" element={<RepoSecret />} />
      <Route path="/GCPProjects" element={<GCPProjects />} />
      <Route path="/GCPSAExpiry" element={<GCPSAExpiry />} />
      <Route path="/GCPRenewal" element={<GCPRenewal />} />
      <Route path="/SonarQube" element={<SonarQube />} />
      <Route path="/SonarExclusions" element={<SonarExclusions />} />
      <Route path="/UsageHistory" element={<UsageHistory />} />
      <Route
        path="/ExemptionRunners"
        element={<ExemptionRunners />}
      />
      <Route path="/Status" element={<Infrastructure />} />
      <Route path="/SNOWHistory" element={<SNOWHistory />} />
      <Route
        path="/SNOWHistoryUser"
        element={<SNOWHistoryUser />}
      />
       <Route path="/Planning" element={<Planning />} />
       <Route path="/IntakeFormsNetwork" element={<IntakeFormsNetwork />} />
       <Route path="/IntakeFormServices" element={<IntakeFormServices />} />
       <Route path="/IntakeFormIntegration" element={<IntakeFormIntegration />} />
       <Route path="/IntakeFormB2B" element={<IntakeFormB2B />} />
      <Route path="*" element={<Navigate replace to="/Home" />} />
    </Route>
  </Routes>
 ), []);
 
  return (
    <QueryClientProvider client={queryClient}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <UserGroupsContext.Provider value={userGroups}>
              <NetworkConnection />
              <div className="MainSidebar">
                {" "}
                <Sidebar isSidebar={isSidebar} />{" "}
              </div>
              <main className="content">
                <Topbar isSidebar={isSidebar} />
              
                <Suspense fallback={<ProgressIcon />}>
              
                {routes}
                </Suspense>
            
  
              </main>
            </UserGroupsContext.Provider>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
      </QueryClientProvider>
  );
};
export default App;