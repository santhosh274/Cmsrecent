import { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import { Calendar, Clock, User, Search, GripVertical, CheckCircle } from 'lucide-react';
import BackButton from '../shared/BackButton';
import { toast } from 'sonner';

interface Appointment {
  id: string;
  patientName: string;
  familyMember?: string;
  doctorName: string;
  date: string;
  time: string;
  slotIndex: number;
}

interface TimeSlot {
  index: number;
  time: string;
  available: boolean;
  doctorAvailable: boolean;
}

const ItemType = {
  APPOINTMENT: 'appointment',
};

interface DraggableAppointmentProps {
  appointment: Appointment;
  isRescheduling: boolean;
}

function DraggableAppointment({ appointment, isRescheduling }: DraggableAppointmentProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.APPOINTMENT,
    item: appointment,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: isRescheduling,
  }));

  return (
    <div
      ref={drag}
      className={`
        border border-gray-200 rounded-lg p-3 bg-white
        ${isRescheduling ? 'cursor-grab active:cursor-grabbing hover:shadow-md' : 'cursor-default'}
        ${isDragging ? 'opacity-50 shadow-lg' : ''}
        transition-all duration-200
      `}
    >
      <div className="flex items-start gap-3">
        {isRescheduling && (
          <GripVertical className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <p className="font-medium text-gray-900 truncate">
              {appointment.patientName}
              {appointment.familyMember && (
                <span className="text-sm text-gray-600 ml-2">({appointment.familyMember})</span>
              )}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-600">Dr. {appointment.doctorName}</p>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {appointment.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {appointment.time}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface TimeSlotDropZoneProps {
  slot: TimeSlot;
  appointment: Appointment | null;
  isRescheduling: boolean;
  onDrop: (appointment: Appointment, slotIndex: number) => void;
}

function TimeSlotDropZone({ slot, appointment, isRescheduling, onDrop }: TimeSlotDropZoneProps) {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ItemType.APPOINTMENT,
    drop: (item: Appointment) => onDrop(item, slot.index),
    canDrop: () => isRescheduling && slot.available && slot.doctorAvailable && !appointment,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isInvalid = isRescheduling && (!slot.available || !slot.doctorAvailable || !!appointment);

  return (
    <div
      ref={drop}
      className={`
        min-h-[100px] border-2 rounded-lg p-3
        transition-all duration-200
        ${isRescheduling ? 'border-dashed' : 'border-solid'}
        ${isOver && canDrop ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
        ${isInvalid && isRescheduling ? 'bg-gray-50 cursor-not-allowed' : ''}
        ${!appointment && !isRescheduling ? 'bg-gray-50' : ''}
      `}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-900">{slot.time}</span>
        </div>
        {isRescheduling && (
          <div>
            {slot.available && slot.doctorAvailable && !appointment ? (
              <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                Available
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-red-100 text-red-800 text-xs">
                {!slot.doctorAvailable ? 'Doctor Unavailable' : 'Occupied'}
              </Badge>
            )}
          </div>
        )}
      </div>

      {appointment && (
        <DraggableAppointment appointment={appointment} isRescheduling={isRescheduling} />
      )}

      {!appointment && isRescheduling && canDrop && isOver && (
        <div className="flex items-center justify-center h-16 text-sm text-blue-600">
          Drop here to reschedule
        </div>
      )}
    </div>
  );
}

export default function AppointmentRescheduling() {
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    appointment: Appointment | null;
    oldSlot: number;
    newSlot: number;
  }>({
    open: false,
    appointment: null,
    oldSlot: -1,
    newSlot: -1,
  });

  // Sample time slots
  const timeSlots: TimeSlot[] = [
    { index: 0, time: '09:00 AM', available: true, doctorAvailable: true },
    { index: 1, time: '10:00 AM', available: true, doctorAvailable: true },
    { index: 2, time: '11:00 AM', available: true, doctorAvailable: true },
    { index: 3, time: '12:00 PM', available: true, doctorAvailable: false },
    { index: 4, time: '02:00 PM', available: true, doctorAvailable: true },
    { index: 5, time: '03:00 PM', available: true, doctorAvailable: true },
    { index: 6, time: '04:00 PM', available: true, doctorAvailable: true },
    { index: 7, time: '05:00 PM', available: true, doctorAvailable: true },
  ];

  // Sample appointments
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 'apt1',
      patientName: 'John Patient',
      doctorName: 'Sarah Smith',
      date: '2026-01-10',
      time: '09:00 AM',
      slotIndex: 0,
    },
    {
      id: 'apt2',
      patientName: 'Mike Patient',
      familyMember: 'Lisa (Spouse)',
      doctorName: 'Sarah Smith',
      date: '2026-01-10',
      time: '10:00 AM',
      slotIndex: 1,
    },
    {
      id: 'apt3',
      patientName: 'Sarah Patient',
      doctorName: 'Sarah Smith',
      date: '2026-01-10',
      time: '02:00 PM',
      slotIndex: 4,
    },
  ]);

  const handleDrop = (appointment: Appointment, newSlotIndex: number) => {
    // Show confirmation dialog
    setConfirmDialog({
      open: true,
      appointment,
      oldSlot: appointment.slotIndex,
      newSlot: newSlotIndex,
    });
  };

  const confirmReschedule = () => {
    if (!confirmDialog.appointment) return;

    const newSlot = timeSlots.find((s) => s.index === confirmDialog.newSlot);
    if (!newSlot) return;

    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === confirmDialog.appointment!.id
          ? { ...apt, slotIndex: confirmDialog.newSlot, time: newSlot.time }
          : apt
      )
    );

    toast.success('Appointment rescheduled successfully', {
      icon: <CheckCircle className="w-4 h-4 text-green-600" />,
    });

    setConfirmDialog({ open: false, appointment: null, oldSlot: -1, newSlot: -1 });
  };

  const cancelReschedule = () => {
    setConfirmDialog({ open: false, appointment: null, oldSlot: -1, newSlot: -1 });
  };

  const filteredAppointments = appointments.filter(
    (apt) =>
      apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAppointmentForSlot = (slotIndex: number) => {
    return filteredAppointments.find((apt) => apt.slotIndex === slotIndex) || null;
  };

  const oldSlotTime = timeSlots.find((s) => s.index === confirmDialog.oldSlot)?.time;
  const newSlotTime = timeSlots.find((s) => s.index === confirmDialog.newSlot)?.time;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <BackButton to="/admin" />
          <h1 className="text-3xl text-gray-900 mt-4">Appointment Rescheduling</h1>
        </div>

        {/* Controls */}
        <Card className="border-gray-200">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              {/* Search */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search by patient or doctor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Reschedule Mode Toggle */}
              <Button
                onClick={() => setIsRescheduling(!isRescheduling)}
                variant={isRescheduling ? 'default' : 'outline'}
                className={isRescheduling ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}
              >
                {isRescheduling ? 'Exit Reschedule Mode' : 'Reschedule Mode'}
              </Button>
            </div>

            {isRescheduling && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>Reschedule Mode Active:</strong> Drag appointments to available time slots to reschedule
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Schedule View */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Today's Schedule - January 10, 2026
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {timeSlots.map((slot) => (
                <TimeSlotDropZone
                  key={slot.index}
                  slot={slot}
                  appointment={getAppointmentForSlot(slot.index)}
                  isRescheduling={isRescheduling}
                  onDrop={handleDrop}
                />
              ))}
            </div>

            {filteredAppointments.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>No appointments found</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Reschedule Confirmation Dialog */}
        <Dialog open={confirmDialog.open} onOpenChange={(open) => !open && cancelReschedule()}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Reschedule Appointment?</DialogTitle>
              <DialogDescription>Confirm the appointment reschedule details below</DialogDescription>
            </DialogHeader>

            {confirmDialog.appointment && (
              <div className="space-y-4 py-4">
                {/* Patient Info */}
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <User className="w-4 h-4 text-blue-600" />
                    <p className="font-medium text-gray-900">{confirmDialog.appointment.patientName}</p>
                  </div>
                  {confirmDialog.appointment.familyMember && (
                    <p className="text-sm text-gray-600 ml-6">
                      For: {confirmDialog.appointment.familyMember}
                    </p>
                  )}
                  <p className="text-sm text-gray-600 ml-6">Dr. {confirmDialog.appointment.doctorName}</p>
                </div>

                {/* Time Change */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-xs text-red-600 mb-1">Current Time</p>
                      <p className="font-medium text-red-900">{oldSlotTime}</p>
                    </div>
                    <div className="text-gray-400">→</div>
                    <div className="flex-1 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-xs text-green-600 mb-1">New Time</p>
                      <p className="font-medium text-green-900">{newSlotTime}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Date: {confirmDialog.appointment.date}
                  </p>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={cancelReschedule}>
                Cancel
              </Button>
              <Button
                onClick={confirmReschedule}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Confirm Reschedule
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Legend */}
        {isRescheduling && (
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-base">Legend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Available
                  </Badge>
                  <span className="text-sm text-gray-600">Can drop here</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-red-100 text-red-800">
                    Occupied
                  </Badge>
                  <span className="text-sm text-gray-600">Slot taken</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-red-100 text-red-800">
                    Doctor Unavailable
                  </Badge>
                  <span className="text-sm text-gray-600">Invalid slot</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DndProvider>
  );
}
