import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";

import Jobs from "../Pages/Jobs/Jobs";
import ViewJob from "../Pages/Jobs/ViewJob";

function JobRoutes({ children }) {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Jobs />
            </PrivateRoute>
          }
        />
        <Route
          path="/view/:id"
          element={
            <PrivateRoute>
              <ViewJob />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default JobRoutes;
