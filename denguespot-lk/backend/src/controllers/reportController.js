import HazardReport from '../models/HazardReport.js';
import { DISTRICTS, WESTERN_PROVINCE_MOH_ZONES } from '../constants/mohZones.js';

// ── District → MOH division mapping (used for cross-validation) ──────────────
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

// ── Validation helper ────────────────────────────────────────────────────────
function validateReport(body) {
  const errors = {};

  // reporterName
  if (!body.reporterName || typeof body.reporterName !== 'string' || body.reporterName.trim().length === 0) {
    errors.reporterName = 'Reporter name is required.';
  } else if (body.reporterName.trim().length < 3) {
    errors.reporterName = 'Name must be at least 3 characters long.';
  }

  // contactNumber (SL phone)
  if (!body.contactNumber || typeof body.contactNumber !== 'string' || body.contactNumber.trim().length === 0) {
    errors.contactNumber = 'Phone number is required.';
  } else if (!SL_PHONE_REGEX.test(body.contactNumber.trim())) {
    errors.contactNumber = 'Enter a valid Sri Lankan number (e.g. 0771234567 or +94771234567).';
  }

  // district
  if (!body.district || !DISTRICTS.includes(body.district)) {
    errors.district = `District is required. Choose one of: ${DISTRICTS.join(', ')}.`;
  }

  // mohDivision
  if (!body.mohDivision || !WESTERN_PROVINCE_MOH_ZONES.includes(body.mohDivision)) {
    errors.mohDivision = 'MOH Division is required. Please select a valid division.';
  } else if (body.district && DISTRICT_MOH_MAP[body.district] && !DISTRICT_MOH_MAP[body.district].includes(body.mohDivision)) {
    errors.mohDivision = `"${body.mohDivision}" does not belong to the "${body.district}" district.`;
  }

  // hazardType
  if (!body.hazardType || !HAZARD_TYPES.includes(body.hazardType)) {
    errors.hazardType = `Hazard type is required. Choose one of: ${HAZARD_TYPES.join(', ')}.`;
  }

  // addressNotes
  if (!body.addressNotes || typeof body.addressNotes !== 'string' || body.addressNotes.trim().length === 0) {
    errors.addressNotes = 'Location / address notes are required.';
  } else if (body.addressNotes.trim().length < 15) {
    errors.addressNotes = 'Please provide at least 15 characters describing the location.';
  }

  return errors;
}

// ── POST /api/reports ────────────────────────────────────────────────────────
export async function createReport(req, res) {
  try {
    const errors = validateReport(req.body);

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    const report = await HazardReport.create({
      reporterName: req.body.reporterName.trim(),
      contactNumber: req.body.contactNumber.trim(),
      district: req.body.district,
      mohDivision: req.body.mohDivision,
      hazardType: req.body.hazardType,
      addressNotes: req.body.addressNotes.trim(),
      imageUrl: req.body.imageUrl || undefined,
      imagePublicId: req.body.imagePublicId || undefined,
    });

    return res.status(201).json({ success: true, data: report });
  } catch (error) {
    console.error('createReport error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
}

// ── GET /api/reports ─────────────────────────────────────────────────────────
export async function getReports(_req, res) {
  try {
    const reports = await HazardReport.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: reports });
  } catch (error) {
    console.error('getReports error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
}
