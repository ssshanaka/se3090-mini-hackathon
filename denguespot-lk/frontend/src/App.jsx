import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import PublicOnlyRoute from './components/PublicOnlyRoute';
import MainLanding from './pages/MainLanding';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PhiDashboardPage from './pages/PhiDashboardPage';
import ReportHazardPage from './pages/ReportHazardPage';
import RiskMapPage from './pages/RiskMapPage';

export default function App() {
  return <div className="min-h-screen bg-slate-50 text-slate-900"><main><Routes>
    <Route path="/" element={<Navigate to="/login" replace />} />
    <Route element={<PublicOnlyRoute />}><Route path="/login" element={<LoginPage />} /><Route path="/register" element={<RegisterPage />} /></Route>
    <Route element={<ProtectedRoute />}>
      <Route path="/dashboard" element={<MainLanding />} />
      <Route path="/phi-dashboard" element={<PhiDashboardPage />} />
      <Route path="/report-hazard" element={<ReportHazardPage />} />
      <Route path="/risk-zones" element={<RiskMapPage />} />
    </Route>
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes></main></div>;
}
