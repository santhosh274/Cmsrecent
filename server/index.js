import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize PostgreSQL connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT || 5432,
});

// Test database connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

/**
 * Map database roles to frontend roles
 * @param dbRole - Role from database
 * @returns Frontend role
 */
function mapRoleToFrontend(dbRole) {
  const roleMap = {
    'superadmin': 'superadmin',
    'admin_doctor': 'doctor',
    'admin_lab': 'lab',
    'admin_pharmacist': 'pharmacy',
    'admin_accountant': 'accountant',
    'patient': 'patient',
  };
  
  return roleMap[dbRole] || dbRole;
}

/**
 * Login endpoint
 * Authenticates user and returns role-based access information
 */
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password' });
  }

  // Validate email format
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  try {
    // Query user from database
    const result = await pool.query(
      `SELECT id, name, role, email FROM users WHERE email = $1 AND password_hash = $2 LIMIT 1`,
      [email, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = result.rows[0];

    // Map database role to frontend role
    const frontendRole = mapRoleToFrontend(user.role);

    // Return user data
    res.json({
      role: frontendRole,
      name: user.name,
      email: user.email,
      id: user.id,
    });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database connection error. Please try again later.' });
  }
});

/**
 * Health check endpoint
 */
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch (err) {
    res.status(500).json({ status: 'error', database: 'disconnected', error: err.message });
  }
});

/**
 * Future API Endpoints Structure:
 * 
 * User Management:
 * - GET /api/users - Get all users (admin only)
 * - GET /api/users/:id - Get user by ID
 * - POST /api/users - Create new user
 * - PUT /api/users/:id - Update user
 * 
 * Patient Management:
 * - GET /api/patients - Get all patients
 * - GET /api/patients/:id - Get patient by ID
 * - POST /api/patients - Create new patient
 * 
 * Appointment Management:
 * - GET /api/appointments - Get all appointments
 * - POST /api/appointments - Create appointment
 * - PUT /api/appointments/:id - Update appointment
 * 
 * Prescription Management:
 * - GET /api/prescriptions - Get all prescriptions
 * - POST /api/prescriptions - Create prescription
 * 
 * Billing & Payments:
 * - GET /api/bills - Get all bills
 * - POST /api/payments - Process payment
 * 
 * See API_ENDPOINTS.md for complete documentation
 */

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
