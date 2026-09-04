import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormField from '../components/auth/FormField';
import PasswordField from '../components/auth/PasswordField';
import { useAuth } from '../context/AuthContext';
import { validateLogin } from '../utils/validators';

export default function LoginPage() {
  const [values, setValues] = useState({ email: '', password: '' }); const [errors, setErrors] = useState({}); const [formError, setFormError] = useState(''); const [processing, setProcessing] = useState(false); const { login } = useAuth(); const navigate = useNavigate();
  const update = (event) => setValues((current) => ({ ...current, [event.target.name]: event.target.value }));
  const submit = async (event) => { event.preventDefault(); const nextErrors = validateLogin(values); setErrors(nextErrors); setFormError(''); if (Object.keys(nextErrors).length) return; setProcessing(true); const result = await login(values.email, values.password); if (!result.success) { setFormError('The email address or password is incorrect.'); setProcessing(false); return; } if (result.user?.role === 'phi') { navigate('/phi-dashboard'); } else { navigate('/dashboard'); } };
  const inputClass = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-brand-600 focus:ring-3 focus:ring-brand-100';
  return <AuthShell title="Welcome back" subtitle="Sign in to continue supporting safer, healthier communities."><form noValidate onSubmit={submit} className="space-y-4">{formError && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-700">{formError}</p>}<FormField id="email" label="Email Address" error={errors.email}><input id="email" name="email" type="email" autoComplete="email" value={values.email} onChange={update} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} className={inputClass} /></FormField><PasswordField id="password" label="Password" value={values.password} onChange={update} error={errors.password} autoComplete="current-password" /><button disabled={processing} className="w-full rounded-lg bg-brand-700 px-4 py-3 font-bold text-white hover:bg-brand-600 focus:outline-none focus:ring-3 focus:ring-brand-100 disabled:cursor-not-allowed disabled:opacity-60">{processing ? 'Signing in…' : 'Log in'}</button></form><p className="mt-5 text-center text-sm text-slate-600">Don’t have an account? <Link className="font-bold text-brand-700 underline underline-offset-2 focus:outline-none focus:ring-2 focus:ring-brand-600" to="/register">Create one</Link></p></AuthShell>;
}
import Logo from '../components/Logo';

export function AuthShell({ title, subtitle, children }) {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[calc(100vh-73px)] py-8 px-4">
      <div className="w-full max-w-[420px] bg-white rounded-xl shadow-sm p-6 sm:p-8 flex flex-col border border-slate-100">
        <div className="flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center shadow-sm mb-2">
            <Logo className="w-10 h-10 object-contain" />
          </div>
          <div className="text-lg font-semibold text-slate-900 tracking-tight">SuwaMaga</div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Western Province Public Health Sentinel</p>
        </div>
        <div className="text-center mt-4 mb-6">
          <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">{title}</h1>
          <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
        </div>
        <div className="flex flex-col gap-4">
          {children}
        </div>
        <div className="mt-6 bg-slate-100 rounded-lg p-3 flex items-center justify-center gap-2 text-center">
          <span className="material-symbols-outlined text-teal-600 text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
          <span className="text-xs font-semibold text-slate-500">Official Sri Lanka Ministry of Health Epidemiological Sentinel Portal</span>
        </div>
      </div>
    </div>
  );
}
