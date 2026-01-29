import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Shield, UserCog, Users, AlertCircle } from 'lucide-react';

export default function SuperAdminHome() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-gray-900">Super Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Role assignment and user management</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-gray-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <UserCog className="h-10 w-10 text-gray-700 mb-2" />
            <CardTitle>Role Assignment</CardTitle>
            <CardDescription>Assign internal roles to Admin users</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/superadmin/roles">
              <Button className="w-full">Manage Roles</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-gray-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <Users className="h-10 w-10 text-gray-700 mb-2" />
            <CardTitle>User Management</CardTitle>
            <CardDescription>View and manage system users</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/superadmin/users">
              <Button variant="outline" className="w-full">View Users</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Role Overview */}
      

      {/* Permissions Overview */}
      
    </div>
  );
}