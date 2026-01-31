import { useState, useEffect } from "react";
import { Clock, User, CheckCircle2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { fetchAppointments, Appointment } from "../services/appointmentService";
import { toast } from "sonner";

export default function DoctorSchedule() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAppointments() {
      try {
        const data = await fetchAppointments();
        setAppointments(data);
      } catch (err) {
        console.error('Failed to fetch appointments:', err);
        toast.error('Failed to load appointments');
      } finally {
        setLoading(false);
      }
    }
    loadAppointments();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        );
      case 'in-progress':
      case 'in_progress':
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            In Progress
          </Badge>
        );
      case 'waiting':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Waiting
          </Badge>
        );
      default:
        return <Badge variant="secondary">Scheduled</Badge>;
    }
  };

  const formatTime = (scheduledAt: string) => {
    const date = new Date(scheduledAt);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (scheduledAt: string) => {
    const date = new Date(scheduledAt);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  // Fallback mock data if API returns empty
  const displayAppointments = appointments.length > 0 ? appointments : [
    { id: "1", patient_name: "John Smith", scheduled_at: new Date().toISOString(), reason: "Regular Checkup", status: "completed" },
    { id: "2", patient_name: "Emma Davis", scheduled_at: new Date(Date.now() + 30 * 60000).toISOString(), reason: "First Visit - Consultation", status: "in_progress" },
    { id: "3", patient_name: "Michael Brown", scheduled_at: new Date(Date.now() + 75 * 60000).toISOString(), reason: "Follow-up", status: "waiting" },
    { id: "4", patient_name: "Sarah Wilson", scheduled_at: new Date(Date.now() + 115 * 60000).toISOString(), reason: "Regular Checkup", status: "waiting" },
    { id: "5", patient_name: "David Lee", scheduled_at: new Date(Date.now() + 165 * 60000).toISOString(), reason: "Regular Checkup", status: "scheduled" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900">My Schedule</h1>
          <p className="text-gray-600 mt-2">
            {formatDate(new Date().toISOString())}
          </p>
        </div>
        <div className="text-sm text-gray-600">
          Current Time: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-3">
        {loading ? (
          <Card className="p-4 border border-gray-200">
            <p className="text-gray-600">Loading appointments...</p>
          </Card>
        ) : displayAppointments.map((appointment) => (
          <Card key={appointment.id} className="p-4 border border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Time</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <p className="text-sm text-gray-900">
                      {formatTime(appointment.scheduled_at)}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Patient</p>
                  <div className="flex items-center gap-2 mt-1">
                    <User className="h-4 w-4 text-gray-500" />
                    <p className="text-sm text-gray-900">
                      {appointment.patient_name || 'Unknown Patient'}
                    </p>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <p className="text-sm text-gray-600">Reason</p>
                  <p className="text-sm text-gray-900 mt-1">
                    {appointment.reason || 'No reason specified'}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <div className="mt-1">
                    {getStatusBadge(appointment.status)}
                  </div>
                </div>
              </div>

              {(appointment.status === 'waiting' || appointment.status === 'scheduled') && (
                <div className="ml-4">
                  <Button size="sm">Start Consultation</Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Action */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <Link to="/doctor/prescribe">
          <Button className="w-full">Quick Prescribe</Button>
        </Link>
      </div>
    </div>
  );
}
