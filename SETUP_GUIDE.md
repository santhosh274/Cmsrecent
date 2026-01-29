# PostgreSQL Authentication Setup Guide

## Overview
This application has been refactored to use PostgreSQL for user authentication. The login system now authenticates users against a PostgreSQL database and routes them to role-based dashboards.

## Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Database Setup

### 1. Create PostgreSQL Database
```sql
CREATE DATABASE your_database_name;
```

### 2. Create Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Insert Test Users
```sql
INSERT INTO users (id, email, password_hash, role, name, created_at) VALUES
(gen_random_uuid(), 'santhoshkumarr.a7@gmail.com', '12345', 'superadmin', 'Santhosh Kumar', '2026-01-29 15:31:04'),
(gen_random_uuid(), 'sriharish1408@gmail.com', '12345', 'admin_doctor', 'Sri Harish', '2026-01-29 15:31:04'),
(gen_random_uuid(), 'balajividhya261984@gmail.com', '12345', 'admin_lab', 'Balaji Vidhya', '2026-01-29 15:31:04'),
(gen_random_uuid(), 'prajeethpraba@gmail.com', '12345', 'admin_accountant', 'Prajeeth Praba', '2026-01-29 15:31:04'),
(gen_random_uuid(), 'hareenevas2005@gmail.com', '12345', 'admin_pharmacist', 'Hareenevas', '2026-01-29 15:31:04'),
(gen_random_uuid(), 'dhanshika16082005@gmail.com', '12345', 'patient', 'Dhanshika', '2026-01-29 15:31:04');
```

## Environment Configuration

### 1. Create `.env` file in the `server` directory
```env
# PostgreSQL Database Configuration
DB_USER=your_db_user
DB_HOST=localhost
DB_NAME=your_database_name
DB_PASS=your_db_password
DB_PORT=5432

# Server Configuration
PORT=5000
NODE_ENV=development
```

### 2. Create `.env` file in the root directory (for frontend)
```env
VITE_API_URL=http://localhost:5000
```

## Installation & Running

### Backend Server Setup
```bash
cd server
npm install
npm start
```

The server will run on `http://localhost:5000`

### Frontend Setup
```bash
# From root directory
npm install
npm run dev
```

The frontend will run on `http://localhost:5173` (or the port Vite assigns)

## Role-Based Access

The system supports the following roles:

| Database Role | Frontend Role | Dashboard Route |
|--------------|---------------|-----------------|
| `superadmin` | `superadmin` | `/superadmin` |
| `admin_doctor` | `doctor` | `/doctor` |
| `admin_lab` | `lab` | `/lab` |
| `admin_pharmacist` | `pharmacy` | `/pharmacy` |
| `admin_accountant` | `accountant` | `/accountant` |
| `patient` | `patient` | `/patient` |

## Login Flow

1. User enters email and password (no role selection needed)
2. System queries PostgreSQL database
3. If credentials match, user is authenticated
4. Role is automatically determined from database
5. User is redirected to their respective dashboard

## Test Credentials

Use the following credentials to test:

- **Super Admin**: `santhoshkumarr.a7@gmail.com` / `12345`
- **Doctor**: `sriharish1408@gmail.com` / `12345`
- **Lab**: `balajividhya261984@gmail.com` / `12345`
- **Accountant**: `prajeethpraba@gmail.com` / `12345`
- **Pharmacy**: `hareenevas2005@gmail.com` / `12345`
- **Patient**: `dhanshika16082005@gmail.com` / `12345`

## API Endpoints

### POST /api/login
Authenticates a user and returns role information.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "role": "doctor",
  "name": "Dr. John Doe",
  "email": "user@example.com",
  "id": "uuid-here"
}
```

### GET /api/health
Checks server and database connection status.

**Response:**
```json
{
  "status": "ok",
  "database": "connected"
}
```

## Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running: `pg_isready`
- Check `.env` file has correct credentials
- Ensure database exists and user has proper permissions

### Login Fails
- Verify user exists in database
- Check password_hash matches (currently plain text for testing)
- Check server logs for errors

### CORS Issues
- Ensure backend server is running
- Check `VITE_API_URL` in frontend `.env` matches backend URL
- Verify CORS is enabled in server/index.js

## Future Enhancements

The codebase is structured to easily integrate PostgreSQL for:
- Patient management
- Appointment scheduling
- Prescription management
- Billing and payments
- Lab reports
- Pharmacy inventory

See `server/API_ENDPOINTS.md` for planned API endpoints.

## Security Notes

⚠️ **Important**: Currently, passwords are stored as plain text for development/testing purposes. For production:
- Implement password hashing (bcrypt, argon2)
- Add JWT tokens for session management
- Implement rate limiting
- Add input validation and sanitization
- Use HTTPS in production

