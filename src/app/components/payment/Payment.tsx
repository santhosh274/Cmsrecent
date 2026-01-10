import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { CreditCard, Smartphone, Building2, Check, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import BackButton from '../shared/BackButton';

interface PaymentProps {
  consultationFee: number;
  appointmentDetails: {
    doctor: string;
    date: string;
    time: string;
  };
  onPaymentSuccess: (transactionId: string, tempPatientId?: string) => void;
  onBack: () => void;
  isNewUser?: boolean;
}

type PaymentMethod = 'upi' | 'card' | 'netbanking' | '';

export default function Payment({ 
  consultationFee, 
  appointmentDetails, 
  onPaymentSuccess, 
  onBack,
  isNewUser = false 
}: PaymentProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [bankName, setBankName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const platformFee = 20;
  const totalAmount = consultationFee + platformFee;

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!paymentMethod) {
      toast.error('Please select a payment method');
      return;
    }

    // Validate payment details
    if (paymentMethod === 'upi' && !upiId) {
      toast.error('Please enter UPI ID');
      return;
    }

    if (paymentMethod === 'card' && (!cardNumber || !cardExpiry || !cardCvv)) {
      toast.error('Please fill in all card details');
      return;
    }

    if (paymentMethod === 'netbanking' && !bankName) {
      toast.error('Please select your bank');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const transactionId = `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`;
      const tempPatientId = isNewUser ? `TMP${Date.now()}` : undefined;

      toast.success('Payment successful!');
      setIsProcessing(false);
      onPaymentSuccess(transactionId, tempPatientId);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <BackButton onClick={onBack} />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Side - Appointment Summary */}
          <div className="md:col-span-1">
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg">Appointment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Doctor</p>
                  <p className="font-medium">{appointmentDetails.doctor}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-medium">{appointmentDetails.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Time</p>
                  <p className="font-medium">{appointmentDetails.time}</p>
                </div>

                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Consultation Fee</span>
                    <span className="font-medium">₹{consultationFee}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Platform Fee</span>
                    <span className="font-medium">₹{platformFee}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-semibold">Total Amount</span>
                    <span className="font-semibold text-lg text-blue-600">₹{totalAmount}</span>
                  </div>
                </div>

                {isNewUser && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-4">
                    <div className="flex gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div className="text-xs text-amber-900">
                        <p className="font-medium mb-1">New User</p>
                        <p>A temporary Patient ID will be generated after successful payment</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Payment Form */}
          <div className="md:col-span-2">
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
                <CardDescription>Complete your payment to confirm appointment</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePayment} className="space-y-6">
                  {/* Payment Method Selection */}
                  <div className="space-y-3">
                    <Label>Select Payment Method *</Label>
                    <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}>
                      {/* UPI */}
                      <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                        <RadioGroupItem value="upi" id="upi" />
                        <Label htmlFor="upi" className="flex items-center gap-2 cursor-pointer flex-1">
                          <Smartphone className="w-5 h-5 text-blue-600" />
                          <span>UPI</span>
                        </Label>
                      </div>

                      {/* Card */}
                      <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                          <CreditCard className="w-5 h-5 text-blue-600" />
                          <span>Debit / Credit Card</span>
                        </Label>
                      </div>

                      {/* Net Banking */}
                      <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                        <RadioGroupItem value="netbanking" id="netbanking" />
                        <Label htmlFor="netbanking" className="flex items-center gap-2 cursor-pointer flex-1">
                          <Building2 className="w-5 h-5 text-blue-600" />
                          <span>Net Banking</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* UPI Fields */}
                  {paymentMethod === 'upi' && (
                    <div className="space-y-4 border-t pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="upiId">UPI ID</Label>
                        <Input
                          id="upiId"
                          placeholder="yourname@upi"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                        />
                        <p className="text-xs text-gray-600">Example: 9876543210@paytm, yourname@gpay</p>
                      </div>
                    </div>
                  )}

                  {/* Card Fields */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-4 border-t pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          value={cardNumber}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\s/g, '');
                            const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
                            setCardNumber(formatted);
                          }}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardExpiry">Expiry Date</Label>
                          <Input
                            id="cardExpiry"
                            placeholder="MM/YY"
                            maxLength={5}
                            value={cardExpiry}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, '');
                              if (value.length >= 2) {
                                setCardExpiry(`${value.slice(0, 2)}/${value.slice(2, 4)}`);
                              } else {
                                setCardExpiry(value);
                              }
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardCvv">CVV</Label>
                          <Input
                            id="cardCvv"
                            type="password"
                            placeholder="123"
                            maxLength={3}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Net Banking Fields */}
                  {paymentMethod === 'netbanking' && (
                    <div className="space-y-4 border-t pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="bankName">Select Your Bank</Label>
                        <select
                          id="bankName"
                          className="w-full rounded-md border border-gray-300 p-2"
                          value={bankName}
                          onChange={(e) => setBankName(e.target.value)}
                        >
                          <option value="">Choose Bank</option>
                          <option value="sbi">State Bank of India</option>
                          <option value="hdfc">HDFC Bank</option>
                          <option value="icici">ICICI Bank</option>
                          <option value="axis">Axis Bank</option>
                          <option value="pnb">Punjab National Bank</option>
                          <option value="other">Other Banks</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Security Note */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex gap-2">
                      <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-blue-900">
                        Your payment information is secure and encrypted. We never store your card details.
                      </p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onBack}
                      disabled={isProcessing}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={!paymentMethod || isProcessing}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {isProcessing ? 'Processing...' : `Pay ₹${totalAmount}`}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
