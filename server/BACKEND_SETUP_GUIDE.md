# CMS Backend Setup Guide

## Overview

This document provides a complete guide to the CMS (Clinic Management System) backend, including database setup, API endpoints, and integration with the frontend.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Database Setup](#database-setup)
3. [Server Configuration](#server-configuration)
4. [API Endpoints](#api-endpoints)
5. [Authentication](#authentication)
6. [Role-Based Access Control](#role-based-access-control)
7. [Testing](#testing)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software

- **Node.js** (v18 or higher)
- **PostgreSQL** (v12 or higher)
- **npm** or **yarn**

### Required Node.js Packages

```json
{
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.6",
    "dotenv": "^17.2.3",
    "express": "^5.2.1",
    "jsonwebtoken": "^9.0.3",
    "multer": "^1.4.5-lts.1",
    "pg": "^8.17.2",
    "uuid": "^9.0.1"
  }
}
```

---

## Database Setup

### 1. Create PostgreSQL Database

```sql
-- Create database
CREATE DATABASE cms_db;

-- Connect to the database
\c cms_db
```

### 2. Run Schema Setup

The schema is defined in [`schema.sql`](schema.sql). Run the setup script:

```bash
cd server
node setup-db.js
```

This will create the following tables:

| Table | Description |
|--------|-------------|
| `users` | User accounts with authentication |
| `patients` | Patient information |
| `patient_family_members` | Patient family relationships |
| `appointments` | Appointment scheduling |
| `prescriptions` | Medical prescriptions |
| `bills` | Billing and payments |
| `lab_reports` | Laboratory test reports |
| `medicines` | Pharmacy inventory |

### 3. Seed Test Data

Populate the database with test users and data:

```bash
cd server
node seed-data.js
```

This creates:
- 6 test users (superadmin, doctor, lab tech, pharmacist, accountant, staff)
- 6 test patients
- Sample appointments, prescriptions, lab reports, medicines, and bills

### 4. Verify Tables

List all tables to verify setup:

```bash
cd server
node list-tables.js
```

Expected output:
```
Tables in database:
  - appointments
  - bill_items
  - bills
  - lab_reports
  - medicines
  - patient_family_members
  - patients
  - prescriptions
  - users
```

---

## Server Configuration

### Environment Variables

Create a `.env` file in the `server/` directory:

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=cms_db
DB_PASS=test
DB_PORT=5432
VITE_API_URL=http://localhost:5000
JWT_SECRET=your-secret-key-here
```

### Start the Server

```bash
cd server
npm install
npm start
```

For development with auto-reload:

```bash
npm run dev
```

The server will start on `http://localhost:5000`

---

## API Endpoints

### Base URL

```
http://localhost:5000/api
```

### Authentication

All endpoints (except `/auth/login` and `/auth/register`) require:

```
Authorization: Bearer {JWT_TOKEN}
```

### Endpoint Summary

#### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|---------|-----------|-------------|----------------|
| POST | `/auth/login` | User login | No |
| POST | `/auth/register` | Register new user | No |

#### User Management

| Method | Endpoint | Description | Roles |
|---------|-----------|-------------|--------|
| GET | `/users` | List all users | superadmin |
| GET | `/users/:id` | Get user by ID | superadmin |
| POST | `/users` | Create new user | superadmin |
| PUT | `/users/:id` | Update user | superadmin |
| DELETE | `/users/:id` | Soft delete user | superadmin |

#### Patient Management

| Method | Endpoint | Description | Roles |
|---------|-----------|-------------|--------|
| GET | `/patients` | List all patients | All roles |
| GET | `/patients/:id` | Get patient details | All roles |
| POST | `/patients` | Create patient | doctor, staff, lab, pharmacy, superadmin |
| PUT | `/patients/:id` | Update patient | doctor, staff, lab, pharmacy, superadmin |
| DELETE | `/patients/:id` | Delete patient | staff, superadmin |
| GET | `/patients/:patientId/family-members` | Get family members | All roles |
| POST | `/patients/:patientId/family-members` | Add family member | doctor, staff, patient, superadmin |
| DELETE | `/patients/:patientId/family-members/:memberId` | Delete family member | doctor, staff, patient, superadmin |

#### Appointment Management

| Method | Endpoint | Description | Roles |
|---------|-----------|-------------|--------|
| GET | `/appointments` | List all appointments | doctor, staff, superadmin, patient |
| GET | `/appointments/:id` | Get appointment by ID | All authenticated |
| GET | `/appointments/patient/:patientId` | Get patient appointments | All authenticated |
| GET | `/appointments/doctor/:doctorId` | Get doctor appointments | All authenticated |
| POST | `/appointments` | Create appointment | doctor, staff, patient, superadmin |
| PUT | `/appointments/:id` | Update appointment | doctor, staff, superadmin |
| DELETE | `/appointments/:id` | Delete appointment | staff, superadmin |

#### Prescription Management

| Method | Endpoint | Description | Roles |
|---------|-----------|-------------|--------|
| GET | `/prescriptions` | List all prescriptions | doctor, pharmacy, patient, superadmin |
| GET | `/prescriptions/:id` | Get prescription by ID | All authenticated |
| GET | `/prescriptions/patient/:patientId` | Get patient prescriptions | All authenticated |
| GET | `/prescriptions/doctor/:doctorId` | Get doctor prescriptions | All authenticated |
| POST | `/prescriptions` | Create prescription | doctor, superadmin |
| PUT | `/prescriptions/:id` | Update prescription | doctor, superadmin |
| DELETE | `/prescriptions/:id` | Delete prescription | doctor, superadmin |

#### Lab Reports

| Method | Endpoint | Description | Roles |
|---------|-----------|-------------|--------|
| GET | `/lab-reports` | List all lab reports | lab, doctor, pharmacy, superadmin |
| GET | `/lab-reports/:id` | Get lab report by ID | All authenticated |
| GET | `/lab-reports/patient/:patientId` | Get patient lab reports | All authenticated |
| POST | `/lab-reports` | Create lab report metadata | lab, doctor, superadmin |
| PUT | `/lab-reports/:id` | Update lab report | lab, doctor, superadmin |
| DELETE | `/lab-reports/:id` | Delete lab report | lab, superadmin |

#### File Upload

| Method | Endpoint | Description | Roles |
|---------|-----------|-------------|--------|
| POST | `/files/upload` | Upload file (multipart/form-data) | lab, doctor, patient, superadmin |
| GET | `/files/:filename` | Download file | All authenticated |
| GET | `/files/info/:id` | Get file metadata | All authenticated |
| DELETE | `/files/:id` | Delete file | lab, superadmin |

#### Medicines

| Method | Endpoint | Description | Roles |
|---------|-----------|-------------|--------|
| GET | `/medicines` | List all medicines | pharmacy, doctor, superadmin |
| GET | `/medicines/:id` | Get medicine by ID | pharmacy, doctor, superadmin |
| POST | `/medicines` | Add medicine | pharmacy, superadmin |
| PUT | `/medicines/:id` | Update medicine | pharmacy, superadmin |
| DELETE | `/medicines/:id` | Delete medicine | pharmacy, superadmin |

#### Billing

| Method | Endpoint | Description | Roles |
|---------|-----------|-------------|--------|
| GET | `/bills` | List all bills | accountant, superadmin, patient |
| GET | `/bills/:id` | Get bill by ID | All authenticated |
| GET | `/bills/patient/:patientId` | Get patient bills | All authenticated |
| POST | `/bills` | Create bill | accountant, superadmin |
| PUT | `/bills/:id` | Update bill | accountant, superadmin |
| DELETE | `/bills/:id` | Delete bill | accountant, superadmin |

#### Health Check

| Method | Endpoint | Description |
|---------|-----------|-------------|
| GET | `/health` | Check server and database status |

---

## Authentication

### Login Flow

1. **Request:**
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "superadmin@test.com",
  "password": "password123"
}
```

2. **Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "id": "user-uuid",
  "name": "Admin User",
  "email": "superadmin@test.com",
  "role": "superadmin"
}
```

3. **Use Token:**
```bash
GET /api/patients
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

### Token Storage

The frontend stores the JWT token in `localStorage`:

```typescript
// Set token
localStorage.setItem('auth_token', token);

// Get token
const token = localStorage.getItem('auth_token');

// Clear token
localStorage.removeItem('auth_token');
```

---

## Role-Based Access Control

### Database Roles

| Database Role | Frontend Role | Dashboard |
|---------------|----------------|------------|
| `superadmin` | `superadmin` | Super Admin Dashboard |
| `admin_doctor` | `doctor` | Doctor Dashboard |
| `admin_lab` | `lab` | Lab Dashboard |
| `admin_pharmacist` | `pharmacy` | Pharmacy Dashboard |
| `admin_accountant` | `accountant` | Accountant Dashboard |
| `patient` | `patient` | Patient Portal |
| `staff` | `staff` | Staff Dashboard |

### Role Permissions

#### Superadmin
- Full access to all endpoints
- User management (create, update, delete users)
- View all data across all modules

#### Doctor
- Create/update prescriptions
- View/create appointments
- Upload/view lab reports
- View patient data
- View medicines

#### Lab Technician
- Upload/manage lab reports
- View patient data
- Create appointments
- View medicines

#### Pharmacist
- View prescriptions
- Manage medicines (CRUD)
- View patient data
- Create appointments

#### Accountant
- View/create/manage bills
- View patient data

#### Patient
- View own appointments
- View own prescriptions
- View own lab reports
- Upload documents

#### Staff
- Create/manage appointments
- Manage patients
- View patient data

---

## Testing

### Automated Testing

Run the automated API test script:

```bash
cd server
node test-api.js
```

This tests:
1. Health check
2. Login
3. Get users
4. Get patients
5. Get appointments
6. Get prescriptions
7. Get lab reports
8. Get medicines
9. Get bills

### Manual Testing with curl

#### Health Check
```bash
curl http://localhost:5000/api/health
```

#### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"superadmin@test.com","password":"password123"}'
```

#### Get Patients (with token)
```bash
curl http://localhost:5000/api/patients \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Troubleshooting

### Common Issues

#### 1. Database Connection Error

**Error:** `connection refused` or `database does not exist`

**Solution:**
- Verify PostgreSQL is running
- Check database name in `.env`
- Ensure database exists: `CREATE DATABASE cms_db;`

#### 2. Tables Not Found

**Error:** `relation "appointments" does not exist`

**Solution:**
```bash
cd server
node setup-db.js
```

#### 3. Authentication Failed

**Error:** `Invalid or expired token`

**Solution:**
- Check JWT_SECRET in `.env` matches between server restarts
- Token expires after 24 hours - re-login required
- Verify token format: `Bearer <token>`

#### 4. Permission Denied

**Error:** `403 Forbidden`

**Solution:**
- Check user role has permission for the endpoint
- Verify role mapping in [`middleware/auth.js`](middleware/auth.js)

#### 5. File Upload Failed

**Error:** `Invalid file type` or `File too large`

**Solution:**
- Allowed types: `.pdf`, `.doc`, `.docx`, `.jpg`, `.jpeg`, `.png`, `.gif`
- Max file size: 10MB
- Check [`routes/files.js`](routes/files.js) for configuration

### Debug Mode

Enable detailed logging by setting:

```env
NODE_ENV=development
```

This will log:
- All SQL queries
- Request/response details
- Authentication attempts

### Check Database Schema

Verify table structure:

```bash
cd server
node check-all-schemas.js
```

---

## Test Credentials

After running `seed-data.js`, use these credentials:

| Role | Email | Password |
|-------|--------|----------|
| Superadmin | superadmin@test.com | password123 |
| Doctor | doctor@test.com | password123 |
| Lab Tech | labtech@test.com | password123 |
| Pharmacist | pharmacist@test.com | password123 |
| Accountant | accountant@test.com | password123 |
| Staff | staff@test.com | password123 |

---

## Frontend Integration

### Service Files

The frontend uses TypeScript service files in `src/app/components/services/`:

- [`authService.tsx`](../src/app/components/services/authService.tsx) - Authentication
- [`userService.ts`](../src/app/components/services/userService.ts) - User management
- [`patientService.ts`](../src/app/components/services/patientService.ts) - Patient management
- [`appointmentService.ts`](../src/app/components/services/appointmentService.ts) - Appointments
- [`prescriptionService.ts`](../src/app/components/services/prescriptionService.ts) - Prescriptions
- [`labReportService.ts`](../src/app/components/services/labReportService.ts) - Lab reports
- [`medicineService.ts`](../src/app/components/services/medicineService.ts) - Medicines
- [`billingService.ts`](../src/app/components/services/billingService.ts) - Billing

All services:
- Use `fetch` API
- Include JWT token in Authorization header
- Handle errors consistently
- Provide TypeScript interfaces for type safety

### API Base URL

Configure in `.env`:

```env
VITE_API_URL=http://localhost:5000
```

---

## File Structure

```
server/
├── .env                    # Environment variables
├── db.js                    # Database connection and utilities
├── index.js                 # Main server file
├── schema.sql               # Database schema
├── seed-data.js            # Test data seeding
├── setup-db.js             # Database setup script
├── middleware/
│   └── auth.js            # Authentication middleware
├── routes/
│   ├── auth.js            # Authentication routes
│   ├── users.js           # User management
│   ├── patients.js        # Patient management
│   ├── appointments.js    # Appointment management
│   ├── prescriptions.js   # Prescription management
│   ├── billing.js        # Billing management
│   ├── labReports.js     # Lab report management
│   ├── medicines.js      # Medicine management
│   └── files.js          # File upload/download
├── uploads/                # Uploaded files directory
└── package.json            # Dependencies
```

---

## Security Considerations

1. **Password Hashing:** All passwords are hashed using bcrypt
2. **JWT Tokens:** Tokens expire after 24 hours
3. **Role-Based Access:** All endpoints protected by role checks
4. **SQL Injection:** Parameterized queries prevent SQL injection
5. **File Upload:** File type and size restrictions
6. **CORS:** Configured for frontend-backend communication

---

## Performance Optimization

1. **Connection Pooling:** PostgreSQL connection pool configured
2. **Query Logging:** Query execution time logged for monitoring
3. **JSONB Fields:** Flexible JSON storage for metadata
4. **Indexes:** Primary keys and foreign keys indexed

---

## Next Steps

1. **Production Deployment:**
   - Change JWT_SECRET to a strong random value
   - Use environment-specific database credentials
   - Enable SSL for database connections
   - Set up proper logging and monitoring

2. **Additional Features:**
   - Email notifications for appointments
   - SMS reminders
   - Payment gateway integration
   - Advanced reporting and analytics

---

## Support

For issues or questions:
1. Check server logs in `server/server.log`
2. Review this documentation
3. Check API endpoints in [`API_ENDPOINTS_COMPLETE.md`](API_ENDPOINTS_COMPLETE.md)

---

**Last Updated:** 2025-01-31
**Version:** 1.0.0
