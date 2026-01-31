import express from 'express';
import { query } from '../db.js';
import { authenticate, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

// List patients (lab, pharmacy, doctor, staff)
router.get('/', authenticate, authorizeRoles('lab','pharmacy','doctor','staff','superadmin','accountant','patient'), async (req, res) => {
  try {
    const result = await query('SELECT id, name, phone, metadata, created_at FROM patients ORDER BY name');
    res.json(result.rows);
  } catch (err) {
    console.error('List patients error', err);
    res.status(500).json({ error: 'Could not fetch patients' });
  }
});

// Patient details
router.get('/:id', authenticate, authorizeRoles('lab','pharmacy','doctor','staff','superadmin','accountant','patient'), async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query('SELECT id, name, phone, metadata, created_at, (SELECT json_agg(json_build_object(\'id\',id,\'name\',name,\'relationship\',relationship)) FROM patient_family_members WHERE patient_id = patients.id) AS family_members FROM patients WHERE id = $1 LIMIT 1', [id]);
    if (!result.rows.length) return res.status(404).json({ error: 'Patient not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Patient details error', err);
    res.status(500).json({ error: 'Could not fetch patient details' });
  }
});

// Create patient (staff/doctor)
router.post('/', authenticate, authorizeRoles('doctor','staff','lab','pharmacy','superadmin'), async (req, res) => {
  const { name, phone, metadata = {} } = req.body;
  if (!name || !phone) return res.status(400).json({ error: 'Missing fields' });
  try {
    const result = await query('INSERT INTO patients (name, phone, metadata, created_at) VALUES ($1,$2,$3,NOW()) RETURNING id,name,phone,metadata,created_at', [name, phone, JSON.stringify(metadata)]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Create patient error', err);
    res.status(500).json({ error: 'Could not create patient' });
  }
});

// Update patient
router.put('/:id', authenticate, authorizeRoles('doctor','staff','lab','pharmacy','superadmin'), async (req, res) => {
  const { id } = req.params;
  const { name, phone, metadata } = req.body;
  const fields = [];
  const values = [];
  let idx = 1;
  
  if (name) { fields.push(`name = $${idx++}`); values.push(name); }
  if (phone) { fields.push(`phone = $${idx++}`); values.push(phone); }
  if (metadata) { fields.push(`metadata = $${idx++}`); values.push(JSON.stringify(metadata)); }
  
  if (!fields.length) return res.status(400).json({ error: 'No fields to update' });
  
  try {
    const sql = `UPDATE patients SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`;
    const result = await query(sql, [...values, id]);
    if (!result.rows.length) return res.status(404).json({ error: 'Patient not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Update patient error', err);
    res.status(500).json({ error: 'Could not update patient' });
  }
});

// Delete patient (soft delete)
router.delete('/:id', authenticate, authorizeRoles('staff','superadmin'), async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query("DELETE FROM patients WHERE id = $1 RETURNING id", [id]);
    if (!result.rows.length) return res.status(404).json({ error: 'Patient not found' });
    res.json({ message: 'Patient deleted', id: result.rows[0].id });
  } catch (err) {
    console.error('Delete patient error', err);
    res.status(500).json({ error: 'Could not delete patient' });
  }
});

// Add family member
router.post('/:patientId/family-members', authenticate, authorizeRoles('doctor','staff','patient','superadmin'), async (req, res) => {
  const { patientId } = req.params;
  const { name, relationship } = req.body;
  if (!name) return res.status(400).json({ error: 'Missing fields' });
  try {
    const result = await query('INSERT INTO patient_family_members (patient_id, name, relationship, id) VALUES ($1,$2,$3, gen_random_uuid()) RETURNING *', [patientId, name, relationship]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Add family member error', err);
    res.status(500).json({ error: 'Could not add family member' });
  }
});

// Get family members
router.get('/:patientId/family-members', authenticate, async (req, res) => {
  const { patientId } = req.params;
  try {
    const result = await query('SELECT * FROM patient_family_members WHERE patient_id = $1', [patientId]);
    res.json(result.rows);
  } catch (err) {
    console.error('Get family members error', err);
    res.status(500).json({ error: 'Could not fetch family members' });
  }
});

// Delete family member
router.delete('/:patientId/family-members/:memberId', authenticate, authorizeRoles('doctor','staff','patient','superadmin'), async (req, res) => {
  const { memberId } = req.params;
  try {
    const result = await query('DELETE FROM patient_family_members WHERE id = $1 RETURNING id', [memberId]);
    if (!result.rows.length) return res.status(404).json({ error: 'Family member not found' });
    res.json({ message: 'Family member deleted', id: result.rows[0].id });
  } catch (err) {
    console.error('Delete family member error', err);
    res.status(500).json({ error: 'Could not delete family member' });
  }
});

export default router;
