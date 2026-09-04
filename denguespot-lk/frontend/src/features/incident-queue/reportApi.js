import { apiUrl } from '../../services/apiConfig';

export async function getReports() {
  const response = await fetch(apiUrl('/api/reports'));

  if (!response.ok) {
    throw new Error(`Unable to fetch reports (${response.status})`);
  }

  return response.json();
}
