import cors from 'cors';
import express from 'express';

import apiRouter from './api/api-router.js';

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.json({ hello: 'World' });
});
app.use(express.json());

app.use('/api/v1', apiRouter);

app.disable('x-powered-by');

export default app;
