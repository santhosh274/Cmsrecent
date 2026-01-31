import { useState, useEffect } from 'react';
import { Pill, User, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Label } from '../ui/label';
import { toast } from 'sonner';

import DashboardLayout from '../shared/DashboardLayout';
import BillingSummary from '../shared/BillingSummary';
import { fetchPatients, Patient } from '../services/patientService';

interface PharmacistPortalProps {
  userName: string;
  onLogout: () => void;
}

export default function PharmacistPortal({
  userName,
  onLogout,
}: PharmacistPortalProps) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchPatients();
        setPatients(data);
      } catch (err: any) {
        toast.error(err.message);
        if (err.message.toLowerCase().includes('unauthorized')) {
          onLogout();
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [onLogout]);

  const selectedPatient = patients.find(p => p.id === selectedPatientId);

  const handleConfirmPayment = () => {
    if (!selectedPatient) {
      toast.error('Please select a patient');
      return;
    }
    toast.success(`Payment confirmed for ${selectedPatient.name}`);
  };

  return (
    <DashboardLayout
      userName={userName}
      userRole="Pharmacist"
      navigation={[]}
      onLogout={onLogout}
    >
      <div className="space-y-6">
        <h1 className="text-3xl flex items-center gap-3">
          <Pill className="w-8 h-8 text-pink-600" />
          Pharmacist Portal
        </h1>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Select Patient
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-2">
            <Label>Patient</Label>

            <Select
              disabled={loading}
              value={selectedPatientId ?? undefined}
              onValueChange={setSelectedPatientId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose patient for billing" />
              </SelectTrigger>

              <SelectContent>
                {loading && (
                  <SelectItem value="__loading" disabled>
                    Loading patients...
                  </SelectItem>
                )}

                {!loading && patients.length === 0 && (
                  <SelectItem value="__none" disabled>
                    No patients found
                  </SelectItem>
                )}

                {patients.map(p => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name} — {p.phone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {selectedPatient && (
          <>
            <BillingSummary
              patientName={selectedPatient.name}
              patientId={selectedPatient.id.toUpperCase()}
              billingData={{
                consultationFee: 500,
                bookingFee: 50,
                labCharges: 800,
                medicineCharges: 300,
                otherFees: 150,
              }}
              readOnly={false}
            />

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
      </div>
    </DashboardLayout>
  );
}
