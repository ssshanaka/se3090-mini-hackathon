function formatRelativeDate(value) {
  const date = new Date(value);
  const timestamp = date.getTime();

  if (Number.isNaN(timestamp)) return 'Date unavailable';

  const seconds = Math.max(0, Math.floor((Date.now() - timestamp) / 1000));
  if (seconds < 60) return 'Just now';

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;

  const days = Math.floor(hours / 24);
  if (days === 1) return 'Yesterday';

  return new Intl.DateTimeFormat('en-LK', {
    day: 'numeric',
    month: 'short',
    year: date.getFullYear() === new Date().getFullYear() ? undefined : 'numeric',
  }).format(date);
}

function statusClass(status) {
  const normalized = status?.toLowerCase();
  if (normalized === 'pending') return 'bg-amber-100 text-amber-800 ring-amber-200';
  if (normalized === 'verified') return 'bg-brand-100 text-brand-700 ring-brand-100';
  if (normalized === 'resolved') return 'bg-slate-100 text-slate-700 ring-slate-200';
  return 'bg-slate-100 text-slate-700 ring-slate-200';
}

function IncidentCard({ report }) {
  const location = [report.mohDivision, report.district].filter(Boolean).join(', ');

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-brand-100 hover:shadow-md">
      {report.imageUrl && (
        <div className="aspect-[16/9] overflow-hidden bg-slate-100">
          <img
            src={report.imageUrl}
            alt={`Reported ${report.hazardType || 'mosquito breeding'} hazard`}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold tracking-wider text-brand-700 uppercase">Reported hazard</p>
            <h2 className="mt-1 text-lg font-extrabold leading-6 text-slate-900">{report.hazardType || 'Mosquito breeding hazard'}</h2>
          </div>
          <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${statusClass(report.status)}`}>
            {report.status || 'Pending'}
          </span>
        </div>
        {location && <p className="mt-4 rounded-lg bg-brand-50 px-3 py-2 text-sm font-semibold text-brand-700">{location}</p>}
        <p className="mt-4 text-sm leading-6 text-slate-600">{report.addressNotes || 'No additional location notes were provided.'}</p>
        <div className="mt-5 border-t border-slate-100 pt-4">
          <time className="block text-xs font-semibold text-slate-500" dateTime={report.createdAt}>{formatRelativeDate(report.createdAt)}</time>
        </div>
      </div>
    </article>
  );
}

export { IncidentCard };
