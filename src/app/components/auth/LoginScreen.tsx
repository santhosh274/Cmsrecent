import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserRole } from '../../App';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Activity, AlertCircle, Lock, Phone, User as UserIcon } from 'lucide-react';
import { toast } from 'sonner';

interface LoginScreenProps {
  onLogin: (role: UserRole, name: string) => void;
}

// Mock user database for demo - phone number based
const mockUsers: Record<string, { phone: string; password: string; name: string }[]> = {
  patient: [
    { phone: '9876543210', password: 'demo123', name: 'John Patient' }
  ],
  admin: [
    { phone: '9876543215', password: 'admin123', name: 'Admin User' }
  ],
  superadmin: [
    { phone: '9999999999', password: 'super123', name: 'Super Admin' }
  ],
  // Internal roles (not in login UI, but kept for system use)
  doctor: [
    { phone: '9876543211', password: 'demo123', name: 'Dr. Sarah Smith' }
  ],
  staff: [
    { phone: '9876543212', password: 'demo123', name: 'Mary Reception' }
  ],
  lab: [
    { phone: '9876543213', password: 'demo123', name: 'Lab Tech' }
  ],
  pharmacy: [
    { phone: '9876543214', password: 'demo123', name: 'Pharmacist' }
  ],
};

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const roleHelperText: Record<string, string> = {
    patient: 'Access patient portal, book appointments, view reports and e-prescriptions',
    admin: 'Full operational access: Upload reports, billing, appointment management',
    superadmin: 'Role assignment and user-role mapping only',
  };

  const validatePhone = (value: string): boolean => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(value);
  };

  const isFormValid = (): boolean => {
    return (
      selectedRole !== '' &&
      phoneNumber.trim() !== '' &&
      password.trim() !== '' &&
      validatePhone(phoneNumber)
    );
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedRole) {
      toast.error('Please select a role to continue');
      return;
    }

    if (!isFormValid()) {
      toast.error('Please fill in all fields correctly');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const users = mockUsers[selectedRole];
      const user = users?.find(
        (u) => u.phone === phoneNumber && u.password === password
      );

      if (user) {
        toast.success(`Welcome back, ${user.name}!`);
        onLogin(selectedRole as UserRole, user.name);
      } else {
        toast.error('Invalid credentials. Please check your phone number and password.');
      }

      setIsLoading(false);
    }, 1000);
  };

  const handleQuickLogin = (role: string, name: string) => {
    toast.success(`Welcome back, ${name}!`);
    onLogin(role as UserRole, name);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
              <Activity className="w-10 h-10 text-white" />
            </div>
          </Link>
          <h1 className="text-3xl text-gray-900">HealthCare CMS</h1>
          <p className="text-sm text-gray-600">Secure role-based access to healthcare services</p>
        </div>

        {/* Login Form */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Select your role and enter credentials</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Role Selection - MANDATORY - Only 3 roles */}
              <div className="space-y-2">
                <Label htmlFor="role" className="flex items-center gap-2">
                  <UserIcon className="w-4 h-4" />
                  Login As <span className="text-red-500">*</span>
                </Label>
                <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value)}>
                  <SelectTrigger id="role" className={!selectedRole ? 'text-gray-400' : ''}>
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="superadmin">Super Admin</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="patient">Patient</SelectItem>
                  </SelectContent>
                </Select>
                
                {/* Role-specific helper text removed for clarity */}
              </div>

              {/* Phone Number Only */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Mobile Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  disabled={!selectedRole}
                  className={!selectedRole ? 'bg-gray-100 cursor-not-allowed' : ''}
                  maxLength={10}
                />
                {phoneNumber && !validatePhone(phoneNumber) && (
                  <p className="text-xs text-red-600">Please enter a valid 10-digit mobile number</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Password
                  </Label>
                  <Link 
                    to={`/forgot-password${selectedRole ? `?role=${selectedRole}` : ''}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={!selectedRole}
                  className={!selectedRole ? 'bg-gray-100 cursor-not-allowed' : ''}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={!isFormValid() || isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>

              {/* Demo credentials hint */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-900">
                <p className="font-medium mb-1">Demo Credentials:</p>
                <p>Phone: {selectedRole === 'patient' ? '9876543210' : selectedRole === 'admin' ? '9876543215' : selectedRole === 'superadmin' ? '9999999999' : 'Select role first'}</p>
                <p>Password: {selectedRole === 'admin' || selectedRole === 'superadmin' ? selectedRole === 'superadmin' ? 'super123' : 'admin123' : 'demo123'}</p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Quick Access for Demo */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-base">Quick Access (Demo)</CardTitle>
            <CardDescription>Click a role to explore the system instantly</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-3">
            <Button
              variant="outline"
              onClick={() => handleQuickLogin('superadmin', 'Super Admin')}
              className="justify-start"
            >
              Super Admin
            </Button>
            <Button
              variant="outline"
              onClick={() => handleQuickLogin('admin', 'Admin User')}
              className="justify-start"
            >
              Admin
            </Button>
            <Button
              variant="outline"
              onClick={() => handleQuickLogin('patient', 'John Patient')}
              className="justify-start"
            >
              Patient
            </Button>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center">
          <Link to="/" className="text-sm text-gray-600 hover:text-blue-600">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}