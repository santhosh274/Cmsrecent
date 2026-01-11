import { Routes, Route, Navigate } from 'react-router-dom';
import { Calendar, Pill, LayoutGrid, FileText, Users } from 'lucide-react';
import DashboardLayout from '../shared/DashboardLayout';
import DoctorSchedule from './DoctorSchedule';
import PrescriptionFlow from './PrescriptionFlow';
import CreatePrescription from './CreatePrescription';

interface DoctorDashboardProps {
  userName: string;
  onLogout: () => void;
}

export default function DoctorDashboard({ userName, onLogout }: DoctorDashboardProps) {
  const navigation = [
    { label: 'My Schedule', path: '/doctor', icon: <Calendar className="h-5 w-5" /> },
    { label: 'Quick Prescribe', path: '/doctor/prescribe', icon: <Pill className="h-5 w-5" /> },
    { label: 'Patients', path: '/doctor/patients', icon: <Users className="h-5 w-5" /> },
    { label: 'Prescription History', path: '/doctor/prescriptions', icon: <FileText className="h-5 w-5" /> },
  ];

  // Mock patient data for demo
  const mockPatient = {
    id: 'PT-2026-001234',
    name: 'John Patient',
    age: 35,
    gender: 'Male',
    contact: '+91 98765 43210',
  };

  return (
    <DashboardLayout
      userName={userName}
      userRole="Doctor"
      navigation={navigation}
      onLogout={onLogout}
    >
      <Routes>
        <Route path="/" element={<DoctorSchedule />} />
        <Route path="/prescribe" element={<PrescriptionFlow />} />
        <Route 
          path="/prescription/new" 
          element={<CreatePrescription patient={mockPatient} doctorName={userName} />} 
        />
        <Route path="*" element={<Navigate to="/doctor" replace />} />
      </Routes>
    </DashboardLayout>
  );
}