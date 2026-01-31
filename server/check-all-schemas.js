import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'test',
  port: 5432,
});

const tables = ['users', 'patients', 'appointments', 'prescriptions', 'lab_reports', 'medicines', 'bills', 'bill_items'];

for (const table of tables) {
  console.log(`\n${table}:`);
  const result = await pool.query(`
    SELECT column_name, data_type, is_nullable, column_default
    FROM information_schema.columns 
    WHERE table_name = $1
    ORDER BY ordinal_position
  `, [table]);
  
  result.rows.forEach(row => {
    const nullable = row.is_nullable === 'YES' ? '(null)' : '';
    const def = row.column_default ? ` [${row.column_default}]` : '';
    console.log(`  ${row.column_name}: ${row.data_type} ${nullable}${def}`);
  });
}

process.exit(0);
