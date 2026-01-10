import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';
import EnhancedAppointmentBooking from './EnhancedAppointmentBooking';
import { Phone, User, Mail, CheckCircle, ArrowRight, Activity, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

type RegistrationStep = 'mobile' | 'otp' | 'details' | 'booking';

export default function NewUserRegistration() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<RegistrationStep>('mobile');
  
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.length === 10) {
      toast.success('OTP sent to your mobile number');
      setCurrentStep('otp');
    }
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      toast.success('Mobile number verified');
      setCurrentStep('details');
    }
  };

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && age && gender) {
      setCurrentStep('booking');
    }
  };

  if (currentStep === 'booking') {
    return <EnhancedAppointmentBooking isNewUser={true} userName={name} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {currentStep !== 'mobile' && (
              <Button
                variant="ghost"
                onClick={() => {
                  if (currentStep === 'otp') setCurrentStep('mobile');
                  else if (currentStep === 'details') setCurrentStep('otp');
                }}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            )}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm text-gray-900">HealthCare CMS</span>
            </Link>
          </div>
          <Link to="/">
            <Button variant="ghost">Cancel</Button>
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">
                Step {currentStep === 'mobile' ? '1' : currentStep === 'otp' ? '2' : '3'} of 3
              </span>
              <span className="text-sm text-gray-600">New User Registration</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300"
                style={{
                  width:
                    currentStep === 'mobile'
                      ? '33%'
                      : currentStep === 'otp'
                      ? '66%'
                      : '100%',
                }}
              />
            </div>
          </div>

          {/* Step 1: Mobile Number */}
          {currentStep === 'mobile' && (
            <Card>
              <CardHeader>
                <CardTitle>Enter Mobile Number</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSendOTP} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile Number</Label>
                    <div className="flex gap-2">
                      <Input
                        value="+91"
                        disabled
                        className="w-16"
                      />
                      <Input
                        id="mobile"
                        type="tel"
                        placeholder="Enter 10-digit mobile"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        required
                        maxLength={10}
                      />
                    </div>
                    <p className="text-sm text-gray-600">
                      We'll send an OTP to verify your mobile number
                    </p>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={mobile.length !== 10}
                  >
                    Send OTP
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Step 2: OTP Verification */}
          {currentStep === 'otp' && (
            <Card>
              <CardHeader>
                <CardTitle>Verify Mobile Number</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleVerifyOTP} className="space-y-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-4">
                      Enter the 6-digit OTP sent to +91 {mobile}
                    </p>
                    <div className="flex justify-center">
                      <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>Didn't receive OTP?</span>
                    <button
                      type="button"
                      className="text-blue-600 hover:underline"
                      onClick={() => toast.success('OTP resent')}
                    >
                      Resend
                    </button>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={otp.length !== 6}
                  >
                    Verify OTP
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full"
                    onClick={() => setCurrentStep('mobile')}
                  >
                    Change Mobile Number
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Basic Details */}
          {currentStep === 'details' && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-green-600">Mobile Verified</span>
                </div>
                <CardTitle>Complete Your Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitDetails} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      <User className="w-4 h-4 inline mr-2" />
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        placeholder="Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                        min="1"
                        max="120"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <select
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2"
                        required
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-900">
                      <strong>Next Step:</strong> After completing your profile, you'll be able to 
                      book an appointment and make payment to receive your Temporary Patient ID.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Continue to Appointment Booking
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}