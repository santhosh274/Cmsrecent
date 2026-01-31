import 'dotenv/config'; 
import appointmentRoutes from './routes/appointments.js';
import express from 'express';
import cors from 'cors';
import pg from 'pg';
const { Pool } = pg;

import authRoutes from './routes/auth.js';
import usersRoutes from './routes/users.js';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.options(/(.*)/, cors());

app.use(express.json());

app.use(express.json()); // MUST be above routes

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT || 5432,
});

export const query = (text, params) => pool.query(text, params);

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/appointments', appointmentRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));