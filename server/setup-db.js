import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'postgres',
  password: process.env.DB_PASS || 'test',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
});

async function setupDatabase() {
  try {
    // Read the schema file
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Split by semicolons to execute each statement
    const statements = schema.split(';').filter(s => s.trim());
    
    for (const statement of statements) {
      if (statement.trim()) {
        try {
          await pool.query(statement);
          console.log('Executed:', statement.substring(0, 50) + '...');
        } catch (err) {
          // Ignore errors for existing objects
          if (err.code !== '42P07' && err.code !== '42710') {
            console.log('Note:', err.message);
          }
        }
      }
    }
    
    console.log('Database setup complete!');
    
    // Seed initial data if needed
    const seedPath = path.join(__dirname, 'seeds.sql');
    if (fs.existsSync(seedPath)) {
      const seeds = fs.readFileSync(seedPath, 'utf8');
      const seedStatements = seeds.split(';').filter(s => s.trim().startsWith('INSERT'));
      for (const seed of seedStatements) {
        try {
          await pool.query(seed);
          console.log('Seed data added!');
        } catch (err) {
          // Ignore duplicate key errors
          if (err.code !== '23505') {
            console.log('Seed note:', err.message);
          }
        }
      }
    }
    
    process.exit(0);
  } catch (err) {
    console.error('Setup failed:', err);
    process.exit(1);
  }
}

setupDatabase();
