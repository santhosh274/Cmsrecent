import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import LoginScreen from './components/auth/LoginScreen';
import ForgotPassword from './components/auth/ForgotPassword';
import NewUserRegistration from './components/patient/NewUserRegistration';
import PatientPortal from './components/patient/PatientPortal';
import StaffDashboard from './components/staff/StaffDashboard';
import DoctorDashboard from './components/doctor/DoctorDashboard';
import LabDashboard from './components/admin/LabPortal';
import PharmacyDashboard from './components/admin/PharmacistPortal';
import AdminDashboard from './components/admin/AdminDashboard';
import SuperAdminDashboard from './components/superadmin/SuperAdminDashboard';
import AccountantDashboard from './components/accountant/AccountantDashboard';

// Role naming
export type UserRole =
  | 'patient'
  | 'doctor'
  | 'staff'
  | 'lab'
  | 'pharmacy'
  | 'admin'
  | 'accountant'
  | 'superadmin'
  | null;

interface CurrentUser {
  role: UserRole;
  name: string;
}
function App() {
  // 1. Initialize from localStorage to prevent /undefined on refresh
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(() => {
    const saved = localStorage.getItem('user_data');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (user: CurrentUser) => {
    // 2. Ensure role exists before setting state
    if (user && user.role) {
      localStorage.setItem('user_data', JSON.stringify(user));
      setCurrentUser(user);
    } else {
      console.error("Login failed: User role is missing", user);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user_data');
    localStorage.removeItem('auth_token');
    setCurrentUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            currentUser?.role ? (
              <Navigate to={`/${currentUser.role}`} replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Auth Routes */}
        <Route
          path="/login"
          element={currentUser ? <Navigate to={`/${currentUser.role}`} replace /> : <LoginScreen onLogin={handleLogin} />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<NewUserRegistration />} />

        {/* Role-based Dashboards */}
        <Route
          path="/patient/*"
          element={
            currentUser?.role === 'patient' ? (
              <PatientPortal userName={currentUser.name} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/staff/*"
          element={
            currentUser?.role === 'staff' ? (
              <StaffDashboard userName={currentUser.name} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/doctor/*"
          element={
            currentUser?.role === 'doctor' || currentUser?.role === 'admin' ? (
              <DoctorDashboard userName={currentUser.name} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/lab/*"
          element={
            currentUser?.role === 'lab' ? (
              <LabDashboard userName={currentUser.name} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/pharmacy/*"
          element={
            currentUser?.role === 'pharmacy' ? (
              <PharmacyDashboard userName={currentUser.name} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/accountant/*"
          element={
            currentUser?.role === 'accountant' || currentUser?.role === 'admin' ? (
              <AccountantDashboard userName={currentUser.name} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/admin/*"
          element={
            currentUser?.role === 'admin' || currentUser?.role === 'superadmin' ? (
              <AdminDashboard userName={currentUser.name} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/superadmin/*"
          element={
            currentUser?.role === 'superadmin' ? (
              <SuperAdminDashboard userName={currentUser.name} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
