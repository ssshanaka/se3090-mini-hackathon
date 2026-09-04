import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormField from '../components/auth/FormField';
import PasswordField from '../components/auth/PasswordField';
import { useAuth } from '../context/AuthContext';
import { validateRegister } from '../utils/validators';
import { AuthShell } from './LoginPage';
const divisions = ['Colombo MC', 'Kaduwela', 'Maharagama', 'Kelaniya', 'Negombo', 'Dehiwala'];
export default function RegisterPage() {
  const [values, setValues] = useState({ fullName: '', email: '', role: 'resident', mohDivision: '', password: '', confirmPassword: '' }); const [errors, setErrors] = useState({}); const [success, setSuccess] = useState(''); const [processing, setProcessing] = useState(false); const { register, users } = useAuth(); const navigate = useNavigate();
  const update = (event) => setValues((current) => ({ ...current, [event.target.name]: event.target.value }));
  const submit = async (event) => { event.preventDefault(); const nextErrors = validateRegister(values, []); setErrors(nextErrors); if (Object.keys(nextErrors).length) return; setProcessing(true); try { await register(values); setSuccess('Account created successfully. Redirecting to your dashboard…'); window.setTimeout(() => navigate('/dashboard'), 450); } catch (err) { setErrors({ email: 'Registration failed. Email might already exist.' }); setProcessing(false); } };
  const inputClass = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-brand-600 focus:ring-3 focus:ring-brand-100';
  return <AuthShell title="Create Your Account" subtitle="Join SuwaMaga to help track and report dengue risks in your community">
    <form noValidate onSubmit={submit} className="space-y-4">
      {success && <p role="status" className="rounded-lg bg-brand-50 p-3 text-sm font-medium text-brand-700">{success}</p>}
      <FormField id="fullName" label="Full Name" error={errors.fullName}>
        <input id="fullName" name="fullName" value={values.fullName} onChange={update} autoComplete="name" aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? 'fullName-error' : undefined} className={inputClass} placeholder="e.g. Nimal Perera" />
      </FormField>
      <FormField id="email" label="Email" error={errors.email}>
        <input id="email" name="email" type="email" value={values.email} onChange={update} autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} className={inputClass} placeholder="you@example.com" />
      </FormField>
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">I am signing up as</label>
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-50 border border-slate-200 rounded-lg">
          <button type="button" onClick={() => update({ target: { name: 'role', value: 'resident' } })} className={values.role === 'resident' || !values.role ? "flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-md text-xs font-semibold transition-all duration-200 bg-brand-700 text-white shadow-sm" : "flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-md text-xs font-medium text-slate-600 hover:text-slate-900 transition-all duration-200 bg-transparent border border-transparent hover:bg-white/60"}>
            {(values.role === 'resident' || !values.role) && <svg className="w-3.5 h-3.5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>}
            <span>Resident</span>
          </button>
          <button type="button" onClick={() => update({ target: { name: 'role', value: 'phi' } })} className={values.role === 'phi' ? "flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-md text-xs font-semibold transition-all duration-200 bg-brand-700 text-white shadow-sm" : "flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-md text-xs font-medium text-slate-600 hover:text-slate-900 transition-all duration-200 bg-transparent border border-transparent hover:bg-white/60"}>
            {values.role === 'phi' && <svg className="w-3.5 h-3.5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>}
            <span className="text-center leading-tight">Public Health Inspector (PHI)</span>
          </button>
        </div>
        <p className="text-[11px] text-slate-500 mt-1.5 leading-snug">Residents can report hazards. PHIs are assigned to a specific MOH division.</p>
        {errors.role && <p role="alert" className="min-h-[18px] text-[11px] font-medium text-red-600 pt-1">{errors.role}</p>}
      </div>
      
      {values.role === 'phi' && (
        <FormField id="mohDivision" label="MOH Division" error={errors.mohDivision}>
          <div className="relative">
            <select id="mohDivision" name="mohDivision" value={values.mohDivision} onChange={update} aria-invalid={Boolean(errors.mohDivision)} aria-describedby={errors.mohDivision ? 'mohDivision-error' : undefined} className={inputClass + ' appearance-none'}>
              <option value="" disabled>Select your assigned MOH division</option>
              {divisions.map((division) => <option key={division} value={division}>{division}</option>)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        </FormField>
      )}

      <PasswordField id="password" label="Password" value={values.password} onChange={update} error={errors.password} autoComplete="new-password" />
      <PasswordField id="confirmPassword" label="Confirm Password" value={values.confirmPassword} onChange={update} error={errors.confirmPassword} autoComplete="new-password" />
      
      <div className="pt-1">
        <button disabled={processing} className="w-full py-2.5 px-4 bg-brand-700 hover:bg-brand-800 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-brand-700 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed">
          <span>{processing ? 'Creating account…' : 'Sign Up'}</span>
          {!processing && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>}
        </button>
      </div>
    </form>
    <div className="text-center pt-4">
      <p className="text-xs text-slate-500">
        Already have an account? <Link className="text-brand-700 font-semibold underline underline-offset-2 hover:text-brand-800 transition-colors" to="/login">Log In</Link>
      </p>
    </div>
  </AuthShell>;
}
