import express from 'express';
import { query } from '../db.js';
import { authenticate, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

// Get prescriptions for a patient - specific route first
router.get('/patient/:patientId', authenticate, async (req, res) => {
  const { patientId } = req.params;
  try {
    const result = await query('SELECT p.*, pat.name as patient_name, u.name as doctor_name FROM prescriptions p LEFT JOIN patients pat ON p.patient_id = pat.id LEFT JOIN users u ON p.doctor_id = u.id WHERE p.patient_id = $1 ORDER BY p.created_at DESC', [patientId]);
    res.json(result.rows);
  } catch (err) {
    console.error('Get patient prescriptions error', err);
    res.status(500).json({ error: 'Could not fetch prescriptions' });
  }
});

// Get prescriptions by doctor - specific route first
router.get('/doctor/:doctorId', authenticate, async (req, res) => {
  const { doctorId } = req.params;
  try {
    const result = await query('SELECT p.*, pat.name as patient_name, u.name as doctor_name FROM prescriptions p LEFT JOIN patients pat ON p.patient_id = pat.id LEFT JOIN users u ON p.doctor_id = u.id WHERE p.doctor_id = $1 ORDER BY p.created_at DESC', [doctorId]);
    res.json(result.rows);
  } catch (err) {
    console.error('Get doctor prescriptions error', err);
    res.status(500).json({ error: 'Could not fetch prescriptions' });
  }
});

// List all prescriptions
router.get('/', authenticate, authorizeRoles('doctor','pharmacy','patient','superadmin'), async (req, res) => {
  try {
    const result = await query('SELECT p.*, pat.name as patient_name, u.name as doctor_name FROM prescriptions p LEFT JOIN patients pat ON p.patient_id = pat.id LEFT JOIN users u ON p.doctor_id = u.id ORDER BY p.created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('List prescriptions error', err);
    res.status(500).json({ error: 'Could not fetch prescriptions' });
  }
});

// Get prescription by ID - generic route last
router.get('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query('SELECT p.*, pat.name as patient_name, u.name as doctor_name FROM prescriptions p LEFT JOIN patients pat ON p.patient_id = pat.id LEFT JOIN users u ON p.doctor_id = u.id WHERE p.id = $1 LIMIT 1', [id]);
    if (!result.rows.length) return res.status(404).json({ error: 'Prescription not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Get prescription error', err);
    res.status(500).json({ error: 'Could not fetch prescription' });
  }
});

// Create prescription
router.post('/', authenticate, authorizeRoles('doctor','superadmin'), async (req, res) => {
  const { patient_id, doctor_id, medicines = [], notes = '' } = req.body;
  if (!patient_id || !doctor_id || !medicines.length) return res.status(400).json({ error: 'Missing fields' });
  try {
    const result = await query('INSERT INTO prescriptions (patient_id, doctor_id, medicines, notes, created_at) VALUES ($1,$2,$3,$4,NOW()) RETURNING *', [patient_id, doctor_id, JSON.stringify(medicines), notes]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Create prescription error', err);
    res.status(500).json({ error: 'Could not create prescription' });
  }
});

// Update prescription
router.put('/:id', authenticate, authorizeRoles('doctor','superadmin'), async (req, res) => {
  const { id } = req.params;
  const { medicines, notes } = req.body;
  const fields = [];
  const values = [];
  let idx = 1;
  
  if (medicines) { fields.push(`medicines = $${idx++}`); values.push(JSON.stringify(medicines)); }
  if (notes) { fields.push(`notes = $${idx++}`); values.push(notes); }
  
  if (!fields.length) return res.status(400).json({ error: 'No fields to update' });
  
  try {
    const sql = `UPDATE prescriptions SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`;
    const result = await query(sql, [...values, id]);
    if (!result.rows.length) return res.status(404).json({ error: 'Prescription not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Update prescription error', err);
    res.status(500).json({ error: 'Could not update prescription' });
  }
});

// Delete prescription
router.delete('/:id', authenticate, authorizeRoles('doctor','superadmin'), async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query('DELETE FROM prescriptions WHERE id = $1 RETURNING id', [id]);
    if (!result.rows.length) return res.status(404).json({ error: 'Prescription not found' });
    res.json({ message: 'Prescription deleted', id: result.rows[0].id });
  } catch (err) {
    console.error('Delete prescription error', err);
    res.status(500).json({ error: 'Could not delete prescription' });
  }
});

export default router;
