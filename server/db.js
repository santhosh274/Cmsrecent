/**
 * Database utility functions for PostgreSQL integration
 * This file provides reusable database query functions
 * 
 * Note: For future use when integrating PostgreSQL for all data operations
 * Currently, authentication is integrated, but other features still use mock data
 */

import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT || 5432,
});

/**
 * Execute a database query
 * @param {string} text - SQL query text
 * @param {Array} params - Query parameters
 * @returns {Promise} Query result
 */
export async function query(text, params) {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

/**
 * Get a single user by email
 * @param {string} email - User email
 * @returns {Promise<Object>} User object
 */
export async function getUserByEmail(email) {
  const result = await query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0] || null;
}

/**
 * Get a single user by ID
 * @param {string} id - User ID
 * @returns {Promise<Object>} User object
 */
export async function getUserById(id) {
  const result = await query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0] || null;
}

/**
 * Create a new user
 * @param {Object} userData - User data
 * @returns {Promise<Object>} Created user
 */
export async function createUser(userData) {
  const { email, password_hash, role, name } = userData;
  const result = await query(
    `INSERT INTO users (email, password_hash, role, name) 
     VALUES ($1, $2, $3, $4) 
     RETURNING *`,
    [email, password_hash, role, name]
  );
  return result.rows[0];
}

/**
 * Update user information
 * @param {string} id - User ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} Updated user
 */
export async function updateUser(id, updates) {
  const fields = Object.keys(updates);
  const values = Object.values(updates);
  const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
  
  const result = await query(
    `UPDATE users SET ${setClause} WHERE id = $1 RETURNING *`,
    [id, ...values]
  );
  return result.rows[0];
}

/**
 * Test database connection
 * @returns {Promise<boolean>} Connection status
 */
export async function testConnection() {
  try {
    await query('SELECT 1');
    return true;
  } catch (error) {
    console.error('Database connection test failed:', error);
    return false;
  }
}

export { pool };

