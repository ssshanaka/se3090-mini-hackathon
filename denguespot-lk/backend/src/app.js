import express from 'express';

import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.get('/api/health', (_request, response) => response.json({ status: 'ok', database: 'connected' }));

app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);

export default app;
