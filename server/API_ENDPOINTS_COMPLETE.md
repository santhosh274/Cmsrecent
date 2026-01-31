# API Endpoints Documentation

## Backend Integration Complete

This document lists all the implemented API endpoints for the CMS system.

### Base URL
```
http://localhost:5000/api
```

### Authentication
All endpoints (except `/auth/login` and `/auth/register`) require:
```
Authorization: Bearer {JWT_TOKEN}
```

---

## Auth Endpoints

### POST /auth/register
Register a new user
- **Body**: `{ name, email, password, role }`
- **Response**: User object with id, name, email, role

### POST /auth/login
Login with email and password
- **Body**: `{ email, password }`
- **Response**: `{ token, id, name, email, role }`

---

## Users Endpoints

### GET /users
List all users (superadmin only)
- **Returns**: Array of user objects

### GET /users/:id
Get user by ID
- **Returns**: User object

### POST /users
Create new user (superadmin only)
- **Body**: `{ name, email, role, password_hash }`
- **Returns**: Created user object

### PUT /users/:id
Update user (superadmin only)
- **Body**: `{ name, email, role, status }`
- **Returns**: Updated user object

### DELETE /users/:id
Delete/revoke user (superadmin only)
- **Returns**: `{ message, id, status }`

---

## Patients Endpoints

### GET /patients
List all patients
- **Returns**: Array of patient objects

### GET /patients/:id
Get patient details including family members
- **Returns**: Patient object with family_members array

### POST /patients
Create new patient
- **Body**: `{ name, phone, metadata }`
- **Returns**: Created patient object

### PUT /patients/:id
Update patient
- **Body**: `{ name, phone, metadata }`
- **Returns**: Updated patient object

### DELETE /patients/:id
Delete patient
- **Returns**: `{ message, id }`

### GET /patients/:patientId/family-members
Get patient's family members
- **Returns**: Array of family member objects

### POST /patients/:patientId/family-members
Add family member
- **Body**: `{ name, relationship }`
- **Returns**: Created family member object

### DELETE /patients/:patientId/family-members/:memberId
Delete family member
- **Returns**: `{ message, id }`

---

## Appointments Endpoints

### GET /appointments
List all appointments
- **Returns**: Array of appointment objects with patient and doctor names

### GET /appointments/:id
Get appointment by ID
- **Returns**: Appointment object

### GET /appointments/patient/:patientId
Get appointments for a patient
- **Returns**: Array of appointment objects

### GET /appointments/doctor/:doctorId
Get appointments for a doctor
- **Returns**: Array of appointment objects

### POST /appointments
Create appointment
- **Body**: `{ patient_id, doctor_id, scheduled_at, reason, status }`
- **Returns**: Created appointment object

### PUT /appointments/:id
Update appointment
- **Body**: `{ scheduled_at, reason, status }`
- **Returns**: Updated appointment object

### DELETE /appointments/:id
Delete appointment
- **Returns**: `{ message, id }`

---

## Prescriptions Endpoints

### GET /prescriptions
List all prescriptions
- **Returns**: Array of prescription objects with patient and doctor names

### GET /prescriptions/:id
Get prescription by ID
- **Returns**: Prescription object

### GET /prescriptions/patient/:patientId
Get prescriptions for a patient
- **Returns**: Array of prescription objects

### GET /prescriptions/doctor/:doctorId
Get prescriptions by doctor
- **Returns**: Array of prescription objects

### POST /prescriptions
Create prescription (doctor only)
- **Body**: `{ patient_id, doctor_id, medicines, notes }`
- **Returns**: Created prescription object

### PUT /prescriptions/:id
Update prescription (doctor only)
- **Body**: `{ medicines, notes }`
- **Returns**: Updated prescription object

### DELETE /prescriptions/:id
Delete prescription (doctor only)
- **Returns**: `{ message, id }`

---

## Lab Reports Endpoints

### GET /lab-reports
List all lab reports
- **Returns**: Array of lab report objects with patient and uploader names

