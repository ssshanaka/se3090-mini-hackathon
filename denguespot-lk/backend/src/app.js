import express from 'express';

import uploadRoutes from './routes/uploadRoutes.js';
import mohZoneRoutes from './routes/mohZoneRoutes.js';

const app = express();
app.use(express.json());
app.get('/api/health', (_request, response) => response.json({ status: 'ok', database: 'connected' }));

app.use('/api/upload', uploadRoutes);
app.use('/api/moh-zones', mohZoneRoutes);

export default app;
