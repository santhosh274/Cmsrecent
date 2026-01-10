import { useState } from 'react';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Calendar } from '../ui/calendar';
import { Badge } from '../ui/badge';
import BackButton from '../shared/BackButton';
import Payment from '../payment/Payment';
import PaymentSuccess from '../payment/PaymentSuccess';

const doctors = [
  { id: '1', name: 'Dr. Sarah Johnson', specialty: 'General Physician', fee: 500, available: true },
  { id: '2', name: 'Dr. Michael Chen', specialty: 'Cardiologist', fee: 800, available: true },
  { id: '3', name: 'Dr. Emily Davis', specialty: 'Pediatrician', fee: 600, available: false },
];

const visitTypes = [
  { id: 'regular', label: 'Regular Checkup', duration: '30 mins' },
  { id: 'first', label: 'First Visit', duration: '45 mins' },
  { id: 'followup', label: 'Follow-up', duration: '20 mins' },
];

interface AppointmentBookingProps {
  isNewUser?: boolean;
}

export default function AppointmentBooking({ isNewUser = false }: AppointmentBookingProps) {
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedVisitType, setSelectedVisitType] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [tempPatientId, setTempPatientId] = useState('');

  const timeSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30'];

  const selectedDoctorData = doctors.find(d => d.id === selectedDoctor);
  const selectedVisitTypeData = visitTypes.find(v => v.id === selectedVisitType);

  const handleProceedToPayment = () => {
    setShowPayment(true);
  };

  const handlePaymentSuccess = (txnId: string, tmpPatientId?: string) => {
    setTransactionId(txnId);
    if (tmpPatientId) {
      setTempPatientId(tmpPatientId);
    }
    setPaymentSuccess(true);
  };

  const handlePaymentBack = () => {
    setShowPayment(false);
  };

  // Payment Success Screen
  if (paymentSuccess && selectedDoctorData) {
    return (
      <PaymentSuccess
        transactionId={transactionId}
        tempPatientId={isNewUser ? tempPatientId : undefined}
        appointmentDetails={{
          doctor: selectedDoctorData.name,
          date: selectedDate?.toLocaleDateString() || '',
          time: selectedTime,
        }}
        amount={(selectedDoctorData.fee || 0) + 20}
        isNewUser={isNewUser}
      />
    );
  }

  // Payment Screen
  if (showPayment && selectedDoctorData) {
    return (
      <Payment
        consultationFee={selectedDoctorData.fee}
        appointmentDetails={{
          doctor: selectedDoctorData.name,
          date: selectedDate?.toLocaleDateString() || '',
          time: selectedTime,
        }}
        onPaymentSuccess={handlePaymentSuccess}
        onBack={handlePaymentBack}
        isNewUser={isNewUser}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        {step > 1 && !showPayment && <BackButton onClick={() => setStep(step - 1)} />}
        <h1 className="text-3xl text-gray-900 mt-4">Book an Appointment</h1>
        <p className="text-gray-600 mt-2">Schedule your visit in a few simple steps</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {[1, 2, 3, 4, 5].map((s) => (
          <div key={s} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
              step >= s ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {s}
            </div>
            {s < 5 && <div className={`w-12 h-0.5 ${step > s ? 'bg-gray-900' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: Select Doctor */}
      {step === 1 && (
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Select Doctor</CardTitle>
            <CardDescription>Choose from available doctors</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <RadioGroup value={selectedDoctor} onValueChange={setSelectedDoctor}>
              {doctors.map((doctor) => (
                <div key={doctor.id} className={`flex items-center space-x-4 p-4 border rounded-lg ${
                  !doctor.available ? 'opacity-50' : 'cursor-pointer hover:bg-gray-50'
                }`}>
                  <RadioGroupItem value={doctor.id} id={doctor.id} disabled={!doctor.available} />
                  <Label htmlFor={doctor.id} className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-900">{doctor.name}</p>
                        <p className="text-sm text-gray-600">{doctor.specialty}</p>
                        <p className="text-sm font-medium text-blue-600 mt-1">Consultation Fee: ₹{doctor.fee}</p>
                      </div>
                      {!doctor.available && (
                        <Badge variant="secondary">Unavailable</Badge>
                      )}
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
            <div className="pt-4">
              <Button 
                onClick={() => setStep(2)} 
                disabled={!selectedDoctor}
                className="w-full"
              >
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Select Visit Type */}
      {step === 2 && (
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Select Visit Type</CardTitle>
            <CardDescription>Choose the type of appointment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <RadioGroup value={selectedVisitType} onValueChange={setSelectedVisitType}>
              {visitTypes.map((type) => (
                <div key={type.id} className="flex items-center space-x-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <RadioGroupItem value={type.id} id={type.id} />
                  <Label htmlFor={type.id} className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-900">{type.label}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{type.duration}</span>
                      </div>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
            <div className="pt-4">
              <Button onClick={() => setStep(3)} disabled={!selectedVisitType} className="w-full">
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Select Date */}
      {step === 3 && (
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
            <CardDescription>Choose an available date</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                disabled={(date) => date < new Date()}
              />
            </div>
            <div className="pt-4">
              <Button onClick={() => setStep(4)} disabled={!selectedDate} className="w-full">
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Select Time */}
      {step === 4 && (
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Select Time Slot</CardTitle>
            <CardDescription>Available time slots for {selectedDate?.toLocaleDateString()}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-3 border rounded-lg text-sm transition-colors ${
                    selectedTime === time
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
            <div className="pt-4">
              <Button onClick={() => setStep(5)} disabled={!selectedTime} className="w-full">
                Review & Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 5: Review & Proceed to Payment */}
      {step === 5 && selectedDoctorData && (
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Review Your Appointment</CardTitle>
            <CardDescription>Confirm the details before proceeding to payment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div>
                <p className="text-sm text-gray-600">Doctor</p>
                <p className="font-medium">{selectedDoctorData.name}</p>
                <p className="text-sm text-gray-600">{selectedDoctorData.specialty}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Visit Type</p>
                <p className="font-medium">{selectedVisitTypeData?.label}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Date & Time</p>
                <p className="font-medium">{selectedDate?.toLocaleDateString()} at {selectedTime}</p>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Consultation Fee</span>
                  <span className="font-medium">₹{selectedDoctorData.fee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Platform Fee</span>
                  <span className="font-medium">₹20</span>
                </div>
                <div className="flex justify-between border-t pt-2 mt-2">
                  <span className="font-semibold">Total Amount</span>
                  <span className="font-semibold text-lg text-blue-600">₹{selectedDoctorData.fee + 20}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-900">
              <p className="font-medium mb-1">Payment Required</p>
              <p>Payment is mandatory to confirm your appointment. You'll be redirected to the secure payment page.</p>
            </div>

            <div className="pt-4">
              <Button onClick={handleProceedToPayment} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Proceed to Payment
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
