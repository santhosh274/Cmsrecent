import { Routes, Route, Navigate } from 'react-router-dom';
import { QrCode, LayoutGrid } from 'lucide-react';
import DashboardLayout from '../shared/DashboardLayout';
import PharmacyScanner from './PharmacyScanner';

interface PharmacyDashboardProps {
  userName: string;
  onLogout: () => void;
}

export default function PharmacyDashboard({ userName, onLogout }: PharmacyDashboardProps) {
  const navigation = [
    { label: 'Scan Prescription', path: '/pharmacy', icon: <QrCode className="h-5 w-5" /> },
  ];

  return (
    <DashboardLayout
      userName={userName}
      userRole="Pharmacist"
      navigation={navigation}
      onLogout={onLogout}
    >
      <Routes>
        <Route path="/" element={<PharmacyScanner />} />
        <Route path="*" element={<Navigate to="/pharmacy" replace />} />
      </Routes>
    </DashboardLayout>
  );
}
