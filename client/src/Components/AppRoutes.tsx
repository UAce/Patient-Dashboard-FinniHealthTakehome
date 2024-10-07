import { Navigate, Route, Routes } from "react-router-dom";
import { PatientListPage } from "./Patient/PatientListPage";
import { Typography } from "@mui/material";
import { PatientViewPage } from "./Patient/PatientViewPage";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/patients" />} />
    <Route index path="patients" element={<PatientListPage />} />
    <Route path="patients/add" element={<Typography>Add patient</Typography>} />
    <Route
      path="patients/:id/edit"
      element={<Typography>Edit patient</Typography>}
    />
    <Route path="patients/:id" element={<PatientViewPage />} />
  </Routes>
);
