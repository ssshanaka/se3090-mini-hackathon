import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const phiCards = ['Pending Reports', 'Risk Triage', 'Verified Hazards', 'Resolved Cases'];

export default function MainLanding() {
  const { user } = useAuth();
  const isPhi = user.role === 'phi';

  if (isPhi) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <p className="text-sm font-bold tracking-widest text-brand-700 uppercase">{user.mohDivision} MOH Division</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">PHI Officer Dashboard</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Welcome, {user.fullName}. These are temporary workspace shortcuts for this hackathon prototype.{' '}
          <span className="font-bold text-brand-700">UI is currently under development separately.</span>
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {phiCards.map((card) => (
            <article key={card} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">{card}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">Coming in a future phase.</p>
            </article>
          ))}
        </div>
      </section>
    );
  }

  // Resident Main Landing UI
  return (
    <div className="flex-grow flex flex-col justify-center min-h-[calc(100vh-73px)]">
      <section className="py-16 md:py-24 px-6 flex-grow flex flex-col items-center justify-center">
        <div className="max-w-[1100px] mx-auto text-center flex flex-col items-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-800 tracking-tight leading-[1.15] max-w-4xl">
            Real-time dengue risk visibility for the Western Province
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-500 font-normal max-w-2xl leading-relaxed">
            Closing the gap between hazard reporting and PHI inspection.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link to="/report-hazard" className="w-full sm:w-auto px-8 py-3.5 bg-brand-700 hover:bg-brand-800 text-white text-base font-semibold rounded-xl shadow-sm hover:shadow transition-all text-center">
              Report a Hazard
            </Link>
            <Link to="/reports" className="w-full sm:w-auto px-8 py-3.5 bg-white border border-slate-300 hover:border-brand-700 text-slate-700 hover:text-brand-700 text-base font-semibold rounded-xl shadow-sm hover:shadow transition-all text-center">
              Public Incident Queue
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 md:pb-28">
        <div className="max-w-[1100px] mx-auto">
          <div className="bg-brand-50 border border-brand-100 rounded-2xl p-8 sm:p-12 md:p-16 shadow-sm">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white border border-brand-100 flex items-center justify-center text-brand-700 shadow-sm">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3a6 6 0 0 0-6 6c0 3.8 3.5 7.5 5.5 9.3a.75.75 0 0 0 1 0C14.5 16.5 18 12.8 18 9a6 6 0 0 0-6-6z"/>
                  <circle cx="12" cy="9.5" r="2.5"/>
                  <path d="M13.8 11.3L15.5 13"/>
                </svg>
              </div>
              <div className="flex flex-col flex-1">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
                  Why This Matters
                </h2>
                <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
                  Sri Lanka's Western Province — covering the Colombo, Gampaha and Kalutara districts — accounts for a majority of the country's dengue cases each year. The core bottleneck is the delay between a mosquito breeding site appearing and a Public Health Inspector reaching it for inspection. Residents currently have no way to see localized risk levels in real time, and health authorities have no direct channel for citizens to report hazards as they appear.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-slate-50 py-8 px-6 mt-auto">
        <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-sm font-medium text-slate-600">
            SuwaMaga — SE3090 Mini Hackathon 2026
          </p>
          <p className="text-xs text-slate-400">
            Student research & development project. Non-commercial public health prototype.
          </p>
        </div>
      </footer>
    </div>
  );
}
