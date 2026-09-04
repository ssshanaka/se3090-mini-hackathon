import express from 'express';

const app = express();
app.use(express.json());
app.get('/api/health', (_request, response) => response.json({ status: 'ok', database: 'connected' }));

export default app;
