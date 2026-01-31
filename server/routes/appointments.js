import express from 'express';
import { query } from '../index.js'; // FIXED: Use index.js for database
import { authenticate, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

// 1. Get appointments for a specific patient
router.get('/patient/:patientId', authenticate, async (req, res) => {
  const { patientId } = req.params;
  try {
    const result = await query(
      `SELECT a.*, p.name as patient_name, d.name as doctor_name 
       FROM appointments a 
       LEFT JOIN users p ON a.patient_id = p.id 
       LEFT JOIN users d ON a.doctor_id = d.id 
       WHERE a.patient_id = $1 ORDER BY a.scheduled_at DESC`, 
      [patientId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch appointments' });
  }
});

// 2. Get appointments for a specific doctor
router.get('/doctor/:doctorId', authenticate, async (req, res) => {
  const { doctorId } = req.params;
  try {
    const result = await query(
      `SELECT a.*, p.name as patient_name, d.name as doctor_name 
       FROM appointments a 
       LEFT JOIN users p ON a.patient_id = p.id 
       LEFT JOIN users d ON a.doctor_id = d.id 
       WHERE a.doctor_id = $1 ORDER BY a.scheduled_at DESC`, 
      [doctorId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch appointments' });
  }
});

// 3. List all appointments (General)
router.get('/', authenticate, async (req, res) => {
  try {
    const result = await query(
      `SELECT a.*, p.name as patient_name, d.name as doctor_name 
       FROM appointments a 
       LEFT JOIN users p ON a.patient_id = p.id 
       LEFT JOIN users d ON a.doctor_id = d.id 
       ORDER BY a.scheduled_at DESC`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch appointments' });
  }
});

export default router;