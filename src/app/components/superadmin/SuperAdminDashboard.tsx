import { Routes, Route, Navigate } from 'react-router-dom';
import { Shield, Users, UserCog } from 'lucide-react';
import DashboardLayout from '../shared/DashboardLayout';
import SuperAdminHome from './SuperAdminHome';
import RoleAssignment from './RoleAssignment';

interface SuperAdminDashboardProps {
  userName: string;
  onLogout: () => void;
}

export default function SuperAdminDashboard({ userName, onLogout }: SuperAdminDashboardProps) {
  const navigation = [
    { label: 'Dashboard', path: '/superadmin', icon: <Shield className="h-5 w-5" /> },
    { label: 'Role Assignment', path: '/superadmin/roles', icon: <UserCog className="h-5 w-5" /> },
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
        <Route path="/roles" element={<RoleAssignment />} />
        <Route path="/users" element={<RoleAssignment />} />
        <Route path="*" element={<Navigate to="/superadmin" replace />} />
      </Routes>
    </DashboardLayout>
  );
}
