import express from 'express';
// FIXED: Import query from index.js where the Pool is actually configured
import { query } from '../index.js'; 
import { authenticate, authorizeRoles } from '../middleware/auth.js';

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

export default router;  