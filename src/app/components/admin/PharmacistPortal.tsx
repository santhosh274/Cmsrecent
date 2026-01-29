import { useState } from 'react';
import { Pill, User, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { toast } from 'sonner';

import DashboardLayout from '../shared/DashboardLayout';
import BillingSummary from '../shared/BillingSummary';

interface Patient {
  id: string;
  name: string;
  phone: string;
}

interface PharmacistPortalProps {
  userName: string;
  onLogout: () => void;
}

export default function PharmacistPortal({
  userName,
  onLogout,
}: PharmacistPortalProps) {
  const [selectedPatient, setSelectedPatient] = useState('');

  const patients: Patient[] = [
    { id: 'p1', name: 'John Patient', phone: '9876543210' },
    { id: 'p2', name: 'Sarah Patient', phone: '9876543220' },
    { id: 'p3', name: 'Mike Patient', phone: '9876543230' },
  ];

  const sampleBillingData = {
    consultationFee: 500,
    bookingFee: 50,
    labCharges: 800,
    medicineCharges: 300,
    otherFees: 150,
  };

  const selectedPatientData = patients.find(p => p.id === selectedPatient);

  const handleConfirmPayment = () => {
    if (!selectedPatient) {
      toast.error('Please select a patient');
      return;
    }
    toast.success('Payment confirmed successfully');
  };

  return (
    <DashboardLayout
      userName={userName}
      userRole="Pharmacist"
      navigation={[]}   // No sidebar items for now
      onLogout={onLogout}
    >
      <div className="space-y-6">
        {/* Header */}
        <h1 className="text-3xl text-gray-900 flex items-center gap-3">
          <Pill className="w-8 h-8 text-pink-600" />
          Pharmacist Portal
        </h1>

        {/* Patient Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Select Patient
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="patient">Patient</Label>
            <Select value={selectedPatient} onValueChange={setSelectedPatient}>
              <SelectTrigger id="patient">
                <SelectValue placeholder="Choose patient for billing" />
              </SelectTrigger>
              <SelectContent>
                {patients.map(patient => (
                  <SelectItem key={patient.id} value={patient.id}>
                    {patient.name} - {patient.phone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Billing Summary */}
        {selectedPatient && selectedPatientData && (
          <>
            <BillingSummary
              patientName={selectedPatientData.name}
              patientId={selectedPatientData.id.toUpperCase()}
              billingData={sampleBillingData}
              readOnly={false}
            />

            {/* Payment Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-green-600" />
                  Payment Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={handleConfirmPayment}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Confirm Payment
                </Button>

                <div className="grid grid-cols-3 gap-3">
                  <Button variant="outline">Cash</Button>
                  <Button variant="outline">Card</Button>
                  <Button variant="outline">UPI</Button>
                </div>

                <Button
                  variant="outline"
                  className="w-full text-red-600 hover:bg-red-50"
                >
                  Cancel Transaction
                </Button>
              </CardContent>
            </Card>
          </>
        )}

        {!selectedPatient && (
          <div className="text-center py-12 text-gray-500">
            <Pill className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p>Select a patient to view billing and process payment</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
