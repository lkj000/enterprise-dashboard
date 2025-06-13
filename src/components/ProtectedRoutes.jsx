import { Outlet, Navigate, useLocation } from "react-router";
import { useAskeMeAuth, useDashboardAuth, useLogsAuth, useProductivityProgramAuth } from "./Auth";

const ProtectedRoutes = () => {
  // const isAuth = useAuth();
  //const isAdminAuth = useAdminAuth();
  const hasAskMeAuth = useAskeMeAuth();
  const hasDashboardAuth = useDashboardAuth();
  const hasLogsAuth = useLogsAuth();
  const hasProductivityProgramAuth = useProductivityProgramAuth();
  const location = useLocation();

  if (location.pathname === "/") {
    return (
      // isAuth ? < Outlet /> : < Navigate to="/Login" replace state={{ from: "/Home" }}/>
      <Navigate to="/Home" replace />
    );
  } else if (
    location.pathname.toLowerCase() === "/fullperformance" ||
    location.pathname.toLowerCase() === "/veracodeexemptionsadmin" ||
    location.pathname.toLowerCase() === "/runnergroups" ||
    location.pathname.toLowerCase() === "/runnertools" ||
    location.pathname.toLowerCase() === "/deploymenthistory" ||
    location.pathname.toLowerCase() === "/inprogress" ||
    location.pathname.toLowerCase() === "/vmhealth" ||
    location.pathname.toLowerCase() === "/versioning" ||
    location.pathname.toLowerCase() === "/acr" ||
    location.pathname.toLowerCase() === "/exemptionrunners" ||
    location.pathname.toLowerCase() === "/status" ||
    location.pathname.toLowerCase() === "/organizationchart" ||
    location.pathname.toLowerCase() === "/usagehistory" ||
    location.pathname.toLowerCase() === "/architectapproval"
  ) {
    return hasDashboardAuth ? (
      <Outlet />
    ) : (
      <Navigate to="/Home" replace state={{ from: location }} />
    );
  } else if (location.pathname.toLowerCase() === "/askme") {
    return hasAskMeAuth ? (
      <Outlet />
    ) : (
      <Navigate to="/Home" replace state={{ from: location }} />
    );
  }
  else if (location.pathname.toLowerCase() === "/logs") {
    return hasLogsAuth ? (
      <Outlet />
    ) : (
      <Navigate to="/Home" replace state={{ from: location }} />
    );
  }
  else if (location.pathname.toLowerCase() === "/dpp") {
    return hasProductivityProgramAuth ? (
      <Outlet />
    ) : (
      <Navigate to="/Home" replace state={{ from: location }} />
    );
  }
  else {
    return (
      // isAuth ? < Outlet /> : < Navigate to="/Login" replace state={{ from: location }}/>
      location ? (
        <Outlet />
      ) : (
        <Navigate to={location} replace state={{ from: location }} />
      )
    );
  }
};

export default ProtectedRoutes;
