import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import Logo from './Logo';

export default function Navbar() {
  const { user, logout } = useAuth(); const navigate = useNavigate();
  const signOut = () => { logout(); navigate('/login'); };
  const role = user?.role === 'phi' ? 'PHI' : 'Resident'; const name = user?.fullName?.trim().split(/\s+/)[0];
  return (
    <header className="sticky top-0 z-50 bg-slate-50/95 backdrop-blur-md border-b border-brand-100">
      <nav className="max-w-[1100px] mx-auto flex flex-wrap items-center justify-between gap-3 px-6 h-20" aria-label="Main navigation">
        <Link to={user ? '/dashboard' : '/login'} className="flex items-center gap-3 text-xl font-extrabold tracking-tight text-brand-700 focus:outline-none group">
          <div className="flex items-center justify-center transition-transform group-hover:scale-105">
            <Logo className="w-10 h-10" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-slate-800 leading-none">SuwaMaga</span>
            <span className="text-[11px] font-semibold text-brand-700 uppercase tracking-wider mt-1 hidden sm:block">Western Province Health Sentinel</span>
          </div>
        </Link>
        {user ? (
          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-6 mr-4">
              <Link to="/risk-zones" className="text-sm font-semibold text-slate-600 hover:text-brand-700 transition-colors py-1">Risk Zones</Link>
              {user?.role !== 'phi' && (
                <Link to="/report-hazard" className="text-sm font-semibold text-slate-600 hover:text-brand-700 transition-colors py-1">Report Hazard</Link>
              )}
              <Link to="/reports" className="text-sm font-semibold text-slate-600 hover:text-brand-700 transition-colors py-1">Public Incident Queue</Link>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={signOut} className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-bold text-white hover:bg-brand-800 focus:outline-none focus:ring-3 focus:ring-brand-100">Logout</button>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="rounded-lg px-3 py-2 text-sm font-bold text-brand-700 hover:bg-brand-50 focus:outline-none focus:ring-3 focus:ring-brand-100">Login</Link>
            <Link to="/register" className="rounded-lg bg-brand-700 px-3 py-2 text-sm font-bold text-white hover:bg-brand-600 focus:outline-none focus:ring-3 focus:ring-brand-100">Register</Link>
          </div>
        )}
      </nav>
    </header>
  );
}
