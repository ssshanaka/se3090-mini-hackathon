import express from 'express';

import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import mohZoneRoutes from './routes/mohZoneRoutes.js';
import reportRoutes from './routes/reportRoutes.js';

const app = express();
app.use(cors());

app.use(express.json());
app.get('/api/health', (_request, response) => response.json({ status: 'ok', database: 'connected' }));

app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/moh-zones', mohZoneRoutes);
app.use('/api/reports', reportRoutes);

export default app;

