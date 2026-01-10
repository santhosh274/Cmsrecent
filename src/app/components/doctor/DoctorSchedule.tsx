import { Clock, User, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const todayAppointments = [
  { id: '1', patient: 'John Smith', time: '09:00', duration: 30, reason: 'Regular Checkup', status: 'completed' },
  { id: '2', patient: 'Emma Davis', time: '09:30', duration: 45, reason: 'First Visit - Consultation', status: 'in-progress' },
  { id: '3', patient: 'Michael Brown', time: '10:15', duration: 20, reason: 'Follow-up', status: 'waiting' },
  { id: '4', patient: 'Sarah Wilson', time: '10:35', duration: 30, reason: 'Regular Checkup', status: 'waiting' },
  { id: '5', patient: 'David Lee', time: '11:05', duration: 30, reason: 'Regular Checkup', status: 'scheduled' },
];

export default function DoctorSchedule() {
  const currentTime = '10:20 AM';
  const isDelayed = true;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900">My Schedule</h1>
          <p className="text-gray-600 mt-2">Today's appointments - January 4, 2026</p>
        </div>
        <div className="text-sm text-gray-600">
          Current Time: {currentTime}
        </div>
      </div>

      {/* Delay Warning */}
      {isDelayed && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-yellow-900">Schedule Running Behind</p>
                <p className="text-sm text-yellow-700 mt-1">
                  You're approximately 15 minutes behind schedule. Affected patients will be notified via WhatsApp automatically.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Today's Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-gray-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl text-gray-900">5</p>
              <p className="text-sm text-gray-600 mt-1">Total Appointments</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl text-green-600">1</p>
              <p className="text-sm text-gray-600 mt-1">Completed</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl text-blue-600">1</p>
              <p className="text-sm text-gray-600 mt-1">In Progress</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl text-gray-600">3</p>
              <p className="text-sm text-gray-600 mt-1">Pending</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Appointments List */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>Today's Appointments</CardTitle>
          <CardDescription>Your scheduled consultations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {todayAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className={`p-4 border rounded-lg ${
                  appointment.status === 'in-progress' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Time</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <p className="text-sm text-gray-900">{appointment.time}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Patient</p>
                      <div className="flex items-center gap-2 mt-1">
                        <User className="h-4 w-4 text-gray-500" />
                        <p className="text-sm text-gray-900">{appointment.patient}</p>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm text-gray-600">Reason</p>
                      <p className="text-sm text-gray-900 mt-1">{appointment.reason}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <div className="mt-1">
                        {appointment.status === 'completed' && (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                        )}
                        {appointment.status === 'in-progress' && (
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                            In Progress
                          </Badge>
                        )}
                        {appointment.status === 'waiting' && (
                          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                            Waiting
                          </Badge>
                        )}
                        {appointment.status === 'scheduled' && (
                          <Badge variant="secondary">Scheduled</Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {appointment.status === 'waiting' && (
                    <div className="ml-4">
                      <Button size="sm">Start Consultation</Button>
                    </div>
                  )}
                </div>

                <div className="mt-3 text-sm text-gray-600">
                  Duration: {appointment.duration} minutes
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <Link to="/doctor/prescribe">
              <Button className="w-full">Quick Prescribe</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
