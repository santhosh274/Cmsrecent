import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../index.js'; // Ensure this points to index.js where query is exported
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const clientIp = req.ip || req.connection.remoteAddress;

  console.log(`[LOGIN] Attempt from ${clientIp} - Email: ${email}`);

  try {
    const result = await query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      console.error(`[LOGIN] 401 - User not found: ${email} from ${clientIp}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (user.status !== 'active') {
      console.error(`[LOGIN] 403 - Inactive account attempt: ${email}, Status: ${user.status} from ${clientIp}`);
      return res.status(403).json({ error: 'Account is inactive. Please contact admin.' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      console.error(`[LOGIN] 401 - Invalid password for: ${email} from ${clientIp}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET, 
      { expiresIn: '8h' }
    );

    console.log(`[LOGIN] 200 - Success: ${email}, Role: ${user.role}, ID: ${user.id} from ${clientIp}`);

    // FIXED: Sending flattened data so frontend can find .role and .name easily
    return res.json({
      token,
      role: user.role,
      name: user.name,
      email: user.email,
      id: user.id
    });
  } catch (err) {
    console.error(`[LOGIN] 500 - Server error for ${email} from ${clientIp}:`, err.message);
    return res.status(500).json({ error: 'Server error during login' });
  }
});


router.get('/me', authenticate, (req, res) => {
  res.json(req.user);
});

export default router;
