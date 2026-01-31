import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'test',
  port: 5432,
});

const result = await pool.query(`
  SELECT column_name, data_type 
  FROM information_schema.columns 
  WHERE table_name = 'bills'
  ORDER BY ordinal_position
`);

console.log('Bills table columns:');
result.rows.forEach(row => {
  console.log(`  ${row.column_name}: ${row.data_type}`);
});

process.exit(0);
