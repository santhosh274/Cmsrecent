import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './components/home/HomePage';
import LoginScreen from './components/auth/LoginScreen';
import ForgotPassword from './components/auth/ForgotPassword';
import NewUserRegistration from './components/patient/NewUserRegistration';
import PatientPortal from './components/patient/PatientPortal';
import StaffDashboard from './components/staff/StaffDashboard';
import DoctorDashboard from './components/doctor/DoctorDashboard';
import LabDashboard from './components/lab/LabDashboard';
import PharmacyDashboard from './components/pharmacy/PharmacyDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import SuperAdminDashboard from './components/superadmin/SuperAdminDashboard';

// Role naming: "admin" = operational access, "superadmin" = role assignment only
export type UserRole = 'patient' | 'doctor' | 'staff' | 'lab' | 'pharmacy' | 'admin' | 'superadmin' | null;

function App() {
  const [currentUser, setCurrentUser] = useState<{ role: UserRole; name: string } | null>(null);

  const handleLogin = (role: UserRole, name: string) => {
    setCurrentUser({ role, name });
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            currentUser ? (
              <Navigate to={`/${currentUser.role}`} replace />
            ) : (
              <HomePage />
            )
          } 
        />
        <Route 
          path="/login" 
          element={
            currentUser ? (
              <Navigate to={`/${currentUser.role}`} replace />
            ) : (
              <LoginScreen onLogin={handleLogin} />
            )
          } 
        />
        <Route 
          path="/forgot-password" 
          element={<ForgotPassword />} 
        />
        <Route 
          path="/register" 
          element={<NewUserRegistration />} 
        />
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
          path="/admin/*" 
          element={
            currentUser?.role === 'admin' ? (
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