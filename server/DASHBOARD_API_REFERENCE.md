# Dashboard API Reference

Quick reference for API endpoints used by each dashboard.

## Superadmin Dashboard

### User Management
```typescript
// Get all users
GET /api/users
Authorization: Bearer {token}

// Create user
POST /api/users
{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "admin_doctor",
  "password": "password123"
}

// Update user
PUT /api/users/:id
{
  "name": "John Updated",
  "email": "john.updated@example.com",
  "role": "admin_doctor",
  "status": "active"
}

// Delete user (soft delete)
DELETE /api/users/:id
```

### Full Access
- All patient endpoints
- All appointment endpoints
- All prescription endpoints
- All lab report endpoints
- All medicine endpoints
- All billing endpoints

---

## Doctor Dashboard

### Appointments
```typescript
// Get my appointments
GET /api/appointments/doctor/{doctorId}

// Create appointment
POST /api/appointments
{
  "patient_id": "patient-uuid",
  "doctor_id": "doctor-uuid",
  "scheduled_at": "2025-02-01T10:00:00Z",
  "reason": "Regular checkup",
  "status": "scheduled"
}

// Update appointment
PUT /api/appointments/:id
{
  "scheduled_at": "2025-02-01T11:00:00Z",
  "status": "confirmed"
}
```

### Prescriptions
```typescript
// Get my prescriptions
GET /api/prescriptions/doctor/{doctorId}

// Create prescription
POST /api/prescriptions
{
  "patient_id": "patient-uuid",
  "doctor_id": "doctor-uuid",
  "medicines": [
    {
      "name": "Paracetamol",
      "dosage": "500mg",
      "quantity": 30
    }
  ],
  "notes": "Take as needed for pain"
}

// Update prescription
PUT /api/prescriptions/:id
{
  "medicines": [...],
  "notes": "Updated notes"
}
```

### Patient Data
```typescript
// View patient details
GET /api/patients/:id

// View patient appointments
GET /api/patients/:id/appointments

// View patient prescriptions
GET /api/patients/:id/prescriptions

// View patient lab reports
GET /api/patients/:id/lab-reports
```

---

## Lab Dashboard

### Lab Reports
```typescript
// Get all lab reports
GET /api/lab-reports

// Get patient lab reports
GET /api/lab-reports/patient/{patientId}

// Create lab report metadata
POST /api/lab-reports
{
  "patient_id": "patient-uuid",
  "uploaded_by": "lab-tech-uuid",
  "file_name": "blood_test_123.pdf",
  "metadata": {
    "originalName": "Blood Test Report",
    "mimeType": "application/pdf",
    "size": 245000,
    "category": "lab-test"
  }
}

// Update lab report
PUT /api/lab-reports/:id
{
  "file_name": "updated_report.pdf",
  "metadata": {...}
}

// Delete lab report
DELETE /api/lab-reports/:id
```

### File Upload
```typescript
// Upload file
POST /api/files/upload
Content-Type: multipart/form-data
Body:
  - file: (binary)
  - patient_id: "patient-uuid"
  - category: "lab-test"

// Download file
GET /api/files/{filename}

// Get file info
GET /api/files/info/:id

// Delete file
DELETE /api/files/:id
```

### Patient Data
```typescript
// View patient details
GET /api/patients/:id

// Create patient
POST /api/patients
{
  "name": "Jane Doe",
  "phone": "+91 98765 43210",
  "metadata": {
    "age": 30,
    "gender": "F"
  }
}
```

---

## Pharmacy Dashboard

### Medicines
```typescript
// Get all medicines
GET /api/medicines

// Get medicine by ID
GET /api/medicines/:id

// Add medicine
POST /api/medicines
{
  "name": "Paracetamol 500mg",
  "stock": 500,
  "price": 20
}

// Update medicine
PUT /api/medicines/:id
{
  "name": "Paracetamol 500mg",
  "stock": 450,
  "price": 22
}

// Delete medicine
DELETE /api/medicines/:id
```

### Prescriptions
```typescript
// View all prescriptions
GET /api/prescriptions

// View prescription details
GET /api/prescriptions/:id

// View patient prescriptions
GET /api/prescriptions/patient/{patientId}
```

### Patient Data
```typescript
// View patient details
GET /api/patients/:id

// View patient prescriptions
GET /api/patients/:id/prescriptions
```

---

## Accountant Dashboard

