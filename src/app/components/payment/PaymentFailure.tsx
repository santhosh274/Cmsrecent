import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { XCircle, RefreshCw, Home } from 'lucide-react';

interface PaymentFailureProps {
  onRetry: () => void;
  errorMessage?: string;
  transactionId?: string;
}

export default function PaymentFailure({
  onRetry,
  errorMessage = 'Payment failed due to a technical issue. Please try again.',
  transactionId,
}: PaymentFailureProps) {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="text-center py-12 border-red-200 bg-red-50">
        <CardContent className="space-y-4">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <XCircle className="w-12 h-12 text-red-600" />
          </div>
          <h2 className="text-2xl text-gray-900">Payment Failed</h2>
          <p className="text-gray-600">{errorMessage}</p>

          {transactionId && (
            <div className="bg-white border border-red-200 rounded-lg p-4 text-left">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Transaction ID</span>
                <span className="text-gray-900">{transactionId}</span>
              </div>
            </div>
          )}

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-left">
            <p className="text-sm text-amber-900">
              <strong>Note:</strong> No amount has been deducted from your account. 
              Your appointment slot is being held temporarily. Please retry payment to confirm.
            </p>
          </div>

          <div className="flex gap-3 justify-center mt-6">
            <Button
              onClick={onRetry}
              className="bg-blue-600 hover:bg-blue-700 gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Retry Payment
            </Button>
            <Button variant="outline" onClick={() => navigate('/')}>
              <Home className="w-4 h-4 mr-2" />
              Go to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
