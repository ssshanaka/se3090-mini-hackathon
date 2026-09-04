import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiUrl } from '../services/apiConfig';

export default function PhiDashboardPage() {
  const { user } = useAuth();
  const [zones, setZones] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState('All');
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

  const filteredZones = zones.filter((zone) => {
    const matchesSearch = zone.mohName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = riskFilter === 'All' || zone.riskLevel === riskFilter;
    return matchesSearch && matchesFilter;
  });

  const getRiskColor = (level) => {
    switch (level) {
      case 'High':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Moderate':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const statHigh = zones.filter(z => z.riskLevel === 'High').length;
  const statMod = zones.filter(z => z.riskLevel === 'Moderate').length;
  const statLow = zones.filter(z => z.riskLevel === 'Low').length;

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          PHI Dashboard: {user.mohDivision}
        </h1>
        <p className="mt-2 text-lg text-slate-600">
          Welcome, {user.fullName}. Monitor risk levels and prioritize interventions across the Western Province.
        </p>
      </div>

      {/* Stats Bar */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm text-center">
          <p className="text-sm font-medium text-slate-500">Total Zones</p>
          <p className="mt-1 text-3xl font-bold text-slate-900">{zones.length}</p>
        </div>
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 shadow-sm text-center">
          <p className="text-sm font-medium text-red-600">High Risk</p>
          <p className="mt-1 text-3xl font-bold text-red-900">{statHigh}</p>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 shadow-sm text-center">
          <p className="text-sm font-medium text-amber-600">Moderate Risk</p>
          <p className="mt-1 text-3xl font-bold text-amber-900">{statMod}</p>
        </div>
        <div className="rounded-xl border border-green-200 bg-green-50 p-4 shadow-sm text-center">
          <p className="text-sm font-medium text-green-600">Low Risk</p>
          <p className="mt-1 text-3xl font-bold text-green-900">{statLow}</p>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="w-full md:max-w-xs">
          <label htmlFor="search" className="sr-only">Search Zones</label>
          <input
            type="text"
            id="search"
            className="w-full rounded-lg border border-slate-300 px-4 py-2 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            placeholder="Search MOH Division..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {['All', 'High', 'Moderate', 'Low'].map((filter) => (
            <button
              key={filter}
              onClick={() => setRiskFilter(filter)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                riskFilter === filter
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Directory Grid */}
      {loading ? (
        <div className="py-12 text-center text-slate-500">Loading risk directory...</div>
      ) : filteredZones.length === 0 ? (
        <div className="py-12 text-center text-slate-500">
          <p className="text-lg font-medium">No MOH divisions found</p>
          <p className="text-sm">Adjust your search or filter criteria.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredZones.map((zone) => (
            <article 
              key={zone._id} 
              onClick={() => navigate(`/phi-dashboard/zone/${zone.mohName}`)}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col h-full hover:border-brand-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{zone.mohName}</h3>
                  <p className="text-sm text-slate-500">{zone.district} District</p>
                </div>
                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getRiskColor(zone.riskLevel)}`}>
                  {zone.riskLevel}
                </span>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-slate-500">Active Cases</p>
                <p className="text-2xl font-bold text-slate-900">{zone.activeCases}</p>
              </div>
              
              <div className="mt-auto rounded-lg bg-slate-50 p-4 border border-slate-100">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Action Directive</p>
                <p className="text-sm text-slate-600 leading-relaxed">{zone.recommendedAction}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
