// Integration: Person 1 can render <IncidentQueue /> for the Public Incident Queue tab/route.
import { useCallback, useEffect, useMemo, useState } from 'react';
import { IncidentCard } from './IncidentCard';
import { getReports } from './reportApi';

const allDivisions = 'All MOH Divisions';

function toReportList(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.reports)) return payload.reports;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

function IncidentQueue() {
  const [reports, setReports] = useState([]);
  const [mohDivision, setMohDivision] = useState(allDivisions);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const loadReports = useCallback(async () => {
    setLoading(true);
    setHasError(false);

    try {
      const payload = await getReports();
      const orderedReports = toReportList(payload).sort(
        (first, second) => new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime(),
      );
      setReports(orderedReports);
    } catch {
      setHasError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  const filteredReports = useMemo(() => {
    const query = search.trim().toLowerCase();

    return reports.filter((report) => {
      const matchesDivision = mohDivision === allDivisions || report.mohDivision === mohDivision;
      const searchableText = [report.hazardType, report.mohDivision, report.district, report.addressNotes]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return matchesDivision && (!query || searchableText.includes(query));
    });
  }, [mohDivision, reports, search]);

  const divisions = useMemo(
    () => [...new Set(reports.map((report) => report.mohDivision).filter(Boolean))].sort(),
    [reports],
  );

  const filtersAreActive = mohDivision !== allDivisions || Boolean(search.trim());
  const clearFilters = () => {
    setMohDivision(allDivisions);
    setSearch('');
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="overflow-hidden rounded-2xl bg-brand-700 px-6 py-8 text-white shadow-sm sm:px-8 sm:py-10">
        <div className="max-w-2xl">
          <p className="text-sm font-bold tracking-widest text-brand-100 uppercase">Community safety</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Public Incident Queue</h1>
          <p className="mt-3 text-base leading-7 text-brand-50">Recently reported mosquito breeding hazards in Western Province.</p>
          <p className="mt-5 text-sm font-medium text-brand-100">Public view - Personal contact details are protected.</p>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_13rem]">
          <label className="block text-sm font-semibold text-slate-700" htmlFor="incident-search">
            Search reports
            <input
              id="incident-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Hazard, area, or notes"
              className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-brand-600 focus:ring-3 focus:ring-brand-100"
            />
          </label>
          <label className="block text-sm font-semibold text-slate-700" htmlFor="moh-division-filter">
            MOH Division
            <select
              id="moh-division-filter"
              value={mohDivision}
              onChange={(event) => setMohDivision(event.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-brand-600 focus:ring-3 focus:ring-brand-100"
            >
              <option>{allDivisions}</option>
              {divisions.map((division) => <option key={division}>{division}</option>)}
            </select>
          </label>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <p className="text-sm font-medium text-slate-600" aria-live="polite">
            {!loading && !hasError && `${filteredReports.length} ${filteredReports.length === 1 ? 'report' : 'reports'} shown`}
          </p>
          {filtersAreActive && (
            <button onClick={clearFilters} className="rounded-lg px-2 py-1 text-sm font-bold text-brand-700 underline underline-offset-2 hover:text-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600">
              Clear filters
            </button>
          )}
        </div>
      </div>

      {loading && <p className="mt-8 rounded-xl border border-brand-100 bg-brand-50 p-5 text-sm font-medium text-brand-700">Loading hazard reports...</p>}

      {!loading && hasError && (
        <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-5 text-red-800" role="alert">
          <p className="font-semibold">Could not load reports. Please try again.</p>
          <button onClick={loadReports} className="mt-3 rounded-lg bg-brand-700 px-4 py-2 text-sm font-bold text-white hover:bg-brand-600 focus:outline-none focus:ring-3 focus:ring-brand-100">Retry</button>
        </div>
      )}

      {!loading && !hasError && filteredReports.length === 0 && (
        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <p className="font-semibold text-slate-800">No hazard reports have been submitted yet.</p>
          {filtersAreActive && <button onClick={clearFilters} className="mt-3 text-sm font-bold text-brand-700 underline underline-offset-2 focus:outline-none focus:ring-2 focus:ring-brand-600">View all reports</button>}
        </div>
      )}

      {!loading && !hasError && filteredReports.length > 0 && (
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {filteredReports.map((report) => <IncidentCard key={report._id} report={report} />)}
        </div>
      )}
    </section>
  );
}

export { IncidentQueue };
