import { Routes, Route, Navigate } from 'react-router-dom';
import { Calendar, Pill, FileSearch } from 'lucide-react';
import DashboardLayout from '../shared/DashboardLayout';
import DoctorSchedule from './DoctorSchedule';
import PrescriptionFlow from './PrescriptionFlow';
import PatientReports from './PatientReports';
import CreatePrescription from './CreatePrescription';

interface DoctorDashboardProps {
  userName: string;
  onLogout: () => void;
}

export default function DoctorDashboard({
  userName,
  onLogout,
}: DoctorDashboardProps) {

  const navigation = [
    
    {
      label: 'My Schedule',
      path: '/doctor',
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      label: 'Patient Reports',
      path: '/doctor/reports',
      icon: <FileSearch className="h-5 w-5" />,
    },
    {
      label: 'Quick Prescribe',
      path: '/doctor/prescribe',
      icon: <Pill className="h-5 w-5" />,
    },
  ];

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
      {/* /doctor */}
      <Route index element={<DoctorSchedule />} />

      {/* /doctor/prescribe */}
      <Route path="prescribe" element={<PrescriptionFlow />} />

      {/* /doctor/prescription/new */}
      <Route
        path="prescription/new"
        element={
          <CreatePrescription
            patient={mockPatient}
            doctorName={userName}
          />
        }
      />

      {/* /doctor/reports: patient selection */}
      <Route path="reports" element={<PatientReports />} />

      {/* /doctor/reports/:patientId: show reports for selected patient */}
      <Route path="reports/:patientId" element={<PatientReports />} />

      {/* fallback */}
      <Route path="*" element={<Navigate to="/doctor" replace />} />
    </Routes>
  </DashboardLayout>
);
}
