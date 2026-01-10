import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Calendar } from '../ui/calendar';
import BackButton from '../shared/BackButton';
import Breadcrumbs from '../shared/Breadcrumbs';
import LogoutButton from '../shared/LogoutButton';
import PaymentFlow from '../payment/PaymentFlow';
import { Calendar as CalendarIcon, Clock, User, Stethoscope, IndianRupee, Activity } from 'lucide-react';

type BookingStep = 'details' | 'payment' | 'confirmation';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  consultationFee: number;
}

const mockDoctors: Doctor[] = [
  { id: '1', name: 'Dr. Sarah Johnson', specialty: 'General Physician', consultationFee: 500 },
  { id: '2', name: 'Dr. Michael Chen', specialty: 'Cardiologist', consultationFee: 800 },
  { id: '3', name: 'Dr. Priya Sharma', specialty: 'Dermatologist', consultationFee: 600 },
  { id: '4', name: 'Dr. Rajesh Kumar', specialty: 'Pediatrician', consultationFee: 550 },
];

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
];

interface EnhancedAppointmentBookingProps {
  isNewUser?: boolean;
  userName?: string;
}

export default function EnhancedAppointmentBooking({ 
  isNewUser = false,
  userName = 'John Patient'
}: EnhancedAppointmentBookingProps) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<BookingStep>('details');
  
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState('');
  const [consultationType, setConsultationType] = useState('');

  const doctor = mockDoctors.find((d) => d.id === selectedDoctor);

  const handleProceedToPayment = () => {
    if (!selectedDoctor || !selectedDate || !selectedTime || !consultationType) {
      return;
    }
    setCurrentStep('payment');
  };

  const handlePaymentSuccess = (data: { transactionId: string; tempPatientId?: string }) => {
    setCurrentStep('confirmation');
  };

  const handleLogout = () => {
    navigate('/');
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  if (currentStep === 'payment' && doctor && selectedDate) {
    return (
      <PaymentFlow
        appointmentDetails={{
          doctor: doctor.name,
          specialty: doctor.specialty,
          date: formatDate(selectedDate),
          time: selectedTime,
          consultationType,
        }}
        consultationFee={doctor.consultationFee}
        isNewUser={isNewUser}
        onPaymentSuccess={handlePaymentSuccess}
      />
    );
  }

  return (
    <div>
      {/* Header with Back and Logout */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {!isNewUser && <BackButton />}
            <Link to={isNewUser ? "/" : "/patient"} className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm text-gray-900">HealthCare CMS</span>
            </Link>
          </div>
          <LogoutButton onLogout={handleLogout} userName={userName} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {!isNewUser && (
          <div className="mb-6">
            <Breadcrumbs
              items={[
                { label: 'Patient Portal', path: '/patient' },
                { label: 'Book Appointment', path: '/patient/book' },
              ]}
            />
          </div>
        )}

        <div className="mb-6">
          <h1 className="text-2xl text-gray-900 mb-2">Book New Appointment</h1>
          <p className="text-gray-600">
            {isNewUser
              ? 'Complete appointment booking to receive your Temporary Patient ID'
              : 'Select your preferred doctor, date, and time slot'}
          </p>
        </div>

        {isNewUser && (
          <Card className="mb-6 bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <p className="text-sm text-blue-900">
                <strong>New User:</strong> After successful payment, you will receive a{' '}
                <strong>Temporary Patient ID (TPID)</strong> which will be converted to a 
                Permanent Patient ID after your first verified clinic visit.
              </p>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Select Doctor */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Select Doctor
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Choose Specialist</Label>
                  <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockDoctors.map((doc) => (
                        <SelectItem key={doc.id} value={doc.id}>
                          <div className="flex flex-col">
                            <span>{doc.name}</span>
                            <span className="text-sm text-gray-600">{doc.specialty}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {doctor && (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Stethoscope className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-gray-900">{doctor.name}</p>
                        <p className="text-sm text-gray-600">{doctor.specialty}</p>
                        <div className="flex items-center gap-1 mt-2 text-sm">
                          <IndianRupee className="w-4 h-4 text-green-600" />
                          <span className="text-green-600">{doctor.consultationFee} Consultation Fee</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Consultation Type */}
            <Card>
              <CardHeader>
                <CardTitle>Consultation Type</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={consultationType} onValueChange={setConsultationType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select consultation type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="In-Person">In-Person Visit</SelectItem>
                    <SelectItem value="Video">Video Consultation</SelectItem>
                    <SelectItem value="Follow-up">Follow-up Consultation</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Select Date */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  Select Date
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date.getDay() === 0}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            {/* Select Time Slot */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Select Time Slot
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot}
                      variant={selectedTime === slot ? 'default' : 'outline'}
                      onClick={() => setSelectedTime(slot)}
                      className="w-full"
                    >
                      {slot}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary Sidebar */}
          <div className="space-y-6">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="text-lg">Appointment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {doctor ? (
                  <>
                    <div>
                      <p className="text-sm text-gray-600">Doctor</p>
                      <p className="text-gray-900">{doctor.name}</p>
                      <p className="text-sm text-gray-600">{doctor.specialty}</p>
                    </div>

                    {consultationType && (
                      <div>
                        <p className="text-sm text-gray-600">Type</p>
                        <p className="text-gray-900">{consultationType}</p>
                      </div>
                    )}

                    {selectedDate && (
                      <div>
                        <p className="text-sm text-gray-600">Date</p>
                        <p className="text-gray-900">{formatDate(selectedDate)}</p>
                      </div>
                    )}

                    {selectedTime && (
                      <div>
                        <p className="text-sm text-gray-600">Time</p>
                        <p className="text-gray-900">{selectedTime}</p>
                      </div>
                    )}

                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">Consultation Fee</span>
                        <span className="text-gray-900">₹{doctor.consultationFee}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-900">Total</span>
                        <span className="text-lg text-gray-900">₹{doctor.consultationFee}</span>
                      </div>
                    </div>

                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={handleProceedToPayment}
                      disabled={!selectedDoctor || !selectedDate || !selectedTime || !consultationType}
                    >
                      Proceed to Payment
                    </Button>
                  </>
                ) : (
                  <p className="text-sm text-gray-600 text-center py-4">
                    Select a doctor to view summary
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}