import express from 'express';
import { getMohZones } from '../controllers/mohZoneController.js';

const router = express.Router();

router.get('/', getMohZones);

export default router;
