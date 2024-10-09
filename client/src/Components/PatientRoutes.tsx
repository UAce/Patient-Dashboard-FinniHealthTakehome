import { Navigate, Route, Routes } from "react-router-dom";

import { PatientListPage } from "./Patient/Page/PatientListPage";
import { PatientViewPage } from "./Patient/Page/PatientViewPage";
import { PatientEditPage } from "./Patient/Page/PatientEditPage";
import { PatientAddPage } from "./Patient/Page/PatientAddPage";
import { PatientListContextProvider } from "./Patient/PatientListContext";
import { PatientFormContextProvider } from "./Patient/Form/PatientFormContext";

export const PatientRoutes = () => (
  <Routes>
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
    <Route path="*" element={<Navigate to="/patients" replace />} />
  </Routes>
);
