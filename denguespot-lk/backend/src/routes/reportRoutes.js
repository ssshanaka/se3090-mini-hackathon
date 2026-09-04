import express from 'express';
import { createReport, getReports, getReportsByZone, updateReportStatus } from '../controllers/reportController.js';

const router = express.Router();

router.post('/', createReport);
router.get('/', getReports);
router.get('/zone/:mohName', getReportsByZone);
router.patch('/:id/status', updateReportStatus);

export default router;
