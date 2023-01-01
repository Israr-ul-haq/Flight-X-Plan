import {
  Route,
  Routes as Switch,
  HashRouter as Router,
} from "react-router-dom";
import Login from "../Pages/Authentication/Login";
import Dashboard from "../Pages/Dashboard/Dashboard";
import EmployeeRoutes from "../routes/EmployeeRoutes";
import JobRoutes from "../routes/JobRoutes";
import PilotRoutes from "../routes/PilotRoutes";
import WebLayout from "../webLayouts/WebLayouts";
import PrivateRoute from "./PrivateRoute";

function Routes() {
  return (
    <Router>
      <>
        <Switch>
          <Route exact path="/account/login" element={<Login />} />

          <Route path="/" element={<WebLayout />}>
            <Route
              exact
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route path="employee/*" element={<EmployeeRoutes />} />
            <Route path="pilot/*" element={<PilotRoutes />} />
            <Route path="jobs/*" element={<JobRoutes />} />
          </Route>
        </Switch>
      </>
    </Router>
  );
}

export default Routes;
