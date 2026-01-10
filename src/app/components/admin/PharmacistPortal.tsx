import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { Pill, User, CreditCard } from 'lucide-react';
import BillingSummary from '../shared/BillingSummary';
import BackButton from '../shared/BackButton';
import { toast } from 'sonner';

interface Patient {
  id: string;
  name: string;
  phone: string;
}

export default function PharmacistPortal() {
  const [selectedPatient, setSelectedPatient] = useState<string>('');
  
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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <BackButton to="/admin" />
        <h1 className="text-3xl text-gray-900 mt-4 flex items-center gap-3">
          <Pill className="w-8 h-8 text-pink-600" />
          Pharmacist Portal
        </h1>
      </div>

      {/* Patient Selection */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            Select Patient
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
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
          </div>
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
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-green-600" />
                Payment Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button 
                  onClick={handleConfirmPayment}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  Confirm Payment
                </Button>
                <div className="grid grid-cols-3 gap-3">
                  <Button variant="outline" className="w-full">
                    Cash
                  </Button>
                  <Button variant="outline" className="w-full">
                    Card
                  </Button>
                  <Button variant="outline" className="w-full">
                    UPI
                  </Button>
                </div>
                <Button variant="outline" className="w-full text-red-600 hover:bg-red-50">
                  Cancel Transaction
                </Button>
              </div>
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
  );
}