import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
(async ()=>{
  const { Client } = pg;
  const c = new Client({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'cms_db',
    password: process.env.DB_PASS || 'test',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  });
  await c.connect();
  const res = await c.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name='bills' ORDER BY ordinal_position");
  console.log(res.rows);
  await c.end();
})();
