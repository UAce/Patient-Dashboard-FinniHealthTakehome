import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { LoginPage } from "./Components/Authentication/LoginPage";
import { useAuthContext } from "./Components/Authentication/AuthContext";
import { AppLayout } from "./Components/Layout/AppLayout";
import { PageLoading } from "./Components/Layout/PageLoading";
import { PatientRoutes } from "./Components/PatientRoutes";

function App() {
  const { isAuthenticated, isAuthLoading } = useAuthContext();
  return isAuthLoading ? (
    <PageLoading />
  ) : isAuthenticated ? (
    <AppLayout>
      <PatientRoutes />
    </AppLayout>
  ) : (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
