import express from 'express';
import { query } from '../db.js';
import { authenticate, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

// Get bills for a patient - specific route first
router.get('/patient/:patientId', authenticate, async (req, res) => {
  const { patientId } = req.params;
  try {
    const result = await query('SELECT b.*, p.name as patient_name FROM bills b LEFT JOIN patients p ON b.patient_id = p.id WHERE b.patient_id = $1 ORDER BY b.created_at DESC', [patientId]);
    res.json(result.rows);
  } catch (err) {
    console.error('Get patient bills error', err);
    res.status(500).json({ error: 'Could not fetch bills' });
  }
});

// List all bills
router.get('/', authenticate, authorizeRoles('accountant','superadmin','patient'), async (req, res) => {
  try {
    const result = await query('SELECT b.*, p.name as patient_name FROM bills b LEFT JOIN patients p ON b.patient_id = p.id ORDER BY b.created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('List bills error', err);
    res.status(500).json({ error: 'Could not fetch bills' });
  }
});

// Get bill by ID - generic route last
router.get('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query('SELECT b.*, p.name as patient_name FROM bills b LEFT JOIN patients p ON b.patient_id = p.id WHERE b.id = $1 LIMIT 1', [id]);
    if (!result.rows.length) return res.status(404).json({ error: 'Bill not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Get bill error', err);
    res.status(500).json({ error: 'Could not fetch bill' });
  }
});

// Create a bill
router.post('/', authenticate, authorizeRoles('accountant','superadmin'), async (req, res) => {
  const { patient_id, amount, items = [] } = req.body;
  if (!patient_id || !amount) return res.status(400).json({ error: 'Missing fields' });
  try {
    const result = await query('INSERT INTO bills (patient_id, amount, items, created_at) VALUES ($1,$2,$3,NOW()) RETURNING *', [patient_id, amount, JSON.stringify(items)]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Create bill error', err);
    res.status(500).json({ error: 'Could not create bill' });
  }
});

// Update bill
router.put('/:id', authenticate, authorizeRoles('accountant','superadmin'), async (req, res) => {
  const { id } = req.params;
  const { amount, items } = req.body;
  const fields = [];
  const values = [];
  let idx = 1;
  
  if (amount) { fields.push(`amount = $${idx++}`); values.push(amount); }
  if (items) { fields.push(`items = $${idx++}`); values.push(JSON.stringify(items)); }
  
  if (!fields.length) return res.status(400).json({ error: 'No fields to update' });
  
  try {
    const sql = `UPDATE bills SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`;
    const result = await query(sql, [...values, id]);
    if (!result.rows.length) return res.status(404).json({ error: 'Bill not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Update bill error', err);
    res.status(500).json({ error: 'Could not update bill' });
  }
});

// Delete bill
router.delete('/:id', authenticate, authorizeRoles('accountant','superadmin'), async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query('DELETE FROM bills WHERE id = $1 RETURNING id', [id]);
    if (!result.rows.length) return res.status(404).json({ error: 'Bill not found' });
    res.json({ message: 'Bill deleted', id: result.rows[0].id });
  } catch (err) {
    console.error('Delete bill error', err);
    res.status(500).json({ error: 'Could not delete bill' });
  }
});

export default router;