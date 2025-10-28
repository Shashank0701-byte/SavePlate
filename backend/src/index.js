import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';

import authRouter from './routes/auth.js';
import mealsRouter from './routes/meals.js';
import ordersRouter from './routes/orders.js';

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || '*', credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (req, res) => res.json({ ok: true }));
app.use('/api/auth', authRouter);
app.use('/api/meals', mealsRouter);
app.use('/api/orders', ordersRouter);

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error('Missing MONGO_URI in .env');
  process.exit(1);
}

mongoose.connect(mongoUri).then(() => {
  const port = process.env.PORT || 4000;
  app.listen(port, () => console.log(`API listening on :${port}`));
}).catch(err => {
  console.error('Mongo connection failed', err);
  process.exit(1);
});


