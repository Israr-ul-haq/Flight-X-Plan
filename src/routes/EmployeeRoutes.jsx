import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import AddEmployee from "../Pages/Employees/AddEmployee";
import EditEmployee from "../Pages/Employees/EditEmployee";
import Employee from "../Pages/Employees/Employee";
import ViewEmployee from "../Pages/Employees/ViewEmployee";

function EmployeeRoutes({ children }) {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Employee />
            </PrivateRoute>
          }
        />
        <Route
          path="/add"
          element={
            <PrivateRoute>
              <AddEmployee />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <PrivateRoute>
              <EditEmployee />
            </PrivateRoute>
          }
        />
        <Route
          path="/view/:id"
          element={
            <PrivateRoute>
              <ViewEmployee />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default EmployeeRoutes;
