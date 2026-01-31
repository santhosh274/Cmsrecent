import express from 'express';
import { query } from '../db.js';
import { authenticate, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

// Get lab reports for a patient - specific route first
router.get('/patient/:patientId', authenticate, async (req, res) => {
  const { patientId } = req.params;
  try {
    const result = await query('SELECT l.*, p.name as patient_name, u.name as uploaded_by_name FROM lab_reports l LEFT JOIN patients p ON l.patient_id = p.id LEFT JOIN users u ON l.uploaded_by = u.id WHERE l.patient_id = $1 ORDER BY l.created_at DESC', [patientId]);
    res.json(result.rows);
  } catch (err) {
    console.error('Get patient lab reports error', err);
    res.status(500).json({ error: 'Could not fetch lab reports' });
  }
});

// List all lab reports
router.get('/', authenticate, authorizeRoles('lab','doctor','pharmacy','superadmin'), async (req, res) => {
  try {
    const result = await query('SELECT l.*, p.name as patient_name, u.name as uploaded_by_name FROM lab_reports l LEFT JOIN patients p ON l.patient_id = p.id LEFT JOIN users u ON l.uploaded_by = u.id ORDER BY l.created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('List lab reports error', err);
    res.status(500).json({ error: 'Could not fetch lab reports' });
  }
});

// Get lab report by ID - generic route last
router.get('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query('SELECT l.*, p.name as patient_name, u.name as uploaded_by_name FROM lab_reports l LEFT JOIN patients p ON l.patient_id = p.id LEFT JOIN users u ON l.uploaded_by = u.id WHERE l.id = $1 LIMIT 1', [id]);
    if (!result.rows.length) return res.status(404).json({ error: 'Lab report not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Get lab report error', err);
    res.status(500).json({ error: 'Could not fetch lab report' });
  }
});

// Upload lab report metadata (file uploads handled in files.js)
router.post('/', authenticate, authorizeRoles('lab','doctor','superadmin'), async (req, res) => {
  const { patient_id, uploaded_by, file_name, metadata = {} } = req.body;
  if (!patient_id || !uploaded_by || !file_name) return res.status(400).json({ error: 'Missing fields' });
  try {
    const result = await query('INSERT INTO lab_reports (patient_id, uploaded_by, file_name, metadata, created_at) VALUES ($1,$2,$3,$4,NOW()) RETURNING *', [patient_id, uploaded_by, file_name, JSON.stringify(metadata)]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Create lab report error', err);
    res.status(500).json({ error: 'Could not save lab report' });
  }
});

// Update lab report
router.put('/:id', authenticate, authorizeRoles('lab','doctor','superadmin'), async (req, res) => {
  const { id } = req.params;
  const { file_name, metadata } = req.body;
  const fields = [];
  const values = [];
  let idx = 1;
  
  if (file_name) { fields.push(`file_name = $${idx++}`); values.push(file_name); }
  if (metadata) { fields.push(`metadata = $${idx++}`); values.push(JSON.stringify(metadata)); }
  
  if (!fields.length) return res.status(400).json({ error: 'No fields to update' });
  
  try {
    const sql = `UPDATE lab_reports SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`;
    const result = await query(sql, [...values, id]);
    if (!result.rows.length) return res.status(404).json({ error: 'Lab report not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Update lab report error', err);
    res.status(500).json({ error: 'Could not update lab report' });
  }
});

// Delete lab report
router.delete('/:id', authenticate, authorizeRoles('lab','superadmin'), async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query('DELETE FROM lab_reports WHERE id = $1 RETURNING id', [id]);
    if (!result.rows.length) return res.status(404).json({ error: 'Lab report not found' });
    res.json({ message: 'Lab report deleted', id: result.rows[0].id });
  } catch (err) {
    console.error('Delete lab report error', err);
    res.status(500).json({ error: 'Could not delete lab report' });
  }
});

export default router;
