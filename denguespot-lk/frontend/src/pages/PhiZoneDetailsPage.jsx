import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiUrl } from '../services/apiConfig';

export default function PhiZoneDetailsPage() {
  const { id } = useParams(); // Using the MOH Name string from the URL
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(apiUrl(`/api/reports/zone/${encodeURIComponent(id)}`))
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setReports(data.data);
        }
      })
      .catch(err => console.error('Error fetching reports:', err))
      .finally(() => setLoading(false));
  }, [id]);

  const updateReportStatus = async (reportId, newStatus) => {
    try {
      const response = await fetch(apiUrl(`/api/reports/${reportId}/status`), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();
      if (data.success) {
        setReports(current =>
          current.map(r => (r._id === reportId ? { ...r, status: newStatus } : r))
        );
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const getStatusBadge = (status) => {
    if (status === 'Cleared') return <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800 border border-green-200">Cleared</span>;
    if (status === 'Inspected') return <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800 border border-amber-200">Inspected</span>;
    return <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-800 border border-slate-200">Pending</span>;
  };

  return (
    <div className="flex-grow flex flex-col min-h-screen bg-slate-50">
      <header className="border-b border-brand-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => navigate('/phi-dashboard')}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors"
            aria-label="Go back"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-900">{decodeURIComponent(id)}</h1>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Hazard Directory</p>
          </div>
        </div>
      </header>

      <main className="flex-grow px-4 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div>
          </div>
        ) : reports.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-sm">
            <p className="text-lg font-medium text-slate-900">No hazards reported</p>
            <p className="text-slate-500">There are no reports filed for this division yet.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reports.map((report) => (
              <div key={report._id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-slate-900">{report.hazardType}</h3>
                    <p className="text-xs text-slate-500">{new Date(report.createdAt).toLocaleDateString()}</p>
                  </div>
                  {getStatusBadge(report.status)}
                </div>

                <div className="mb-4">
                  <p className="text-xs font-bold text-slate-500 uppercase mb-1">Reporter</p>
                  <p className="text-sm text-slate-900">{report.reporterName}</p>
                  <p className="text-xs text-slate-500">{report.contactNumber}</p>
                </div>

                <div className="mb-6 flex-grow">
                  <p className="text-xs font-bold text-slate-500 uppercase mb-1">Location Notes</p>
                  <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    {report.addressNotes}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 mt-auto flex gap-2">
                  {report.status !== 'Cleared' && (
                    <button
                      onClick={() => updateReportStatus(report._id, 'Cleared')}
                      className="flex-1 bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 font-semibold py-2 px-4 rounded-lg text-sm transition-colors text-center"
                    >
                      Mark as Cleared
                    </button>
                  )}
                  {report.status === 'Pending' && (
                    <button
                      onClick={() => updateReportStatus(report._id, 'Inspected')}
                      className="flex-1 bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 font-semibold py-2 px-4 rounded-lg text-sm transition-colors text-center"
                    >
                      Mark Inspected
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
