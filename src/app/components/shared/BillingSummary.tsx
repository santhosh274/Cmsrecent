import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { DollarSign, FileText, Pill, Activity, CreditCard } from 'lucide-react';
import { Badge } from '../ui/badge';

interface BillingItem {
  label: string;
  amount: number;
  icon: React.ReactNode;
  color: string;
}

interface BillingSummaryProps {
  patientName: string;
  patientId: string;
  billingData: {
    consultationFee: number;
    bookingFee: number;
    labCharges: number;
    medicineCharges: number;
    otherFees: number;
  };
  readOnly?: boolean;
}

export default function BillingSummary({ 
  patientName, 
  patientId, 
  billingData,
  readOnly = false 
}: BillingSummaryProps) {
  const totalAmount = Object.values(billingData).reduce((sum, amount) => sum + amount, 0);

  const billingItems: BillingItem[] = [
    {
      label: 'Consultation Fee',
      amount: billingData.consultationFee,
      icon: <Activity className="w-4 h-4" />,
      color: 'bg-blue-50 border-blue-200 text-blue-900',
    },
    {
      label: 'Booking Fee',
      amount: billingData.bookingFee,
      icon: <FileText className="w-4 h-4" />,
      color: 'bg-green-50 border-green-200 text-green-900',
    },
    {
      label: 'Lab Charges',
      amount: billingData.labCharges,
      icon: <Activity className="w-4 h-4" />,
      color: 'bg-purple-50 border-purple-200 text-purple-900',
    },
    {
      label: 'Medicine Charges',
      amount: billingData.medicineCharges,
      icon: <Pill className="w-4 h-4" />,
      color: 'bg-pink-50 border-pink-200 text-pink-900',
    },
    {
      label: 'Other Services',
      amount: billingData.otherFees,
      icon: <DollarSign className="w-4 h-4" />,
      color: 'bg-gray-50 border-gray-200 text-gray-900',
    },
  ];

  return (
    <Card className="border-gray-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-600" />
              Billing Summary
            </CardTitle>
            <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
              <span>{patientName}</span>
              <Badge variant="secondary" className="text-xs">
                {patientId}
              </Badge>
            </div>
          </div>
          {readOnly && (
            <Badge className="bg-gray-100 text-gray-700" variant="secondary">
              Read Only
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Billing Items */}
          <div className="space-y-3">
            {billingItems.map((item, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 border rounded-lg ${item.color}`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-md">
                    {item.icon}
                  </div>
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                <span className="text-lg font-semibold">
                  ₹{item.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Total Amount */}
          <div className="pt-4 border-t-2 border-gray-300">
            <div className="flex items-center justify-between p-4 bg-blue-600 text-white rounded-lg">
              <div>
                <p className="text-sm opacity-90">Total Payable Amount</p>
                <p className="text-xs opacity-75 mt-1">Including all charges</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold">₹{totalAmount.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Payment Status */}
          <div className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <span className="text-sm text-amber-900">Payment Status</span>
            <Badge className="bg-amber-100 text-amber-800" variant="secondary">
              Pending
            </Badge>
          </div>

          {/* Breakdown Note */}
          <div className="text-xs text-gray-500 text-center pt-2">
            <p>All amounts in Indian Rupees (₹)</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}