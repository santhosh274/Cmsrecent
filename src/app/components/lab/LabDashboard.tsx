import { Routes, Route, Navigate } from 'react-router-dom';
import { FileUp, LayoutGrid } from 'lucide-react';
import DashboardLayout from '../shared/DashboardLayout';
import UploadReport from './UploadReport';

interface LabDashboardProps {
  userName: string;
  onLogout: () => void;
}

export default function LabDashboard({ userName, onLogout }: LabDashboardProps) {
  const navigation = [
    { label: 'Upload Reports', path: '/lab', icon: <FileUp className="h-5 w-5" /> },
  ];

  return (
    <DashboardLayout
      userName={userName}
      userRole="Lab Technician"
      navigation={navigation}
      onLogout={onLogout}
    >
      <Routes>
        <Route path="/" element={<UploadReport />} />
        <Route path="*" element={<Navigate to="/lab" replace />} />
      </Routes>
    </DashboardLayout>
  );
}
