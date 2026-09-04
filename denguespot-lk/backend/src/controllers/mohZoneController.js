import { MOH_ZONE_SEED } from '../constants/mohZonesSeed.js';

export const getMohZones = async (req, res) => {
  try {
    res.json({ success: true, data: MOH_ZONE_SEED });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error retrieving MOH zones' });
  }
};
