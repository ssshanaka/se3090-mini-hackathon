import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import PublicOnlyRoute from './components/PublicOnlyRoute';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

export default function App() {
  return <div className="min-h-screen bg-slate-50 text-slate-900"><Navbar /><main><Routes>
    <Route path="/" element={<Navigate to="/login" replace />} />
    <Route element={<PublicOnlyRoute />}><Route path="/login" element={<LoginPage />} /><Route path="/register" element={<RegisterPage />} /></Route>
    <Route element={<ProtectedRoute />}><Route path="/dashboard" element={<DashboardPage />} /></Route>
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes></main></div>;
}
