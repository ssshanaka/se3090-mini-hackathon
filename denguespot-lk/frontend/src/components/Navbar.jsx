import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth(); const navigate = useNavigate();
  const signOut = () => { logout(); navigate('/login'); };
  const role = user?.role === 'phi' ? 'PHI' : 'Resident'; const name = user?.fullName?.trim().split(/\s+/)[0];
  return <header className="border-b border-brand-100 bg-white"><nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6" aria-label="Main navigation"><Link to={user ? '/dashboard' : '/login'} className="text-xl font-extrabold tracking-tight text-brand-700 focus:outline-none focus:ring-3 focus:ring-brand-100">SuwaMaga</Link>{user ? <div className="flex flex-wrap items-center justify-end gap-3"><span className="text-sm font-medium text-slate-700">Signed in as: {name} ({role} - {user.mohDivision})</span><button onClick={signOut} className="rounded-lg bg-brand-700 px-3 py-2 text-sm font-bold text-white hover:bg-brand-600 focus:outline-none focus:ring-3 focus:ring-brand-100">Logout</button></div> : <div className="flex gap-2"><Link to="/login" className="rounded-lg px-3 py-2 text-sm font-bold text-brand-700 hover:bg-brand-50 focus:outline-none focus:ring-3 focus:ring-brand-100">Login</Link><Link to="/register" className="rounded-lg bg-brand-700 px-3 py-2 text-sm font-bold text-white hover:bg-brand-600 focus:outline-none focus:ring-3 focus:ring-brand-100">Register</Link></div>}</nav></header>;
}
