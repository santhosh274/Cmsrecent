import pg from 'pg';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'postgres',
  password: process.env.DB_PASS || 'test',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
});

async function seedDatabase() {
  try {
    // Hash for password "password123"
    const hashedPassword = '$2a$10$8JLziGOs8w2FuxiihutBU.RqzRYkirIH762yWYv7CkSauugj7O4Ia';

    // Create test users
    const doctorId = uuidv4();
    const labTechId = uuidv4();
    const pharmacistId = uuidv4();
    const accountantId = uuidv4();
    const staffId = uuidv4();
    const superadminId = uuidv4();

    console.log('Creating test users...');
    
    // Superadmin
    await pool.query(
      `INSERT INTO users (id, email, password_hash, role, name, created_at) 
       VALUES ($1, $2, $3, $4, $5, NOW())
       ON CONFLICT (email) DO NOTHING`,
      [superadminId, 'superadmin@test.com', hashedPassword, 'superadmin', 'Admin User']
    );

    // Doctor
    await pool.query(
      `INSERT INTO users (id, email, password_hash, role, name, created_at) 
       VALUES ($1, $2, $3, $4, $5, NOW())
       ON CONFLICT (email) DO NOTHING`,
      [doctorId, 'doctor@test.com', hashedPassword, 'admin_doctor', 'Dr. Sarah Johnson']
    );

    // Lab Technician
    await pool.query(
      `INSERT INTO users (id, email, password_hash, role, name, created_at) 
       VALUES ($1, $2, $3, $4, $5, NOW())
       ON CONFLICT (email) DO NOTHING`,
      [labTechId, 'labtech@test.com', hashedPassword, 'admin_lab', 'John Lab Tech']
    );

    // Pharmacist
    await pool.query(
      `INSERT INTO users (id, email, password_hash, role, name, created_at) 
       VALUES ($1, $2, $3, $4, $5, NOW())
       ON CONFLICT (email) DO NOTHING`,
      [pharmacistId, 'pharmacist@test.com', hashedPassword, 'admin_pharmacist', 'Emma Pharmacist']
    );

    // Accountant
    await pool.query(
      `INSERT INTO users (id, email, password_hash, role, name, created_at) 
       VALUES ($1, $2, $3, $4, $5, NOW())
       ON CONFLICT (email) DO NOTHING`,
      [accountantId, 'accountant@test.com', hashedPassword, 'admin_accountant', 'Michael Accountant']
    );

    // Staff
    await pool.query(
      `INSERT INTO users (id, email, password_hash, role, name, created_at) 
       VALUES ($1, $2, $3, $4, $5, NOW())
       ON CONFLICT (email) DO NOTHING`,
      [staffId, 'staff@test.com', hashedPassword, 'staff', 'Lisa Staff']
    );

    console.log(`✓ Users created/updated`);

    // Now fetch the actual IDs of the users we just inserted
    const doctorResult = await pool.query(`SELECT id FROM users WHERE email = 'doctor@test.com'`);
    const labTechResult = await pool.query(`SELECT id FROM users WHERE email = 'labtech@test.com'`);
    
    const actualDoctorId = doctorResult.rows[0].id;
    const actualLabTechId = labTechResult.rows[0].id;

    console.log('✓ Users created/updated');

    // Create test patients
    console.log('Creating test patients...');
    const patientIds = [];
    const patients = [
      { name: 'John Doe', phone: '+91 98765 43210' },
      { name: 'Jane Smith', phone: '+91 98765 43211' },
      { name: 'Robert Wilson', phone: '+91 98765 43212' },
      { name: 'Alice Johnson', phone: '+91 98765 43213' },
      { name: 'Michael Brown', phone: '+91 98765 43214' },
      { name: 'Emily Davis', phone: '+91 98765 43215' },
    ];

    for (const patient of patients) {
      const result = await pool.query(
        `INSERT INTO patients (name, phone, metadata, created_at) 
         VALUES ($1, $2, $3, NOW())
         RETURNING id`,
        [patient.name, patient.phone, JSON.stringify({ age: 30, gender: 'M' })]
      );
      patientIds.push(result.rows[0].id);
    }

    console.log(`✓ ${patients.length} patients created`);

    // Create appointments
    console.log('Creating test appointments...');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    await pool.query(
      `INSERT INTO appointments (patient_id, doctor_id, scheduled_at, reason, status)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT DO NOTHING`,
      [patientIds[0], actualDoctorId, tomorrow, 'Regular Checkup', 'scheduled']
    );

    await pool.query(
      `INSERT INTO appointments (patient_id, doctor_id, scheduled_at, reason, status)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT DO NOTHING`,
      [patientIds[1], actualDoctorId, new Date(tomorrow.getTime() + 86400000), 'Follow-up', 'scheduled']
    );

    console.log('✓ Appointments created');

    // Create prescriptions
    console.log('Creating test prescriptions...');
    const medicines = [
      { name: 'Paracetamol', dosage: '500mg', quantity: 30 },
      { name: 'Ibuprofen', dosage: '400mg', quantity: 20 },
    ];

    await pool.query(
      `INSERT INTO prescriptions (patient_id, doctor_id, medicines, notes)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT DO NOTHING`,
      [patientIds[0], actualDoctorId, JSON.stringify(medicines), 'Take as needed for pain']
    );

    console.log('✓ Prescriptions created');

    // Create lab reports
    console.log('Creating test lab reports...');
    await pool.query(
      `INSERT INTO lab_reports (patient_id, uploaded_by, file_name, metadata)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT DO NOTHING`,
      [patientIds[0], actualLabTechId, 'blood_test_123.pdf', JSON.stringify({
        originalName: 'Blood Test Report',
        mimeType: 'application/pdf',
        size: 245000,
        category: 'lab-test'
      })]
    );

    console.log('✓ Lab reports created');

    // Create medicines
    console.log('Creating medicines inventory...');
    const medicinesList = [
      { name: 'Paracetamol 500mg', stock: 500, price: 20 },
      { name: 'Ibuprofen 400mg', stock: 300, price: 25 },
      { name: 'Amoxicillin 500mg', stock: 200, price: 35 },
      { name: 'Aspirin 100mg', stock: 400, price: 15 },
      { name: 'Metformin 500mg', stock: 150, price: 45 },
      { name: 'Lisinopril 10mg', stock: 100, price: 50 },
    ];

    for (const medicine of medicinesList) {
      await pool.query(
        `INSERT INTO medicines (name, stock, price)
         VALUES ($1, $2, $3)
         ON CONFLICT DO NOTHING`,
        [medicine.name, medicine.stock, medicine.price]
      );
    }

    console.log(`✓ ${medicinesList.length} medicines created`);

    // Create bills (store items as JSON in `items` column)
    console.log('Creating test bills...');
    await pool.query(
      `INSERT INTO bills (patient_id, amount, items)
       VALUES ($1, $2, $3)
       ON CONFLICT DO NOTHING`,
      [patientIds[0], 1500, JSON.stringify([
        { description: 'Consultation', quantity: 1, price: 500 },
        { description: 'Lab Test', quantity: 1, price: 1000 }
      ])]
    );

    console.log('✓ Bills created');

    console.log('\n✅ Database seeding complete!');
    console.log('\nTest Credentials:');
    console.log('Email: superadmin@test.com, Password: password123, Role: Superadmin');
    console.log('Email: doctor@test.com, Password: password123, Role: Doctor');
    console.log('Email: labtech@test.com, Password: password123, Role: Lab Tech');
    console.log('Email: pharmacist@test.com, Password: password123, Role: Pharmacist');
    console.log('Email: accountant@test.com, Password: password123, Role: Accountant');
    console.log('Email: staff@test.com, Password: password123, Role: Staff');
    console.log(`\n${patients.length} test patients have been created with appointments and reports.`);

    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
}

seedDatabase();
