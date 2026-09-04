export default function FormField({ label, id, error, children }) {
  return <div className="space-y-1.5"><label className="block text-sm font-semibold text-slate-700" htmlFor={id}>{label}</label>{children}{error && <p id={`${id}-error`} className="text-sm text-red-700" role="alert">{error}</p>}</div>;
}
