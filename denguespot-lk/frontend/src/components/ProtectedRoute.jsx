import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from './Navbar';

export default function ProtectedRoute() { 
  return useAuth().user ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : <Navigate to="/login" replace />; 
}
