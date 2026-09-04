import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RiskMap from '../components/RiskMap';
import { apiUrl } from '../services/apiConfig';

export default function RiskMapPage() {
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(apiUrl('/api/moh-zones'))
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setZones(data.data);
        }
      })
      .catch((err) => console.error('Failed to fetch MOH zones:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex-grow flex flex-col min-h-screen bg-slate-50">
      {/* Mini header for navigation */}
      <header className="border-b border-brand-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors"
            aria-label="Go back"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-slate-900">Interactive Risk Map</h1>
        </div>
      </header>

      <main className="flex-grow px-4 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex flex-col">
        <div className="mb-6">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
            Western Province Dengue Risk
          </h2>
          <p className="mt-2 text-slate-600 max-w-3xl">
            Live geographic visualization of localized dengue transmission clusters. Click on any active MOH zone marker to view case counts and preventative health directives.
          </p>
        </div>

        <div className="flex-grow bg-white p-4 rounded-2xl border border-slate-200 shadow-sm min-h-[550px] relative">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10 rounded-2xl">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div>
                <p className="mt-4 text-slate-600 font-medium">Loading map data...</p>
              </div>
            </div>
          ) : zones.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center bg-white z-10 rounded-2xl">
              <p className="text-slate-500">No risk zones found.</p>
            </div>
          ) : null}
          
          <RiskMap zones={zones} />
        </div>
      </main>
    </div>
  );
}
