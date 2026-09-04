import mongoose from 'mongoose';
import { WESTERN_PROVINCE_MOH_ZONES, DISTRICTS } from '../constants/mohZones.js';

const hazardReportSchema = new mongoose.Schema({
  reporterName: { type: String, required: true, minlength: 3 },
  contactNumber: { type: String, required: true, match: /^(?:0|\+94)[0-9]{9}$/ },
  district: { type: String, required: true, enum: DISTRICTS },
  mohDivision: { type: String, required: true, enum: WESTERN_PROVINCE_MOH_ZONES },
  hazardType: {
    type: String,
    enum: ['Stagnant Water', 'Uncovered Container', 'Blocked Drain', 'Discarded Tyres/Containers', 'Other'],
    required: true
  },
  addressNotes: { type: String, required: true, minlength: 15 },
  imageUrl: { type: String },       // Cloudinary secure_url — optional
  imagePublicId: { type: String },  // Cloudinary public_id — optional, for future delete/replace
  status: { type: String, enum: ['Pending', 'Inspected', 'Cleared'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

const HazardReport = mongoose.model('HazardReport', hazardReportSchema);
export default HazardReport;
