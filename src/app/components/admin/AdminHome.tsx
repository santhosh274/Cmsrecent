import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Pill, Microscope, FileText, Calendar, AlertCircle,IndianRupee, Hospital } from 'lucide-react';

export default function AdminHome() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Full operational access</p>
      </div>

      {/* Portal Branches */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pharmacist Portal */}
        <Card className="border-gray-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <Pill className="h-10 w-10 text-pink-600 mb-2" />
            <CardTitle>Pharmacist Portal</CardTitle>
            <CardDescription>Billing and payment processing</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/admin/pharmacist">
              <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white">
                Open Pharmacist Portal
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Lab Technician Portal */}
        <Card className="border-gray-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <Microscope className="h-10 w-10 text-purple-600 mb-2" />
            <CardTitle>Lab Technician Portal</CardTitle>
            <CardDescription>Upload reports and scans</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/admin/lab">
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                Open Lab Portal
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-gray-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <Hospital className="h-10 w-10 text-blue-600 mb-2" />
            <CardTitle>Doctor Portal</CardTitle>
            <CardDescription>Manage appointments, patient reports & prescriptions</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/doctor">
              <Button className="w-full bg-blue-600 hover:bg-purple-700 text-white">
                Open Doctor Portal
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-gray-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <IndianRupee className="h-10 w-10 text-green-600 mb-2" />
            <CardTitle>Accountant Portal</CardTitle>
            <CardDescription>Secure billing and financial management</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/accountant">
              <Button className="w-full bg-green-600 hover:bg-purple-700 text-white">
                Open Accountant Portal
              </Button>
            </Link>
          </CardContent>
        </Card>
        
      </div>
    </div>
  );
}