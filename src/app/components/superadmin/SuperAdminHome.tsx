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
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            Role Structure
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Super Admin */}
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-purple-900">Super Admin</p>
                  <p className="text-sm text-purple-700 mt-1">Role assignment and user-role mapping only</p>
                </div>
                <div className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  Current Role
                </div>
              </div>
            </div>

            {/* Admin */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div>
                <p className="font-semibold text-blue-900">Admin</p>
                <p className="text-sm text-blue-700 mt-1">Full operational access: Upload reports, billing, appointment management</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Can branch to Pharmacist</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Can branch to Lab Tech</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Upload Reports</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Reschedule Appointments</span>
                </div>
              </div>
            </div>

            {/* Internal Roles */}
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="font-semibold text-gray-900 mb-3">Internal Roles (Assigned to Admin users)</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div className="px-3 py-2 bg-white border border-gray-200 rounded text-sm text-center">
                  Doctor
                </div>
                <div className="px-3 py-2 bg-white border border-gray-200 rounded text-sm text-center">
                  Staff
                </div>
                <div className="px-3 py-2 bg-white border border-gray-200 rounded text-sm text-center">
                  Lab Technician
                </div>
                <div className="px-3 py-2 bg-white border border-gray-200 rounded text-sm text-center">
                  Pharmacist
                </div>
              </div>
            </div>

            {/* Patient */}
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="font-semibold text-green-900">Patient</p>
              <p className="text-sm text-green-700 mt-1">Patient portal access with family member management</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Permissions Overview */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>Super Admin Capabilities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              <span className="text-sm text-green-900">Assign internal roles to Admin users</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              <span className="text-sm text-green-900">View user-role mappings</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              <span className="text-sm text-green-900">Manage system permissions</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
              <span className="text-sm text-red-900">Cannot upload reports</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
              <span className="text-sm text-red-900">Cannot manage billing</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
              <span className="text-sm text-red-900">Cannot reschedule appointments</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}