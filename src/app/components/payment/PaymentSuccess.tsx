import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { CheckCircle, Download, Calendar, User, Clock } from 'lucide-react';

interface PaymentSuccessProps {
  transactionId: string;
  tempPatientId?: string;
  appointmentDetails: {
    doctor: string;
    date: string;
    time: string;
  };
  amount: number;
  isNewUser?: boolean;
}

export default function PaymentSuccess({ 
  transactionId, 
  tempPatientId,
  appointmentDetails, 
  amount,
  isNewUser = false 
}: PaymentSuccessProps) {
  const navigate = useNavigate();

  const handleDownloadReceipt = () => {
    // In a real app, this would generate and download a PDF receipt
    const receiptContent = `
HealthCare CMS - Payment Receipt
================================

Transaction ID: ${transactionId}
${isNewUser ? `Temporary Patient ID: ${tempPatientId}\n` : ''}
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}

Appointment Details:
-------------------
Doctor: ${appointmentDetails.doctor}
Date: ${appointmentDetails.date}
Time: ${appointmentDetails.time}

Amount Paid: ₹${amount}
Status: SUCCESS

Thank you for choosing HealthCare CMS!
    `;

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Receipt_${transactionId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl border-gray-200">
        <CardContent className="pt-12 pb-8">
          {/* Success Icon */}
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl text-gray-900 mb-2">Payment Successful!</h1>
            <p className="text-gray-600">
              {isNewUser 
                ? 'Your appointment is confirmed. Please verify your details with reception.'
                : 'Your appointment has been successfully booked'}
            </p>
          </div>

          {/* Transaction Details */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Transaction ID</p>
                <p className="font-mono font-medium text-sm">{transactionId}</p>
              </div>
              {isNewUser && tempPatientId && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Temporary Patient ID</p>
                  <p className="font-mono font-medium text-sm text-amber-700">{tempPatientId}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-600 mb-1">Amount Paid</p>
                <p className="font-medium text-green-600">₹{amount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Status</p>
                <p className="font-medium text-green-600">✓ Confirmed</p>
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold mb-4">Appointment Details</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Doctor</p>
                  <p className="font-medium">{appointmentDetails.doctor}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-medium">{appointmentDetails.date}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Time</p>
                  <p className="font-medium">{appointmentDetails.time}</p>
                </div>
              </div>
            </div>
          </div>

          {/* New User Note */}
          {isNewUser && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-amber-900 mb-2">Important: Verification Pending</h4>
              <ul className="text-sm text-amber-800 space-y-1">
                <li>• Please arrive 15 minutes before your appointment</li>
                <li>• Bring a valid ID proof for verification</li>
                <li>• Your patient ID will be activated after verification</li>
                <li>• Save your Temporary Patient ID: <span className="font-mono font-semibold">{tempPatientId}</span></li>
              </ul>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleDownloadReceipt}
              variant="outline"
              className="flex-1"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Receipt
            </Button>
            <Button
              onClick={() => navigate('/patient')}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Go to Dashboard
            </Button>
          </div>

          {/* Contact Support */}
          <div className="text-center mt-6 text-sm text-gray-600">
            <p>Need help? Contact us at <a href="tel:18001234567" className="text-blue-600 hover:underline">1800-123-4567</a></p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
