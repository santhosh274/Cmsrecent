import express from 'express';
// FIXED: Import query from index.js where the Pool is actually configured
import { query } from '../index.js'; 
import { authenticate, authorizeRoles } from '../middleware/auth.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

/**
 * GET /api/users/patients
 * Specifically fetches users with the 'patient' role.
 * This is likely what your dashboard is looking for.
 */
router.get('/patients', authenticate, async (req, res) => {
  try {
    const result = await query("SELECT * FROM patients");
    
    // Check if result exists and has rows
    if (!result || !result.rows) {
      return res.status(200).json([]); // Return empty array instead of 204
    }

    // ALWAYS use 'return' to ensure the function stops here
    return res.status(200).json(result.rows); 
  } catch (err) {
    console.error("DB Error:", err);
    return res.status(500).json({ error: err.message });
  }
});

// 2. Dynamic ID route SECOND
router.get('/:id', authenticate, async (req, res) => {
  const result = await query("SELECT * FROM users WHERE id = $1", [req.params.id]);
  return res.json(result.rows[0]);
});

/**
 * GET /api/users
 * Get all users (Superadmin only)
 */
router.get('/', authenticate, authorizeRoles('superadmin'), async (req, res) => {
  try {
    const result = await query('SELECT id, name, email, role, status FROM users ORDER BY name ASC');
    return res.json(result.rows);
  } catch (err) {
    console.error('Fetch Users Error:', err);
    return res.status(500).json({ error: 'Failed to fetch users' });
  }
});

/**
 * POST /api/users
 * Create a new user (Superadmin only)
 */
router.post('/', authenticate, authorizeRoles('superadmin'), async (req, res) => {
  const { name, email, role, password } = req.body;

  if (!name || !email || !role || !password) {
    return res.status(400).json({ error: 'Name, email, role, and password are required' });
  }

  try {
    // Check if user already exists
    const existingUser = await query('SELECT id FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: 'User with this email already exists' });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    const result = await query(
      `INSERT INTO users (email, password_hash, role, name, status, created_at)
       VALUES ($1, $2, $3, $4, 'active', NOW())
       RETURNING id, name, email, role, status`,
      [email, passwordHash, role, name]
    );

    return res.status(201).json({
      message: 'User created successfully',
      user: result.rows[0]
    });
  } catch (err) {
    console.error('Create User Error:', err);
    return res.status(500).json({ error: 'Failed to create user' });
  }
});

/**
 * PUT /api/users/:id
 * Update user details
 */
router.put('/:id', authenticate, authorizeRoles('superadmin'), async (req, res) => {
  const { id } = req.params;
  const { name, email, role, status } = req.body;

  try {
    const result = await query(
      `UPDATE users 
       SET name = COALESCE($1, name), 
           email = COALESCE($2, email), 
           role = COALESCE($3, role), 
           status = COALESCE($4, status) 
       WHERE id = $5 
       RETURNING id, name, email, role, status`,
      [name, email, role, status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ 
      message: 'User updated successfully', 
      user: result.rows[0] 
    });
  } catch (err) {
    console.error('Update Error:', err);
    return res.status(500).json({ error: 'Server error during update' });
  }
});

/**
 * DELETE /api/users/:id
 * Delete a user (Superadmin only)
 */
router.delete('/:id', authenticate, authorizeRoles('superadmin'), async (req, res) => {
  const { id } = req.params;

  try {
    const result = await query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Delete User Error:', err);
    return res.status(500).json({ error: 'Failed to delete user' });
  }
});

export default router;  