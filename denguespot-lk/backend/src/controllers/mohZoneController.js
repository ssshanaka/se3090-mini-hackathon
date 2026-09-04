import { mohZonesSeed } from '../constants/mohZonesSeed.js';

export const getMohZones = (req, res) => {
  try {
    // In a real app we'd fetch from MongoDB, but here we return the seed data.
    res.status(200).json(mohZonesSeed);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch MOH zones' });
  }
};
