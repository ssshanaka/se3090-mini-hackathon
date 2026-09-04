import { MOH_ZONE_SEED } from '../constants/mohZonesSeed.js';
import MohZone from '../models/MohZone.js';

export const getMohZones = async (req, res) => {
  try {
    let zones = await MohZone.find({});
    
    // Auto-seed if the collection is empty
    if (zones.length === 0) {
      console.log('Auto-seeding MOH Zones collection...');
      await MohZone.insertMany(MOH_ZONE_SEED);
      zones = await MohZone.find({});
    }

    res.json({ success: true, data: zones });
  } catch (error) {
    console.error('Error retrieving MOH zones:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving MOH zones' });
  }
};
