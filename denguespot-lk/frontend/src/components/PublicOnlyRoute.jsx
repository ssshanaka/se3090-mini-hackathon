import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export default function PublicOnlyRoute() { return useAuth().user ? <Navigate to="/dashboard" replace /> : <Outlet />; }
