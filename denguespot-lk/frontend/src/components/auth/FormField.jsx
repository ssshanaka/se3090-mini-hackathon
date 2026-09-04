export default function FormField({ label, id, error, children }) {
  return <div className="space-y-1"><label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5" htmlFor={id}>{label}</label>{children}{error && <p id={`${id}-error`} className="min-h-[18px] text-[11px] font-medium text-red-600 pt-1" role="alert">{error}</p>}</div>;
}
