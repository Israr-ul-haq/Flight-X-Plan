import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import AddPilot from "../Pages/Captains/AddPilot";
import EditPilot from "../Pages/Captains/EditPilot";
import Pilot from "../Pages/Captains/Pilot";
import ViewPilot from "../Pages/Captains/ViewPilot";

function PilotRoutes({ children }) {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Pilot />
            </PrivateRoute>
          }
        />
        <Route
          path="/add"
          element={
            <PrivateRoute>
              <AddPilot />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <PrivateRoute>
              <EditPilot />
            </PrivateRoute>
          }
        />
        <Route
          path="/view/:id"
          element={
            <PrivateRoute>
              <ViewPilot />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default PilotRoutes;
