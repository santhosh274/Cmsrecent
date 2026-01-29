import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserRole } from '../../App';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Activity, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { loginApi } from '../services/authService';

interface LoginScreenProps {
  onLogin: (user: { role: UserRole; name: string }) => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isFormValid = (): boolean =>
    email.trim() !== '' &&
    password.trim() !== '' &&
    /^\S+@\S+\.\S+$/.test(email);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) {
      toast.error('Please fill all fields correctly with a valid email');
      return;
    }

    setIsLoading(true);

    try {
      const user = await loginApi(email, password);
      
      // Validate that we got a valid role
      if (!user.role || !user.name) {
        toast.error('Invalid response from server');
        return;
      }

      toast.success(`Welcome back, ${user.name}!`);
      onLogin({ role: user.role as UserRole, name: user.name });
    } catch (err: any) {
      toast.error(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
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
            <CardDescription>Enter your credentials to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            </form>
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
