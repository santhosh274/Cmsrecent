import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Badge } from '../ui/badge';
import BackButton from '../shared/BackButton';
import Breadcrumbs from '../shared/Breadcrumbs';
import LogoutButton from '../shared/LogoutButton';
import PaymentFailure from './PaymentFailure';
import {
  CreditCard,
  Smartphone,
  Building2,
  CheckCircle,
  Clock,
  Calendar,
  User,
  IndianRupee,
  Shield,
  Lock,
} from 'lucide-react';
import { toast } from 'sonner';

interface AppointmentDetails {
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  consultationType: string;
}

interface PaymentFlowProps {
  appointmentDetails: AppointmentDetails;
  consultationFee: number;
  isNewUser?: boolean;
  onPaymentSuccess: (data: { transactionId: string; tempPatientId?: string }) => void;
}

type PaymentMethod = 'card' | 'upi' | 'netbanking';
type PaymentStatus = 'pending' | 'processing' | 'success' | 'failed';

export default function PaymentFlow({
  appointmentDetails,
  consultationFee,
  isNewUser = false,
  onPaymentSuccess,
}: PaymentFlowProps) {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('pending');
  const [transactionId, setTransactionId] = useState('');
  const [tempPatientId, setTempPatientId] = useState('');
  const [failureReason, setFailureReason] = useState('');

  // Payment form states
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [upiId, setUpiId] = useState('');

  const platformFee = 50;
  const gst = Math.round((consultationFee + platformFee) * 0.18);
  const totalAmount = consultationFee + platformFee + gst;

  const handleLogout = () => {
    navigate('/');
  };

  const handleRetryPayment = () => {
    setPaymentStatus('pending');
    setTransactionId('');
    setFailureReason('');
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (paymentMethod === 'card' && (!cardNumber || !cardExpiry || !cardCVV)) {
      toast.error('Please fill in all card details');
      return;
    }

    if (paymentMethod === 'upi' && !upiId) {
      toast.error('Please enter UPI ID');
      return;
    }

    setPaymentStatus('processing');

    // Simulate payment processing with random success/failure
    setTimeout(() => {
      const txnId = `TXN${Date.now()}`;
      setTransactionId(txnId);

      // Simulate 90% success rate for demo
      const isSuccess = Math.random() > 0.1;

      if (isSuccess) {
        const tpid = isNewUser ? `TPID${Date.now().toString().slice(-6)}` : '';
        if (isNewUser) {
          setTempPatientId(tpid);
        }
        setPaymentStatus('success');
        toast.success('Payment successful!');

        setTimeout(() => {
          onPaymentSuccess({
            transactionId: txnId,
            tempPatientId: tpid || undefined,
          });
        }, 2000);
      } else {
        setPaymentStatus('failed');
        setFailureReason('Payment gateway error. Please try again.');
        toast.error('Payment failed');
      }
    }, 2000);
  };

  if (paymentStatus === 'failed') {
    return (
      <div>
        {/* Header with Logout */}
        <div className="border-b border-gray-200 bg-white sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm text-gray-900">HealthCare CMS</span>
            </div>
            <LogoutButton onLogout={handleLogout} />
          </div>
        </div>

        <PaymentFailure
          onRetry={handleRetryPayment}
          errorMessage={failureReason}
          transactionId={transactionId}
        />
      </div>
    );
  }

  if (paymentStatus === 'success') {
    return (
      <div>
        {/* Header with Logout */}
        <div className="border-b border-gray-200 bg-white sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm text-gray-900">HealthCare CMS</span>
            </div>
            <LogoutButton onLogout={handleLogout} />
          </div>
        </div>

        <div className="max-w-2xl mx-auto p-6">
          <Card className="text-center py-12 border-green-200 bg-green-50">
            <CardContent className="space-y-4">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-2xl text-gray-900">Payment Successful!</h2>
              <p className="text-gray-600">
                Your appointment has been confirmed
              </p>

              <div className="bg-white border border-green-200 rounded-lg p-6 text-left space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Transaction ID</span>
                  <span className="text-gray-900">{transactionId}</span>
                </div>
                {isNewUser && tempPatientId && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Temporary Patient ID</span>
                    <Badge className="bg-blue-100 text-blue-800">
                      {tempPatientId}
                    </Badge>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Amount Paid</span>
                  <span className="text-gray-900">₹{totalAmount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Status</span>
                  <Badge className="bg-green-100 text-green-800">
                    Payment Successful
                  </Badge>
                </div>
              </div>

              {isNewUser && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> Your Temporary Patient ID will be converted to a 
                    Permanent Patient ID after your first verified clinic visit.
                  </p>
                </div>
              )}

              <div className="flex gap-3 justify-center mt-6">
                <Button onClick={() => window.print()}>
                  Download Receipt
                </Button>
                <Button variant="outline" onClick={() => navigate('/patient')}>
                  Go to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header with Back and Logout */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <BackButton />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm text-gray-900">Secure Payment</span>
            </div>
          </div>
          <LogoutButton onLogout={handleLogout} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <Breadcrumbs
            items={[
              { label: 'Appointments', path: '/patient/appointments' },
              { label: 'Book Appointment', path: '/patient/appointments/book' },
              { label: 'Payment', path: '/patient/payment' },
            ]}
          />
        </div>

        <div className="mb-6">
          <h1 className="text-2xl text-gray-900 mb-2">Complete Payment</h1>
          <p className="text-gray-600">
            {isNewUser
              ? 'Complete payment to generate your Temporary Patient ID and confirm appointment'
              : 'Complete payment to confirm your appointment'}
          </p>
        </div>

        {/* Security Badge */}
        <div className="mb-6 flex items-center justify-center gap-2 text-sm text-gray-600">
          <Shield className="w-5 h-5 text-green-600" />
          <span>Secured by 256-bit SSL encryption</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handlePayment} className="space-y-6">
              {/* Payment Method Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Select Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as PaymentMethod)}>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                        <RadioGroupItem value="upi" id="upi" />
                        <Smartphone className="w-5 h-5 text-gray-600" />
                        <div className="flex-1">
                          <p className="text-gray-900">UPI</p>
                          <p className="text-sm text-gray-600">Pay using UPI ID</p>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                        <RadioGroupItem value="card" id="card" />
                        <CreditCard className="w-5 h-5 text-gray-600" />
                        <div className="flex-1">
                          <p className="text-gray-900">Credit/Debit Card</p>
                          <p className="text-sm text-gray-600">Visa, Mastercard, Rupay</p>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                        <RadioGroupItem value="netbanking" id="netbanking" />
                        <Building2 className="w-5 h-5 text-gray-600" />
                        <div className="flex-1">
                          <p className="text-gray-900">Net Banking</p>
                          <p className="text-sm text-gray-600">All major banks</p>
                        </div>
                      </label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Payment Details Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {paymentMethod === 'upi' && (
                    <div className="space-y-2">
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input
                        id="upiId"
                        placeholder="yourname@upi"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        required
                      />
                    </div>
                  )}

                  {paymentMethod === 'card' && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          maxLength={19}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardExpiry">Expiry Date</Label>
                          <Input
                            id="cardExpiry"
                            placeholder="MM/YY"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            maxLength={5}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardCVV">CVV</Label>
                          <Input
                            id="cardCVV"
                            type="password"
                            placeholder="123"
                            value={cardCVV}
                            onChange={(e) => setCardCVV(e.target.value)}
                            maxLength={3}
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {paymentMethod === 'netbanking' && (
                    <div className="space-y-2">
                      <Label>Select Bank</Label>
                      <select className="w-full border border-gray-300 rounded-md p-2">
                        <option>State Bank of India</option>
                        <option>HDFC Bank</option>
                        <option>ICICI Bank</option>
                        <option>Axis Bank</option>
                        <option>Other Banks</option>
                      </select>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700"
                size="lg"
                disabled={paymentStatus === 'processing'}
              >
                {paymentStatus === 'processing' ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  <>Pay ₹{totalAmount}</>
                )}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Appointment Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Appointment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <User className="w-4 h-4 text-gray-600 mt-0.5" />
                  <div>
                    <p className="text-gray-900">{appointmentDetails.doctor}</p>
                    <p className="text-gray-600">{appointmentDetails.specialty}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{appointmentDetails.date}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{appointmentDetails.time}</span>
                </div>
              </CardContent>
            </Card>

            {/* Payment Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Consultation Fee</span>
                  <span className="text-gray-900">₹{consultationFee}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Platform Fee</span>
                  <span className="text-gray-900">₹{platformFee}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">GST (18%)</span>
                  <span className="text-gray-900">₹{gst}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="text-gray-900">Total Amount</span>
                  <span className="text-lg text-gray-900">₹{totalAmount}</span>
                </div>
              </CardContent>
            </Card>

            {isNewUser && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-6 text-sm text-blue-900">
                  <p className="mb-2">
                    <strong>New User:</strong>
                  </p>
                  <p>
                    After successful payment, you will receive a <strong>Temporary Patient ID (TPID)</strong> 
                    which will be used for this appointment.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}