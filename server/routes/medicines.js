import express from 'express';
import { query } from '../db.js';
import { authenticate, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

// List medicines
router.get('/', authenticate, authorizeRoles('pharmacy','doctor','superadmin'), async (req, res) => {
  try {
    const result = await query('SELECT * FROM medicines ORDER BY name');
    res.json(result.rows);
  } catch (err) {
    console.error('List medicines error', err);
    res.status(500).json({ error: 'Could not fetch medicines' });
  }
});

// Get medicine by ID
router.get('/:id', authenticate, authorizeRoles('pharmacy','doctor','superadmin'), async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query('SELECT * FROM medicines WHERE id = $1 LIMIT 1', [id]);
    if (!result.rows.length) return res.status(404).json({ error: 'Medicine not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Get medicine error', err);
    res.status(500).json({ error: 'Could not fetch medicine' });
  }
});

// Add medicine (pharmacist admin)
router.post('/', authenticate, authorizeRoles('pharmacy','superadmin'), async (req, res) => {
  const { name, stock = 0, price = 0 } = req.body;
  if (!name) return res.status(400).json({ error: 'Missing fields' });
  try {
    const result = await query('INSERT INTO medicines (name, stock, price, created_at) VALUES ($1,$2,$3,NOW()) RETURNING *', [name, stock, price]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Add medicine error', err);
    res.status(500).json({ error: 'Could not add medicine' });
  }
});

// Update medicine
router.put('/:id', authenticate, authorizeRoles('pharmacy','superadmin'), async (req, res) => {
  const { id } = req.params;
  const { name, stock, price } = req.body;
  const fields = [];
  const values = [];
  let idx = 1;
  
  if (name) { fields.push(`name = $${idx++}`); values.push(name); }
  if (stock !== undefined) { fields.push(`stock = $${idx++}`); values.push(stock); }
  if (price !== undefined) { fields.push(`price = $${idx++}`); values.push(price); }
  
  if (!fields.length) return res.status(400).json({ error: 'No fields to update' });
  
  try {
    const sql = `UPDATE medicines SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`;
    const result = await query(sql, [...values, id]);
    if (!result.rows.length) return res.status(404).json({ error: 'Medicine not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Update medicine error', err);
    res.status(500).json({ error: 'Could not update medicine' });
  }
});

// Delete medicine
router.delete('/:id', authenticate, authorizeRoles('pharmacy','superadmin'), async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query('DELETE FROM medicines WHERE id = $1 RETURNING id', [id]);
    if (!result.rows.length) return res.status(404).json({ error: 'Medicine not found' });
    res.json({ message: 'Medicine deleted', id: result.rows[0].id });
  } catch (err) {
    console.error('Delete medicine error', err);
    res.status(500).json({ error: 'Could not delete medicine' });
  }
});

export default router;