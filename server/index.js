import 'dotenv/config'; 
import appointmentRoutes from './routes/appointments.js';
import billingRoutes from './routes/billing.js';
import express from 'express';
import cors from 'cors';
import filesRoutes from './routes/files.js';
import labReportsRoutes from './routes/labReports.js';
import medicinesRoutes from './routes/medicines.js';
import patientRoutes from './routes/patients.js';
import pg from 'pg';
import prescriptionRoutes from './routes/prescriptions.js';
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

app.use(express.json()); // MUST be above routes

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const clientIp = req.ip || req.connection.remoteAddress;
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    const logLevel = status >= 400 ? 'error' : 'log';
    
    console[logLevel](`[REQUEST] ${req.method} ${req.path} - ${status} - ${duration}ms - ${clientIp}`);
    
    // Log 401/403 patterns for debugging auth issues
    if (status === 401 || status === 403) {
      console.error(`[AUTH_DEBUG] Auth failure: ${req.method} ${req.path} returned ${status} for ${clientIp}`);
      console.error(`[AUTH_DEBUG] Headers: ${JSON.stringify(req.headers.authorization ? { ...req.headers, authorization: 'Bearer [REDACTED]' } : req.headers)}`);
    }
  });
  
  next();
});


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
app.use('/api/patients', patientRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/lab-reports', labReportsRoutes);
app.use('/api/medicines', medicinesRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/files', filesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
