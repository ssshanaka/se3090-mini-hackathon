export async function getReports() {
  const response = await fetch('/api/reports');

  if (!response.ok) {
    throw new Error(`Unable to fetch reports (${response.status})`);
  }

  return response.json();
}
