import { apiUrl } from './apiConfig';

/**
 * Submit a new hazard report.
 * @returns {{ success: boolean, data?: object, errors?: object }}
 */
export async function submitReport(payload) {
  const res = await fetch(apiUrl('/api/reports'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.json();
}

/**
 * Fetch all hazard reports (newest first).
 * @returns {{ success: boolean, data?: object[] }}
 */
export async function fetchReports() {
  const res = await fetch(apiUrl('/api/reports'));
  return res.json();
}
