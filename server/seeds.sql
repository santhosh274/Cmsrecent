-- 1. SEED ALL SYSTEM USERS
-- Password for all: 'password123' (Pre-hashed for Bcrypt)
INSERT INTO users (id, email, password_hash, role, name, status)
VALUES
  (gen_random_uuid(), 'admin@cms.com', '$2a$10$YcM0bK3pN8RzTt4S1mYxEO6kA5r...', 'superadmin', 'Santhosh Admin', 'active'),
  (gen_random_uuid(), 'doctor@cms.com', '$2a$10$YcM0bK3pN8RzTt4S1mYxEO6kA5r...', 'doctor', 'Dr. Alice Smith', 'active'),
  (gen_random_uuid(), 'pharmacy@cms.com', '$2a$10$YcM0bK3pN8RzTt4S1mYxEO6kA5r...', 'pharmacist', 'James Pharmacist', 'active'),
  (gen_random_uuid(), 'lab@cms.com', '$2a$10$YcM0bK3pN8RzTt4S1mYxEO6kA5r...', 'lab_tech', 'Robert LabTech', 'active');

-- 2. SEED PATIENTS (Parent table for clinical data)
-- Using fixed UUIDs for consistent linking in this seed file
INSERT INTO patients (id, name, phone, metadata)
VALUES
  ('a1111111-1111-1111-1111-111111111111', 'John Patient', '555-0101', '{"age": 45, "blood": "O+"}'),
  ('b2222222-2222-2222-2222-222222222222', 'Jane Patient', '555-0102', '{"age": 30, "allergies": ["Penicillin"]}');

-- 3. SEED MEDICINES (For Pharmacist dashboard)
INSERT INTO medicines (id, name, stock, price)
VALUES
  (gen_random_uuid(), 'Paracetamol 500mg', 500, 5.00),
  (gen_random_uuid(), 'Amoxicillin 250mg', 200, 15.50),
  (gen_random_uuid(), 'Cetirizine', 300, 8.00);

-- 4. SEED APPOINTMENTS (For Doctor dashboard)
INSERT INTO appointments (patient_id, doctor_id, scheduled_at, reason, status)
VALUES
  (
    'a1111111-1111-1111-1111-111111111111', 
    (SELECT id FROM users WHERE role = 'doctor' LIMIT 1), 
    NOW() + INTERVAL '2 hours', 
    'Severe headache and fever', 
    'scheduled'
  ),
  (
    'b2222222-2222-2222-2222-222222222222', 
    (SELECT id FROM users WHERE role = 'doctor' LIMIT 1), 
    NOW() + INTERVAL '1 day', 
    'Routine follow-up', 
    'scheduled'
  );

-- 5. SEED BILLS (For Pharmacist/Billing workflow)
INSERT INTO bills (patient_id, amount, items)
VALUES
  (
    'a1111111-1111-1111-1111-111111111111', 
    120.50, 
    '[{"item": "Consultation", "price": 100}, {"item": "Medicine", "price": 20.50}]'
  );

-- 6. SEED LAB REPORTS (For Lab Tech dashboard)
INSERT INTO lab_reports (patient_id, uploaded_by, file_name, metadata)
VALUES
  (
    'a1111111-1111-1111-1111-111111111111', 
    (SELECT id FROM users WHERE role = 'lab_tech' LIMIT 1), 
    'blood_test_results.pdf', 
    '{"type": "Blood Work", "result": "Normal"}'
  );