### GET /lab-reports/:id
Get lab report by ID
- **Returns**: Lab report object

### GET /lab-reports/patient/:patientId
Get lab reports for a patient
- **Returns**: Array of lab report objects

### POST /lab-reports
Create lab report metadata (lab only)
- **Body**: `{ patient_id, uploaded_by, file_name, metadata }`
- **Returns**: Created lab report object

### PUT /lab-reports/:id
Update lab report (lab only)
- **Body**: `{ file_name, metadata }`
- **Returns**: Updated lab report object

### DELETE /lab-reports/:id
Delete lab report (lab only)
- **Returns**: `{ message, id }`

---

## Files Endpoints

### POST /files/upload
Upload file (lab, doctor, patient, superadmin)
- **Content-Type**: multipart/form-data
- **Body**: 
  - `file`: File to upload (PDF, JPG, PNG, max 10MB)
  - `patient_id`: Patient ID (required)
  - `category`: Category of file (optional, default: 'general')
- **Returns**: `{ id, file_name, original_name, patient_id, uploaded_by, created_at }`

### GET /files/:filename
Download file
- **Returns**: File as binary blob

### GET /files/info/:id
Get file metadata
- **Returns**: File metadata object

### DELETE /files/:id
Delete file (lab, superadmin)
- **Returns**: `{ message, id }`

---

## Medicines Endpoints

### GET /medicines
List all medicines
- **Returns**: Array of medicine objects

### GET /medicines/:id
Get medicine by ID
- **Returns**: Medicine object

### POST /medicines
Create medicine (pharmacy only)
- **Body**: `{ name, stock, price }`
- **Returns**: Created medicine object

### PUT /medicines/:id
Update medicine (pharmacy only)
- **Body**: `{ name, stock, price }`
- **Returns**: Updated medicine object

### DELETE /medicines/:id
Delete medicine (pharmacy only)
- **Returns**: `{ message, id }`

---

## Bills Endpoints

### GET /bills
List all bills
- **Returns**: Array of bill objects with patient names

### GET /bills/:id
Get bill by ID
- **Returns**: Bill object

### GET /bills/patient/:patientId
Get bills for a patient
- **Returns**: Array of bill objects

### POST /bills
Create bill (accountant only)
- **Body**: `{ patient_id, amount, items }`
- **Returns**: Created bill object

### PUT /bills/:id
Update bill (accountant only)
- **Body**: `{ amount, items }`
- **Returns**: Updated bill object

### DELETE /bills/:id
Delete bill (accountant only)
- **Returns**: `{ message, id }`

---

## Frontend Service Files

The following service files are available in `src/app/components/services/`:

- **authService.tsx** - Authentication functions
- **userService.ts** - User management functions
- **patientService.ts** - Patient management functions
- **appointmentService.ts** - Appointment functions
- **prescriptionService.ts** - Prescription functions
- **labReportService.ts** - Lab report and file upload functions
- **medicineService.ts** - Medicine management functions
- **billingService.ts** - Billing functions

All services use the same base URL and authentication mechanism.

---

## Role-Based Access Control

### Superadmin
- Access to all endpoints

### Doctor (admin_doctor)
- Create/update prescriptions
- View/create appointments
- Upload/view lab reports
- View patient data
- View medicines

### Lab (admin_lab)
- Upload/manage lab reports
- View patient data
- Create appointments
- View medicines

### Pharmacy (admin_pharmacist)
- View prescriptions
- Manage medicines
- View patient data
- Create appointments

### Accountant (admin_accountant)
- View/create/manage bills
- View patient data

### Patient
- View own appointments
- View own prescriptions
- View own lab reports
- Upload documents

### Staff
- Create/manage appointments
- Manage patients
- View patient data

---

## Error Responses

All errors follow this format:
```json
{ "error": "Error message" }
```

Common HTTP status codes:
- 200 OK
- 201 Created
- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found
- 500 Internal Server Error
