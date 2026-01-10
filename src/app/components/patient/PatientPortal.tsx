import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Calendar, FileText, Activity, Home, User, Pill, FolderOpen } from 'lucide-react';
import DashboardLayout from '../shared/DashboardLayout';
import PatientHome from './PatientHome';
import EnhancedAppointmentBooking from './EnhancedAppointmentBooking';
import AppointmentStatus from './AppointmentStatus';
import ReportDownload from './ReportDownload';
import PatientProfile from './PatientProfile';
import MyPrescriptions from './MyPrescriptions';
import PatientDocuments from './PatientDocuments';
import ForcePasswordChange from './ForcePasswordChange';

interface PatientPortalProps {
  userName: string;
  onLogout: () => void;
  isFirstLogin?: boolean;
}

export default function PatientPortal({ userName, onLogout, isFirstLogin = true }: PatientPortalProps) {
  const [passwordChanged, setPasswordChanged] = useState(!isFirstLogin);

  const navigation = [
    { label: 'Home', path: '/patient', icon: <Home className="h-5 w-5" /> },
    { label: 'Book Appointment', path: '/patient/book', icon: <Calendar className="h-5 w-5" /> },
    { label: 'Appointment Status', path: '/patient/status', icon: <Activity className="h-5 w-5" /> },
    { label: 'My Documents', path: '/patient/documents', icon: <FolderOpen className="h-5 w-5" /> },
    { label: 'My Reports', path: '/patient/reports', icon: <FileText className="h-5 w-5" /> },
    { label: 'e-Prescriptions', path: '/patient/prescriptions', icon: <Pill className="h-5 w-5" /> },
    { label: 'My Profile', path: '/patient/profile', icon: <User className="h-5 w-5" /> },
  ];

  const handlePasswordChanged = () => {
    setPasswordChanged(true);
  };

  // Force password change on first login
  if (!passwordChanged) {
    return <ForcePasswordChange userName={userName} onPasswordChanged={handlePasswordChanged} />;
  }

  return (
    <DashboardLayout
      userName={userName}
      userRole="Patient"
      navigation={navigation}
      onLogout={onLogout}
    >
      <Routes>
        <Route path="/" element={<PatientHome />} />
        <Route path="/book" element={<EnhancedAppointmentBooking userName={userName} />} />
        <Route path="/status" element={<AppointmentStatus />} />
        <Route path="/documents" element={<PatientDocuments />} />
        <Route path="/reports" element={<ReportDownload />} />
        <Route path="/prescriptions" element={<MyPrescriptions />} />
        <Route path="/profile" element={<PatientProfile />} />
        <Route path="*" element={<Navigate to="/patient" replace />} />
      </Routes>
    </DashboardLayout>
  );
}