import { useState } from 'react';
import { GripVertical, Clock, User, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';

const appointments = [
  { id: '1', patient: 'John Smith', time: '09:00', duration: 30, type: 'Regular Checkup', doctor: 'Dr. Sarah Johnson', status: 'confirmed' },
  { id: '2', patient: 'Emma Davis', time: '09:30', duration: 45, type: 'First Visit', doctor: 'Dr. Sarah Johnson', status: 'confirmed' },
  { id: '3', patient: 'Michael Brown', time: '10:15', duration: 20, type: 'Follow-up', doctor: 'Dr. Sarah Johnson', status: 'confirmed' },
  { id: '4', patient: 'Sarah Wilson', time: '10:35', duration: 30, type: 'Regular Checkup', doctor: 'Dr. Sarah Johnson', status: 'confirmed' },
];

export default function SmartQueueCalendar() {
  const [selectedAppointment, setSelectedAppointment] = useState<typeof appointments[0] | null>(null);
  const [showMoveDialog, setShowMoveDialog] = useState(false);
  const [newTime, setNewTime] = useState('');

  const handleMoveAppointment = (appointment: typeof appointments[0]) => {
    setSelectedAppointment(appointment);
    setShowMoveDialog(true);
  };

  const confirmMove = () => {
    setShowMoveDialog(false);
    setSelectedAppointment(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900">Smart Queue Calendar</h1>
          <p className="text-gray-600 mt-2">Manage appointments with intelligent scheduling</p>
        </div>
        <div className="text-sm text-gray-600">
          Today: January 4, 2026
        </div>
      </div>

      {/* Doctor Selection */}
      <div className="flex gap-3">
        <Button variant="default">Dr. Sarah Johnson</Button>
        <Button variant="outline">Dr. Michael Chen</Button>
        <Button variant="outline">Dr. Emily Davis</Button>
      </div>

      {/* Calendar View */}
      <Card className="border-gray-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Dr. Sarah Johnson's Schedule</CardTitle>
              <CardDescription>Today's appointments</CardDescription>
            </div>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
              {appointments.length} appointments
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Time Axis View */}
          <div className="space-y-3">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="group relative border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-move"
              >
                <div className="flex items-start gap-4">
                  {/* Drag Handle */}
                  <div className="flex-shrink-0 text-gray-400 group-hover:text-gray-600">
                    <GripVertical className="h-5 w-5" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Time</p>
                      <p className="text-sm text-gray-900">{appointment.time}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Patient</p>
                      <p className="text-sm text-gray-900">{appointment.patient}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Type (Duration)</p>
                      <p className="text-sm text-gray-900">{appointment.type} ({appointment.duration} min)</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <Badge variant="secondary" className="mt-1">
                        {appointment.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex-shrink-0">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleMoveAppointment(appointment)}
                    >
                      Move
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-blue-900">Drag and drop appointments to reschedule</p>
                <p className="text-sm text-blue-700 mt-1">
                  Patients will be automatically notified via WhatsApp when appointments are moved
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Move Appointment Dialog */}
      <Dialog open={showMoveDialog} onOpenChange={setShowMoveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Move Appointment</DialogTitle>
            <DialogDescription>
              Reschedule appointment for {selectedAppointment?.patient}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Current Time</p>
                <p className="text-sm text-gray-900 mt-1">{selectedAppointment?.time}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Duration</p>
                <p className="text-sm text-gray-900 mt-1">{selectedAppointment?.duration} minutes</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-700">New Time</label>
              <div className="grid grid-cols-4 gap-2">
                {['11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'].map((time) => (
                  <button
                    key={time}
                    onClick={() => setNewTime(time)}
                    className={`p-2 text-sm border rounded-lg transition-colors ${
                      newTime === time
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-start gap-2 text-sm">
                <svg className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span className="text-gray-700">
                  Patient will be notified via WhatsApp
                </span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMoveDialog(false)}>
              Cancel
            </Button>
            <Button onClick={confirmMove} disabled={!newTime}>
              Confirm Move
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
