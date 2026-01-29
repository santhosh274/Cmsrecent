import { Routes, Route, Navigate } from 'react-router-dom';
import { LayoutGrid, Pill, Microscope, FileText, Calendar } from 'lucide-react';
import DashboardLayout from '../shared/DashboardLayout';
import AdminHome from './AdminHome';
import PharmacistPortal from './PharmacistPortal';
import LabPortal from './LabPortal';
import AppointmentRescheduling from './AppointmentRescheduling';

interface AdminDashboardProps {
  userName: string;
  onLogout: () => void;
}

export default function AdminDashboard({ userName, onLogout }: AdminDashboardProps) {
  const navigation = [
    { label: 'Dashboard', path: '/admin', icon: <LayoutGrid className="h-5 w-5" /> },
    { label: 'Pharmacist Portal', path: '/admin/pharmacist', icon: <Pill className="h-5 w-5" /> },
    { label: 'Accountant Portal', path: '/accountant', icon: <Pill className="h-5 w-5" /> },
    { label: 'Lab Technician Portal', path: '/admin/lab', icon: <Microscope className="h-5 w-5" /> },
    { label: 'Reschedule Appointments', path: '/admin/appointments', icon: <Calendar className="h-5 w-5" /> },
  ];

  return (
    <DashboardLayout
      userName={userName}
      userRole="Admin"
      navigation={navigation}
      onLogout={onLogout}
    >
      <Routes>
        <Route path="/" element={<AdminHome />} />
        <Route path="/pharmacist/*" element={<PharmacistPortal />} />
        <Route path="/lab/*" element={<LabPortal />} />
        <Route path="/reports" element={<div className="text-gray-600">Report upload coming soon...</div>} />
        <Route path="/appointments" element={<AppointmentRescheduling />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </DashboardLayout>
  );
}