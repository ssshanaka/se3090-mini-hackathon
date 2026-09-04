import { useState } from 'react';
import FormField from './FormField';

export default function PasswordField({ id, label, value, onChange, error, autoComplete }) {
  const [shown, setShown] = useState(false);
  return <FormField id={id} label={label} error={error}><div className="relative"><input id={id} name={id} value={value} onChange={onChange} type={shown ? 'text' : 'password'} autoComplete={autoComplete} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 pr-20 text-slate-900 outline-none transition focus:border-brand-600 focus:ring-3 focus:ring-brand-100" /><button type="button" onClick={() => setShown((current) => !current)} className="absolute inset-y-0 right-2 px-2 text-sm font-semibold text-brand-700 underline underline-offset-2 focus:outline-none focus:ring-2 focus:ring-brand-600" aria-label={`${shown ? 'Hide' : 'Show'} ${label.toLowerCase()}`}>{shown ? 'Hide' : 'Show'}</button></div></FormField>;
}
