import mongoose from 'mongoose';
import { WESTERN_PROVINCE_MOH_ZONES, DISTRICTS } from '../constants/mohZones.js';

const mohZoneSchema = new mongoose.Schema({
  mohName: { type: String, required: true, enum: WESTERN_PROVINCE_MOH_ZONES, unique: true },
  district: { type: String, required: true, enum: DISTRICTS },
  activeCases: { type: Number, required: true },
  riskLevel: { type: String, enum: ['High', 'Moderate', 'Low'], required: true },
  recommendedAction: { type: String, required: true }
});

const MohZone = mongoose.model('MohZone', mohZoneSchema);
export default MohZone;
