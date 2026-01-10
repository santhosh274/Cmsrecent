import { Routes, Route, Navigate } from 'react-router-dom';
import { Calendar, Users, LayoutGrid, FileUp } from 'lucide-react';
import DashboardLayout from '../shared/DashboardLayout';
import SmartQueueCalendar from './SmartQueueCalendar';
import PatientManagement from './PatientManagement';

interface StaffDashboardProps {
  userName: string;
  onLogout: () => void;
}

export default function StaffDashboard({ userName, onLogout }: StaffDashboardProps) {
  const navigation = [
    { label: 'Smart Queue', path: '/staff', icon: <Calendar className="h-5 w-5" /> },
    { label: 'Patients', path: '/staff/patients', icon: <Users className="h-5 w-5" /> },
  ];

  return (
    <DashboardLayout
      userName={userName}
      userRole="Reception Staff"
      navigation={navigation}
      onLogout={onLogout}
    >
      <Routes>
        <Route path="/" element={<SmartQueueCalendar />} />
        <Route path="/patients" element={<PatientManagement />} />
        <Route path="*" element={<Navigate to="/staff" replace />} />
      </Routes>
    </DashboardLayout>
  );
}
