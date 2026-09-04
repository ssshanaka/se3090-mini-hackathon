import { useState, useCallback } from 'react';
import { submitReport } from '../services/reportService';

// ── Constants ────────────────────────────────────────────────────────────────
const DISTRICTS = ['Colombo', 'Gampaha', 'Kalutara'];

const DISTRICT_MOH_MAP = {
  Colombo: [
    'Colombo MC', 'Kaduwela', 'Maharagama', 'Homagama', 'Piliyandala',
    'Boralesgamuwa', 'Dehiwala', 'Gothatuwa',
  ],
  Gampaha: [
    'Negombo', 'Kelaniya', 'Wattala', 'Biyagama', 'Ragama',
    'Minuwangoda', 'Katana',
  ],
  Kalutara: ['Panadura', 'Horana', 'Kalutara', 'Matugama'],
};

const HAZARD_TYPES = [
  'Stagnant Water',
  'Uncovered Container',
  'Blocked Drain',
  'Discarded Tyres/Containers',
  'Other',
];

const SL_PHONE_REGEX = /^(?:0|\+94)[0-9]{9}$/;

const INITIAL_FORM = {
  reporterName: '',
  contactNumber: '',
  district: '',
  mohDivision: '',
  hazardType: '',
  addressNotes: '',
};

// ── Client-side validation (mirrors server rules) ────────────────────────────
function validate(values) {
  const errs = {};

  if (!values.reporterName.trim()) {
    errs.reporterName = 'Reporter name is required.';
  } else if (values.reporterName.trim().length < 3) {
    errs.reporterName = 'Name must be at least 3 characters long.';
  }

  if (!values.contactNumber.trim()) {
    errs.contactNumber = 'Phone number is required.';
  } else if (!SL_PHONE_REGEX.test(values.contactNumber.trim())) {
    errs.contactNumber = 'Enter a valid Sri Lankan number (e.g. 0771234567 or +94771234567).';
  }

  if (!values.district) {
    errs.district = 'Please select a district.';
  }

  if (!values.mohDivision) {
    errs.mohDivision = 'Please select an MOH division.';
  }

  if (!values.hazardType) {
    errs.hazardType = 'Please select a hazard type.';
  }

  if (!values.addressNotes.trim()) {
    errs.addressNotes = 'Location details are required.';
  } else if (values.addressNotes.trim().length < 15) {
    errs.addressNotes = `Please provide at least 15 characters (${values.addressNotes.trim().length}/15).`;
  }

  return errs;
}

