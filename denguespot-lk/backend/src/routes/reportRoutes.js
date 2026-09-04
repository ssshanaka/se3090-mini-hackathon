import { Router } from 'express';

const router = Router();

// Temporary public-safe mock data for the Public Incident Queue UI.
// Replace this array with HazardReport database queries when report persistence is implemented.
const mockReports = [
  {
    _id: 'mock-report-004',
    district: 'Colombo',
    mohDivision: 'Maharagama',
    hazardType: 'Blocked Drain',
    addressNotes: 'Drain near the market is blocked and contains stagnant water.',
    imageUrl: '',
    status: 'Pending',
    createdAt: '2026-09-04T10:30:00.000Z',
  },
  {
    _id: 'mock-report-003',
    district: 'Gampaha',
    mohDivision: 'Kelaniya',
    hazardType: 'Discarded Containers',
    addressNotes: 'Several uncovered containers behind the bus stand are collecting rainwater.',
    imageUrl: '',
    status: 'Pending',
    createdAt: '2026-09-04T09:10:00.000Z',
  },
  {
    _id: 'mock-report-002',
    district: 'Kalutara',
    mohDivision: 'Panadura',
    hazardType: 'Stagnant Water',
    addressNotes: 'Standing water has remained beside the playground after recent rain.',
    imageUrl: '',
    status: 'Verified',
    createdAt: '2026-09-03T14:45:00.000Z',
  },
  {
    _id: 'mock-report-001',
    district: 'Colombo',
    mohDivision: 'Kaduwela',
    hazardType: 'Open Water Tank',
    addressNotes: 'An open water tank at a construction site needs to be covered.',
    imageUrl: '',
    status: 'Pending',
    createdAt: '2026-09-02T08:20:00.000Z',
  },
];

router.get('/', (_request, response) => {
  const reports = [...mockReports].sort(
    (first, second) => new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime(),
  );

  response.json(reports);
});

export default router;
