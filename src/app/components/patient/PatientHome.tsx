import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, FileText, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import FamilyMemberSelector from './FamilyMemberSelector';

export default function PatientHome() {
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

  const handleMemberChange = (memberId: string | null) => {
    setSelectedMemberId(memberId);
    // In real app, this would fetch data for the selected family member
  };

  return (
    <div className="space-y-8">
      {/* Header with Family Member Selector */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl text-gray-900">Patient Portal</h1>
        </div>
        <FamilyMemberSelector onMemberChange={handleMemberChange} />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-gray-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <Calendar className="h-10 w-10 text-gray-700 mb-2" />
            <CardTitle>Book Appointment</CardTitle>
          </CardHeader>
          <CardContent>
            <Link to="/patient/book">
              <Button className="w-full">Book Now</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-gray-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <Activity className="h-10 w-10 text-gray-700 mb-2" />
            <CardTitle>Appointment Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Link to="/patient/status">
              <Button variant="outline" className="w-full">Check Status</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-gray-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <FileText className="h-10 w-10 text-gray-700 mb-2" />
            <CardTitle>My Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <Link to="/patient/reports">
              <Button variant="outline" className="w-full">View Reports</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Appointments */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-900">Dr. Sarah Johnson</p>
                <p className="text-sm text-gray-600">Tomorrow, 10:00 AM - Regular Checkup</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-green-600">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                On time
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-900">Dr. Michael Chen</p>
                <p className="text-sm text-gray-600">Jan 10, 2026, 2:30 PM - First Visit</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                Scheduled
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}