// ── Reusable field wrapper ───────────────────────────────────────────────────
function Field({ label, htmlFor, error, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1 block text-sm font-semibold text-slate-700">
        {label} <span className="text-red-500">*</span>
      </label>
      {children}
      {error && (
        <p className="mt-1 flex items-start gap-1 text-sm text-red-600" role="alert">
          <svg xmlns="http://www.w3.org/2000/svg" className="mt-0.5 h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

// ── Shared Tailwind class strings ────────────────────────────────────────────
const inputBase =
  'w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm transition-colors placeholder:text-slate-400 focus:outline-none focus:ring-2';
const inputNormal = `${inputBase} border-slate-300 focus:border-brand-600 focus:ring-brand-100`;
const inputError = `${inputBase} border-red-400 focus:border-red-500 focus:ring-red-100`;

// ── Component ────────────────────────────────────────────────────────────────
export default function HazardReportForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null); // { type: 'success' | 'error', message }

  // ── Handlers ──
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      // Reset mohDivision when district changes
      if (name === 'district') next.mohDivision = '';
      return next;
    });
    // Clear field error on change
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
    setSubmitResult(null);
  }, []);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    // Validate single field on blur
    const fieldErrors = validate({ ...form, [name]: form[name] });
    setErrors((prev) => {
      const next = { ...prev };
      if (fieldErrors[name]) {
        next[name] = fieldErrors[name];
      } else {
        delete next[name];
      }
      return next;
    });
  }, [form]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setSubmitResult(null);

    // Full validation
    const validationErrors = validate(form);
    setErrors(validationErrors);
    setTouched({ reporterName: true, contactNumber: true, district: true, mohDivision: true, hazardType: true, addressNotes: true });

    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    try {
      const result = await submitReport(form);

      if (result.success) {
        setSubmitResult({ type: 'success', message: 'Hazard report submitted successfully! Thank you for keeping your community safe.' });
        setForm(INITIAL_FORM);
        setTouched({});
        setErrors({});
      } else if (result.errors) {
        // Server returned field-level validation errors
        setErrors(result.errors);
        setSubmitResult({ type: 'error', message: 'Please fix the highlighted errors and try again.' });
      } else {
        setSubmitResult({ type: 'error', message: result.message || 'Something went wrong. Please try again.' });
      }
    } catch {
      setSubmitResult({ type: 'error', message: 'Network error — unable to reach the server. Please check your connection.' });
    } finally {
      setSubmitting(false);
    }
  }, [form]);

  const mohOptions = form.district ? DISTRICT_MOH_MAP[form.district] || [] : [];

  const cls = (name) => (touched[name] && errors[name] ? inputError : inputNormal);

  return (
    <section className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-bold tracking-widest text-brand-700 uppercase">
          Community Reporting
        </p>
        <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          Report a Dengue Hazard
        </h2>
        <p className="mt-2 max-w-lg text-sm leading-6 text-slate-600">
          Spotted a potential mosquito breeding site? Fill in the details below so your local MOH team can act quickly.
        </p>
      </div>

      {/* Result banner */}
      {submitResult && (
        <div
          role="alert"
          className={`mb-6 flex items-start gap-3 rounded-lg border px-4 py-3 text-sm ${
            submitResult.type === 'success'
              ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
              : 'border-red-200 bg-red-50 text-red-800'
          }`}
        >
          {submitResult.type === 'success' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="mt-0.5 h-5 w-5 shrink-0 text-red-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          )}
          <span>{submitResult.message}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        {/* Reporter Name */}
        <Field label="Full Name" htmlFor="reporterName" error={touched.reporterName && errors.reporterName}>
          <input
            id="reporterName"
            name="reporterName"
            type="text"
            placeholder="e.g. Nimal Perera"
            value={form.reporterName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={cls('reporterName')}
          />
        </Field>

        {/* Contact Number */}
        <Field label="Mobile Number" htmlFor="contactNumber" error={touched.contactNumber && errors.contactNumber}>
          <input
            id="contactNumber"
            name="contactNumber"
            type="tel"
            placeholder="e.g. 0771234567 or +94771234567"
            value={form.contactNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            className={cls('contactNumber')}
          />
        </Field>

        {/* District + MOH Division (side-by-side on desktop) */}
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="District" htmlFor="district" error={touched.district && errors.district}>
            <select
              id="district"
              name="district"
              value={form.district}
              onChange={handleChange}
              onBlur={handleBlur}
              className={cls('district')}
            >
              <option value="">— Select district —</option>
              {DISTRICTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </Field>

          <Field label="MOH Division" htmlFor="mohDivision" error={touched.mohDivision && errors.mohDivision}>
            <select
              id="mohDivision"
              name="mohDivision"
              value={form.mohDivision}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={!form.district}
              className={`${cls('mohDivision')} ${!form.district ? 'cursor-not-allowed opacity-60' : ''}`}
            >
              <option value="">{form.district ? '— Select MOH division —' : '— Choose district first —'}</option>
              {mohOptions.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </Field>
        </div>

        {/* Hazard Type */}
        <Field label="Hazard Type" htmlFor="hazardType" error={touched.hazardType && errors.hazardType}>
          <select
            id="hazardType"
            name="hazardType"
            value={form.hazardType}
            onChange={handleChange}
            onBlur={handleBlur}
            className={cls('hazardType')}
          >
            <option value="">— Select hazard type —</option>
            {HAZARD_TYPES.map((h) => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>
        </Field>

        {/* Address / Notes */}
        <Field label="Location / Address Notes" htmlFor="addressNotes" error={touched.addressNotes && errors.addressNotes}>
          <textarea
            id="addressNotes"
            name="addressNotes"
            rows={4}
            placeholder="Describe the exact location — e.g. 'Near the abandoned lot behind 42 Galle Road, opposite the bakery…'"
            value={form.addressNotes}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${cls('addressNotes')} resize-y`}
          />
          <p className="mt-1 text-xs text-slate-400">
            {form.addressNotes.trim().length}/15 characters minimum
          </p>
        </Field>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-brand-600 focus:outline-none focus:ring-3 focus:ring-brand-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? (
            <>
              <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              Submitting…
            </>
          ) : (
            'Submit Hazard Report'
          )}
        </button>
      </form>
    </section>
  );
}
