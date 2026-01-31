import pg from 'pg';
import bcrypt from 'bcryptjs';

const { Pool } = pg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'test',
  port: 5432,
});

async function addTestUser() {
  try {
    const passwordHash = await bcrypt.hash('12345', 10);
    
    // Check if user exists
    const checkResult = await pool.query(
      "SELECT * FROM users WHERE email = 'santhoshkumarr.a7@gmail.com'"
    );
    
    if (checkResult.rows.length > 0) {
      // Update existing user password
      await pool.query(
        "UPDATE users SET password_hash = $1 WHERE email = 'santhoshkumarr.a7@gmail.com'",
        [passwordHash]
      );
      console.log('Updated existing user password');
    } else {
      // Insert new user
      await pool.query(
        `INSERT INTO users (email, password_hash, role, name, status, created_at)
         VALUES ('santhoshkumarr.a7@gmail.com', $1, 'superadmin', 'Santhosh Kumar', 'active', NOW())`,
        [passwordHash]
      );
      console.log('Created new test user');
    }
    
    console.log('Test user ready! Password: 12345');
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

addTestUser();
