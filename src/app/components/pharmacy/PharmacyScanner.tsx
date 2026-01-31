import { useState, useEffect } from 'react';
import { fetchPrescriptions } from '../services/prescriptionService';
import { QrCode, Check, X, Package } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';

// Remove hardcoded prescriptionData

export default function PharmacyScanner() {
  const [scanned, setScanned] = useState(false);
  const [medicines, setMedicines] = useState(prescriptionData.medicines);
  const [dispensing, setDispensing] = useState(false);
  const [dispensed, setDispensed] = useState(false);

  const handleScan = () => {
    setScanned(true);
  };

  export default function PharmacyScanner() {
    const [scanned, setScanned] = useState(false);
    const [prescription, setPrescription] = useState<any>(null);
    const [medicines, setMedicines] = useState<any[]>([]);
    const [dispensing, setDispensing] = useState(false);
    const [dispensed, setDispensed] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      if (scanned && !prescription) {
        setLoading(true);
        fetchPrescriptions()
          .then((data) => {
            if (data.length > 0) {
              setPrescription(data[0]);
              setMedicines(data[0].medicines.map((med: any, idx: number) => ({ ...med, id: String(idx + 1), dispensed: false })));
            }
          })
          .finally(() => setLoading(false));
      }
    }, [scanned, prescription]);

    const handleScan = () => {
      setScanned(true);
      setPrescription(null);
      setMedicines([]);
    };

    const toggleMedicine = (id: string) => {
      setMedicines(medicines.map(med => 
        med.id === id ? { ...med, dispensed: !med.dispensed } : med
      ));
    };

    const handleDispense = () => {
      setDispensing(true);
      setTimeout(() => {
        setDispensing(false);
        setDispensed(true);
      }, 1500);
    };

    const allDispensed = medicines.length > 0 && medicines.every(med => med.dispensed);
    const noneDispensed = medicines.length > 0 && medicines.every(med => !med.dispensed);

    if (dispensed && prescription) {
      return (
        <div className="max-w-2xl mx-auto">
          <Card className="border-gray-200">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <h2 className="text-2xl text-gray-900">Prescription Dispensed!</h2>
                <p className="text-gray-600">All medicines have been dispensed for {prescription.patient_name || prescription.patient_id}</p>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg text-left space-y-2">
                  <p className="text-sm"><span className="text-gray-600">Prescription ID:</span> <span className="text-gray-900">{prescription.id}</span></p>
                  <p className="text-sm"><span className="text-gray-600">Patient:</span> <span className="text-gray-900">{prescription.patient_name || prescription.patient_id}</span></p>
                  <p className="text-sm"><span className="text-gray-600">Medicines:</span> <span className="text-gray-900">{medicines.length} items</span></p>
                </div>
                <Button onClick={() => {
                  setScanned(false);
                  setDispensed(false);
                  setPrescription(null);
                  setMedicines([]);
                }}>
                  Scan New Prescription
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl text-gray-900">Prescription Scanner</h1>
          <p className="text-gray-600 mt-2">Paperless pharmacy - Scan and dispense</p>
        </div>

        {!scanned ? (
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>Scan Prescription QR Code</CardTitle>
              <CardDescription>Use the scanner to read patient's prescription</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <div className="flex justify-center mb-6">
                  <div className="w-32 h-32 border-4 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <QrCode className="h-16 w-16 text-gray-400" />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-6">Place QR code in scanner view</p>
                <Button onClick={handleScan} size="lg">
                  Simulate Scan (Demo)
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading prescription...</p>
          </div>
        ) : prescription ? (
          <div className="space-y-6">
            {/* Prescription Details */}
            <Card className="border-gray-200 bg-gray-50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Prescription Details</CardTitle>
                    <CardDescription>ID: {prescription.id}</CardDescription>
                  </div>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                </div>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Patient</p>
                  <p className="text-sm text-gray-900 mt-1">{prescription.patient_name || prescription.patient_id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Doctor</p>
                  <p className="text-sm text-gray-900 mt-1">{prescription.doctor_name || prescription.doctor_id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="text-sm text-gray-900 mt-1">{prescription.created_at}</p>
                </div>
              </CardContent>
            </Card>

            {/* Medicine Checklist */}
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle>Medicine Dispense Checklist</CardTitle>
                <CardDescription>Mark items as dispensed</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {medicines.map((medicine) => (
                  <div
                    key={medicine.id}
                    className={`p-4 border rounded-lg transition-colors ${
                      medicine.dispensed ? 'bg-green-50 border-green-200' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <Checkbox
                        id={medicine.id}
                        checked={medicine.dispensed}
                        onCheckedChange={() => toggleMedicine(medicine.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label 
                          htmlFor={medicine.id}
                          className={`cursor-pointer ${medicine.dispensed ? 'line-through text-gray-500' : ''}`}
                        >
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4" />
                            <span className="text-sm text-gray-900">{medicine.name}</span>
                          </div>
                          <div className="mt-2 grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Dosage:</span>{' '}
                              <span className="text-gray-900">{medicine.dosage}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Quantity:</span>{' '}
                              <span className="text-gray-900">{medicine.quantity}</span>
                            </div>
                          </div>
                        </Label>
                      </div>
                      {medicine.dispensed && (
                        <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="border-gray-200">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setScanned(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleDispense}
                    disabled={noneDispensed || dispensing}
                    className="flex-1"
                  >
                    {dispensing ? 'Processing...' : allDispensed ? 'Mark as Dispensed' : 'Partially Dispense'}
                  </Button>
                </div>
              
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">
                    {allDispensed 
                      ? 'All medicines ready for dispense'
                      : noneDispensed
                      ? 'Select medicines to dispense'
                      : `${medicines.filter(m => m.dispensed).length} of ${medicines.length} items selected`
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No prescription found.</p>
          </div>
        )}
      </div>
    );
