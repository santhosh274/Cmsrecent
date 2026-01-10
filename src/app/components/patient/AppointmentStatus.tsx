import { Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

const appointments = [
  {
    id: '1',
    doctor: 'Dr. Sarah Johnson',
    specialty: 'General Physician',
    date: 'January 5, 2026',
    time: '10:00 AM',
    visitType: 'Regular Checkup',
    status: 'on-time',
    delay: null,
  },
  {
    id: '2',
    doctor: 'Dr. Michael Chen',
    specialty: 'Cardiologist',
    date: 'January 10, 2026',
    time: '2:30 PM',
    visitType: 'First Visit',
    status: 'scheduled',
    delay: null,
  },
  {
    id: '3',
    doctor: 'Dr. Emily Davis',
    specialty: 'Pediatrician',
    date: 'January 3, 2026',
    time: '11:00 AM',
    visitType: 'Follow-up',
    status: 'delayed',
    delay: '30 minutes',
  },
];

export default function AppointmentStatus() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-gray-900">Appointment Status</h1>
        <p className="text-gray-600 mt-2">Track your upcoming and past appointments</p>
      </div>

      {/* Auto-notification Info */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
            </div>
            <div>
              <p className="text-sm text-blue-900">Auto-Notification Enabled</p>
              <p className="text-sm text-blue-700 mt-1">
                You'll receive WhatsApp notifications if your appointment time changes or if there are any delays
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appointments List */}
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <Card key={appointment.id} className="border-gray-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{appointment.doctor}</CardTitle>
                  <CardDescription>{appointment.specialty}</CardDescription>
                </div>
                {appointment.status === 'on-time' && (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    On Time
                  </Badge>
                )}
                {appointment.status === 'delayed' && (
                  <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-100">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Delayed
                  </Badge>
                )}
                {appointment.status === 'scheduled' && (
                  <Badge variant="secondary">
                    <Clock className="h-3 w-3 mr-1" />
                    Scheduled
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="text-sm text-gray-900 mt-1">{appointment.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Time</p>
                  <p className="text-sm text-gray-900 mt-1">{appointment.time}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Visit Type</p>
                  <p className="text-sm text-gray-900 mt-1">{appointment.visitType}</p>
                </div>
                {appointment.delay && (
                  <div>
                    <p className="text-sm text-gray-600">Delay</p>
                    <p className="text-sm text-red-600 mt-1">{appointment.delay}</p>
                  </div>
                )}
              </div>

              {appointment.status === 'delayed' && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">
                    Your appointment has been delayed. You'll receive a WhatsApp notification with the updated time.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