### Bills
```typescript
// Get all bills
GET /api/bills

// Get bill by ID
GET /api/bills/:id

// Get patient bills
GET /api/bills/patient/{patientId}

// Create bill
POST /api/bills
{
  "patient_id": "patient-uuid",
  "amount": 1500,
  "items": [
    {
      "description": "Consultation",
      "quantity": 1,
      "price": 500
    },
    {
      "description": "Lab Test",
      "quantity": 1,
      "price": 1000
    }
  ]
}

// Update bill
PUT /api/bills/:id
{
  "amount": 1600,
  "items": [...]
}

// Delete bill
DELETE /api/bills/:id
```

### Patient Data
```typescript
// View patient details
GET /api/patients/:id

// View patient bills
GET /api/patients/:id/bills
```

---

## Patient Portal

### My Appointments
```typescript
// Get my appointments
GET /api/appointments/patient/{patientId}

// Book appointment
POST /api/appointments
{
  "patient_id": "my-patient-id",
  "doctor_id": "doctor-uuid",
  "scheduled_at": "2025-02-01T10:00:00Z",
  "reason": "Regular checkup"
}
```

### My Prescriptions
```typescript
// Get my prescriptions
GET /api/prescriptions/patient/{patientId}

// View prescription details
GET /api/prescriptions/:id
```

### My Lab Reports
```typescript
// Get my lab reports
GET /api/lab-reports/patient/{patientId}

// Download report
GET /api/files/{filename}

// Upload document
POST /api/files/upload
Content-Type: multipart/form-data
Body:
  - file: (binary)
  - patient_id: "my-patient-id"
  - category: "general"
```

### My Bills
```typescript
// Get my bills
GET /api/bills/patient/{patientId}

// View bill details
GET /api/bills/:id
```

### Profile
```typescript
// View my profile
GET /api/patients/:id

// Update profile
PUT /api/patients/:id
{
  "name": "Updated Name",
  "phone": "+91 98765 43211",
  "metadata": {...}
}

// Manage family members
GET /api/patients/:patientId/family-members

POST /api/patients/:patientId/family-members
{
  "name": "Family Member Name",
  "relationship": "Spouse"
}

DELETE /api/patients/:patientId/family-members/:memberId
```

---

## Staff Dashboard

### Patient Management
```typescript
// Get all patients
GET /api/patients

// Create patient
POST /api/patients
{
  "name": "New Patient",
  "phone": "+91 98765 43212",
  "metadata": {...}
}

// Update patient
PUT /api/patients/:id
{
  "name": "Updated Name",
  "phone": "+91 98765 43213"
}

// Delete patient
DELETE /api/patients/:id
```

### Appointment Management
```typescript
// Get all appointments
GET /api/appointments

// Create appointment
POST /api/appointments
{
  "patient_id": "patient-uuid",
  "doctor_id": "doctor-uuid",
  "scheduled_at": "2025-02-01T10:00:00Z",
  "reason": "New appointment"
}

// Update appointment
PUT /api/appointments/:id
{
  "status": "confirmed",
  "scheduled_at": "2025-02-01T11:00:00Z"
}

// Delete appointment
DELETE /api/appointments/:id
```

### Family Members
```typescript
// Get patient family members
GET /api/patients/:patientId/family-members

// Add family member
POST /api/patients/:patientId/family-members
{
  "name": "Family Member",
  "relationship": "Parent"
}

// Delete family member
DELETE /api/patients/:patientId/family-members/:memberId
```

---

## Common Patterns

### Authentication
All requests (except login/register) require:
```typescript
headers: {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
}
```

### Error Handling
All errors follow this format:
```json
{
  "error": "Error message"
}
```

HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

### Pagination
Currently not implemented. All endpoints return full datasets.

### Filtering
Currently not implemented. Filter data client-side.

---

## Role Mapping

| Database Role | Frontend Role | Dashboard |
|---------------|----------------|------------|
| `superadmin` | `superadmin` | Super Admin |
| `admin_doctor` | `doctor` | Doctor |
| `admin_lab` | `lab` | Lab |
| `admin_pharmacist` | `pharmacy` | Pharmacy |
| `admin_accountant` | `accountant` | Accountant |
| `patient` | `patient` | Patient |
| `staff` | `staff` | Staff |

---

## Quick Test Commands

```bash
# Health check
curl http://localhost:5000/api/health

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"superadmin@test.com","password":"password123"}'

# Get patients (replace TOKEN)
curl http://localhost:5000/api/patients \
  -H "Authorization: Bearer TOKEN"
```

---

**Last Updated:** 2025-01-31
