import fetch from 'node-fetch';

const API_URL = 'http://localhost:5000/api';

async function testEndpoints() {
  console.log('Testing API Endpoints...\n');

  // Test 1: Health Check
  console.log('1. Health Check');
  try {
    const health = await fetch(`${API_URL}/health`);
    const healthData = await health.json();
    console.log('✓ Health:', healthData);
  } catch (err) {
    console.log('✗ Health failed:', err.message);
  }

  // Test 2: Login
  console.log('\n2. Login');
  try {
    const login = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'superadmin@test.com',
        password: 'password123'
      })
    });
    const loginData = await login.json();
    console.log('✓ Login successful:', { token: loginData.token?.substring(0, 20) + '...', role: loginData.role });
    const token = loginData.token;

    // Test 3: Get Users (with token)
    console.log('\n3. Get Users');
    try {
      const users = await fetch(`${API_URL}/users`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const usersData = await users.json();
      console.log(`✓ Users count: ${usersData.length}`);
    } catch (err) {
      console.log('✗ Get users failed:', err.message);
    }

    // Test 4: Get Patients
    console.log('\n4. Get Patients');
    try {
      const patients = await fetch(`${API_URL}/patients`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const patientsData = await patients.json();
      console.log(`✓ Patients count: ${patientsData.length}`);
    } catch (err) {
      console.log('✗ Get patients failed:', err.message);
    }

    // Test 5: Get Appointments
    console.log('\n5. Get Appointments');
    try {
      const appointments = await fetch(`${API_URL}/appointments`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const appointmentsData = await appointments.json();
      console.log(`✓ Appointments count: ${appointmentsData.length}`);
    } catch (err) {
      console.log('✗ Get appointments failed:', err.message);
    }

    // Test 6: Get Prescriptions
    console.log('\n6. Get Prescriptions');
    try {
      const prescriptions = await fetch(`${API_URL}/prescriptions`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const prescriptionsData = await prescriptions.json();
      console.log(`✓ Prescriptions count: ${prescriptionsData.length}`);
    } catch (err) {
      console.log('✗ Get prescriptions failed:', err.message);
    }

    // Test 7: Get Lab Reports
    console.log('\n7. Get Lab Reports');
    try {
      const labReports = await fetch(`${API_URL}/lab-reports`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const labReportsData = await labReports.json();
      console.log(`✓ Lab Reports count: ${labReportsData.length}`);
    } catch (err) {
      console.log('✗ Get lab reports failed:', err.message);
    }

    // Test 8: Get Medicines
    console.log('\n8. Get Medicines');
    try {
      const medicines = await fetch(`${API_URL}/medicines`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const medicinesData = await medicines.json();
      console.log(`✓ Medicines count: ${medicinesData.length}`);
    } catch (err) {
      console.log('✗ Get medicines failed:', err.message);
    }

    // Test 9: Get Bills
    console.log('\n9. Get Bills');
    try {
      const bills = await fetch(`${API_URL}/bills`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const billsData = await bills.json();
      console.log(`✓ Bills count: ${billsData.length}`);
    } catch (err) {
      console.log('✗ Get bills failed:', err.message);
    }

  } catch (err) {
    console.log('✗ Login failed:', err.message);
  }

  console.log('\n✅ API Testing Complete!');
}

testEndpoints().catch(console.error);
