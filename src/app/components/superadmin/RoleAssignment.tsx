import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { UserCog, Search, Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import BackButton from '../shared/BackButton';

interface UserRoleMapping {
  id: string;
  userName: string;
  phone: string;
  currentRole: string;
  assignedInternalRole?: string;
}

export default function RoleAssignment() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [selectedInternalRole, setSelectedInternalRole] = useState<string>('');
  
  const [users, setUsers] = useState<UserRoleMapping[]>([
    {
      id: '1',
      userName: 'Admin User',
      phone: '9876543215',
      currentRole: 'admin',
      assignedInternalRole: 'doctor',
    },
    {
      id: '2',
      userName: 'Sarah Admin',
      phone: '9876543216',
      currentRole: 'admin',
      assignedInternalRole: 'lab',
    },
    {
      id: '3',
      userName: 'Mike Admin',
      phone: '9876543217',
      currentRole: 'admin',
      assignedInternalRole: 'pharmacy',
    },
  ]);

  const internalRoles = [
    { value: 'doctor', label: 'Doctor' },
    { value: 'staff', label: 'Staff' },
    { value: 'lab', label: 'Lab Technician' },
    { value: 'pharmacy', label: 'Pharmacist' },
  ];

  const handleAssignRole = () => {
    if (!selectedUser || !selectedInternalRole) {
      toast.error('Please select a user and role');
      return;
    }

    setUsers(users.map(user => 
      user.id === selectedUser 
        ? { ...user, assignedInternalRole: selectedInternalRole }
        : user
    ));

    toast.success('Internal role assigned successfully');
    setSelectedUser('');
    setSelectedInternalRole('');
  };

  const handleRemoveRole = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, assignedInternalRole: undefined }
        : user
    ));
    toast.success('Internal role removed');
  };

  const getRoleBadgeColor = (role: string) => {
    const colors: Record<string, string> = {
      doctor: 'bg-blue-100 text-blue-800',
      staff: 'bg-green-100 text-green-800',
      lab: 'bg-purple-100 text-purple-800',
      pharmacy: 'bg-pink-100 text-pink-800',
    };
    return colors[role] || 'bg-gray-100 text-gray-800';
  };

  const filteredUsers = users.filter(user =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <BackButton to="/superadmin" />
        <h1 className="text-3xl text-gray-900 mt-4">Role Assignment</h1>
      </div>

      {/* Assign Role Form */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-blue-600" />
            Assign Internal Role
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Select User */}
            <div className="space-y-2">
              <Label htmlFor="user">Select Admin User</Label>
              <Select value={selectedUser} onValueChange={setSelectedUser}>
                <SelectTrigger id="user">
                  <SelectValue placeholder="Choose user" />
                </SelectTrigger>
                <SelectContent>
                  {users.filter(u => u.currentRole === 'admin').map(user => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.userName} ({user.phone})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Select Internal Role */}
            <div className="space-y-2">
              <Label htmlFor="role">Internal Role</Label>
              <Select value={selectedInternalRole} onValueChange={setSelectedInternalRole}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Choose role" />
                </SelectTrigger>
                <SelectContent>
                  {internalRoles.map(role => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Assign Button */}
            <div className="space-y-2">
              <Label>&nbsp;</Label>
              <Button 
                onClick={handleAssignRole}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={!selectedUser || !selectedInternalRole}
              >
                <UserCog className="w-4 h-4 mr-2" />
                Assign Role
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>User Role Mappings</CardTitle>
          <CardDescription>View and manage assigned internal roles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by name or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* User List */}
            <div className="space-y-3">
              {filteredUsers.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <UserCog className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No users found</p>
                </div>
              ) : (
                filteredUsers.map(user => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <p className="font-medium text-gray-900">{user.userName}</p>
                        <Badge className="bg-blue-100 text-blue-800" variant="secondary">
                          Admin
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <p className="text-sm text-gray-600">{user.phone}</p>
                        {user.assignedInternalRole && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">Internal Role:</span>
                            <Badge 
                              className={getRoleBadgeColor(user.assignedInternalRole)} 
                              variant="secondary"
                            >
                              {internalRoles.find(r => r.value === user.assignedInternalRole)?.label}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {user.assignedInternalRole && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRemoveRole(user.id)}
                          className="hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Role Distribution Stats */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>Role Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {internalRoles.map(role => {
              const count = users.filter(u => u.assignedInternalRole === role.value).length;
              return (
                <div key={role.value} className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="text-sm text-gray-600">{role.label}</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">{count}</p>
                  <p className="text-xs text-gray-500 mt-1">Assigned</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}