import jwt from 'jsonwebtoken';
import { query } from '../index.js'; // Import the query helper from your index.js

export async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    console.error(`[AUTH] 401 - Missing or invalid Authorization header from ${req.ip} - ${req.method} ${req.path}`);
    return res.status(401).json({ error: 'Missing token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // REAL-TIME CHECK: Verify user status in DB on every request
    const userResult = await query('SELECT status FROM users WHERE id = $1', [decoded.id]);
    const user = userResult.rows[0];

    if (!user) {
      console.error(`[AUTH] 403 - User not found in DB: ID ${decoded.id}, Email: ${decoded.email} from ${req.ip}`);
      return res.status(403).json({ error: 'Account is inactive or does not exist.' });
    }

    if (user.status !== 'active') {
      console.error(`[AUTH] 403 - Inactive user attempt: ID ${decoded.id}, Email: ${decoded.email}, Status: ${user.status} from ${req.ip}`);
      return res.status(403).json({ error: 'Account is inactive or does not exist.' });
    }

    req.user = decoded;
    next();
  } catch (err) {
    console.error(`[AUTH] 401 - JWT verification failed from ${req.ip}: ${err.message}`);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}


// Ensure this is exported exactly as 'authorizeRoles'
export function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied' });
    }
    next();
  };
}
