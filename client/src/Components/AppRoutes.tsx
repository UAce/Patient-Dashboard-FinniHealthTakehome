import { Navigate, Route, Routes } from "react-router-dom";
import { PatientListPage } from "./Patient/PatientListPage";
import { PatientViewPage } from "./Patient/PatientViewPage";
import { PatientEditPage } from "./Patient/PatientEditPage";
import { PatientListContextProvider } from "./Patient/PatientListContext";
import { PatientFormContextProvider } from "./Patient/Form/PatientFormContext";
import { PatientAddPage } from "./Patient/PatientAddPage";

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
    <Route
      path="patients/add"
      element={
        <PatientFormContextProvider>
          <PatientAddPage />
        </PatientFormContextProvider>
      }
    />
    <Route
      path="patients/:id/edit"
      element={
        <PatientFormContextProvider>
          <PatientEditPage />
        </PatientFormContextProvider>
      }
    />
    <Route path="patients/:id" element={<PatientViewPage />} />
  </Routes>
);
