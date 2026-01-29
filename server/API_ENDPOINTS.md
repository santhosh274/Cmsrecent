# API Endpoints Documentation

## Current Endpoints

### Authentication
- `POST /api/login` - User login with email and password
  - Request: `{ email: string, password: string }`
  - Response: `{ role: string, name: string, email: string, id: string }`

### Health Check
- `GET /api/health` - Check server and database connection status
  - Response: `{ status: string, database: string }`

## Future Endpoints (For PostgreSQL Integration)

### User Management
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Patient Management
- `GET /api/patients` - Get all patients
- `GET /api/patients/:id` - Get patient by ID
- `POST /api/patients` - Create new patient
- `PUT /api/patients/:id` - Update patient
- `GET /api/patients/:id/appointments` - Get patient appointments
- `GET /api/patients/:id/prescriptions` - Get patient prescriptions

### Appointment Management
- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/:id` - Get appointment by ID
- `POST /api/appointments` - Create new appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment

### Prescription Management
- `GET /api/prescriptions` - Get all prescriptions
- `GET /api/prescriptions/:id` - Get prescription by ID
- `POST /api/prescriptions` - Create new prescription
- `PUT /api/prescriptions/:id` - Update prescription

### Billing & Payments
- `GET /api/bills` - Get all bills
- `GET /api/bills/:id` - Get bill by ID
- `POST /api/bills` - Create new bill
- `POST /api/payments` - Process payment
- `GET /api/payments/:id` - Get payment details

### Lab Reports
- `GET /api/lab-reports` - Get all lab reports
- `GET /api/lab-reports/:id` - Get lab report by ID
- `POST /api/lab-reports` - Upload lab report
- `PUT /api/lab-reports/:id` - Update lab report

### Pharmacy
- `GET /api/medicines` - Get all medicines
- `GET /api/medicines/:id` - Get medicine by ID
- `POST /api/medicines` - Add medicine
- `PUT /api/medicines/:id` - Update medicine stock

## Role-Based Access

Roles are mapped as follows:
- `superadmin` → Super Admin Dashboard
- `admin_doctor` → Doctor Dashboard
- `admin_lab` → Lab Dashboard
- `admin_pharmacist` → Pharmacy Dashboard
- `admin_accountant` → Accountant Dashboard
- `patient` → Patient Portal

