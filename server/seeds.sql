-- 1. SEED ALL SYSTEM USERS
-- Password for all: 'password123' (Pre-hashed for Bcrypt)
-- Hash: password123 -> $2a$10$sOdT5.G3Gj2Gj0Rpp8EtguB9xOmjpWEcBJZSczePyF40tcbyTb2mi
INSERT INTO users (id, email, password_hash, role, name, status)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'admin@cms.com', '$2a$10$sOdT5.G3Gj2Gj0Rpp8EtguB9xOmjpWEcBJZSczePyF40tcbyTb2mi', 'superadmin', 'Santhosh Admin', 'active'),
  ('22222222-2222-2222-2222-222222222222', 'doctor@cms.com', '$2a$10$sOdT5.G3Gj2Gj0Rpp8EtguB9xOmjpWEcBJZSczePyF40tcbyTb2mi', 'doctor', 'Dr. Alice Smith', 'active'),
  ('33333333-3333-3333-3333-333333333333', 'pharmacy@cms.com', '$2a$10$sOdT5.G3Gj2Gj0Rpp8EtguB9xOmjpWEcBJZSczePyF40tcbyTb2mi', 'pharmacy', 'James Pharmacist', 'active'),
  ('44444444-4444-4444-4444-444444444444', 'lab@cms.com', '$2a$10$sOdT5.G3Gj2Gj0Rpp8EtguB9xOmjpWEcBJZSczePyF40tcbyTb2mi', 'lab', 'Robert LabTech', 'active');


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
    '22222222-2222-2222-2222-222222222222', 
    NOW() + INTERVAL '2 hours', 
    'Severe headache and fever', 
    'scheduled'
  ),
  (
    'b2222222-2222-2222-2222-222222222222', 
    '22222222-2222-2222-2222-222222222222', 
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
    '44444444-4444-4444-4444-444444444444', 
    'blood_test_results.pdf', 
    '{"type": "Blood Work", "result": "Normal"}'
  );
