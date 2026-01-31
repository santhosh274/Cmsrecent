import { Routes, Route, Navigate } from 'react-router-dom';
import { Shield, Users } from 'lucide-react';
import DashboardLayout from '../shared/DashboardLayout';
import SuperAdminHome from './SuperAdminHome';
import RoleManagement from '../admin/RoleManagement'; // Updated import

interface SuperAdminDashboardProps {
  userName: string;
  onLogout: () => void;
}

export default function SuperAdminDashboard({ userName, onLogout }: SuperAdminDashboardProps) {
  const navigation = [
    { label: 'Dashboard', path: '/superadmin', icon: <Shield className="h-5 w-5" /> },
    { label: 'User Management', path: '/superadmin/users', icon: <Users className="h-5 w-5" /> },
  ];

  return (
    <DashboardLayout
      userName={userName}
      userRole="Super Admin"
      navigation={navigation}
      onLogout={onLogout}
    >
      <Routes>
        <Route path="/" element={<SuperAdminHome />} />
        {/* Both paths now lead to the full Management component */}
        <Route path="/roles" element={<RoleManagement />} />
        <Route path="/users" element={<RoleManagement />} />
        <Route path="*" element={<Navigate to="/superadmin" replace />} />
      </Routes>
    </DashboardLayout>
  );
}