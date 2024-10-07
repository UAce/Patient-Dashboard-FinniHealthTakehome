import { Navigate, Route, Routes } from "react-router-dom";
import { PatientListPage } from "./Patient/PatientListPage";
import { Typography } from "@mui/material";
import { PatientViewPage } from "./Patient/PatientViewPage";
import { PatientEditPage } from "./Patient/PatientEditPage";
import { PatientListContextProvider } from "./Patient/PatientListContext";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/patients" />} />
    <Route
      index
      path="patients"
      element={
        <PatientListContextProvider>
          <PatientListPage />
        </PatientListContextProvider>
      }
    />
    <Route path="patients/add" element={<Typography>Add patient</Typography>} />
    <Route path="patients/:id/edit" element={<PatientEditPage />} />
    <Route path="patients/:id" element={<PatientViewPage />} />
  </Routes>
);
