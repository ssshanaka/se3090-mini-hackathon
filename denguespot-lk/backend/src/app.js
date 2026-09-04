import express from 'express';

import uploadRoutes from './routes/uploadRoutes.js';
import reportRoutes from './routes/reportRoutes.js';

const app = express();
app.use(express.json());
app.get('/api/health', (_request, response) => response.json({ status: 'ok', database: 'connected' }));

app.use('/api/upload', uploadRoutes);
app.use('/api/reports', reportRoutes);

export default app;
