import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import BackButton from '../shared/BackButton';
import Breadcrumbs from '../shared/Breadcrumbs';
import { Plus, X, FileText, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface Medicine {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes: string;
}

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  contact: string;
}

interface CreatePrescriptionProps {
  patient: Patient;
  doctorName: string;
}

export default function CreatePrescription({ patient, doctorName }: CreatePrescriptionProps) {
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState<Medicine[]>([
    { id: '1', name: '', dosage: '', frequency: '', duration: '', notes: '' },
  ]);
  const [diagnosis, setDiagnosis] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const addMedicine = () => {
    setMedicines([
      ...medicines,
      {
        id: Date.now().toString(),
        name: '',
        dosage: '',
        frequency: '',
        duration: '',
        notes: '',
      },
    ]);
  };

  const removeMedicine = (id: string) => {
    if (medicines.length > 1) {
      setMedicines(medicines.filter((m) => m.id !== id));
    }
  };

  const updateMedicine = (id: string, field: keyof Medicine, value: string) => {
    setMedicines(
      medicines.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const validMedicines = medicines.filter(m => m.name && m.dosage && m.frequency && m.duration);
    if (validMedicines.length === 0) {
      toast.error('Please add at least one complete medicine entry');
      return;
    }

    if (!diagnosis) {
      toast.error('Please enter diagnosis');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      toast.success('e-Prescription created and sent to patient');
      
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    }, 1500);
  };

  if (showSuccess) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="text-center py-12">
          <CardContent>
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-2xl text-gray-900 mb-2">Prescription Created Successfully</h2>
            <p className="text-gray-600 mb-4">
              e-Prescription has been digitally signed and sent to {patient.name}
            </p>
            <div className="flex gap-3 justify-center">
              <Button onClick={() => navigate(-1)}>Back to Patient</Button>
              <Button variant="outline" onClick={() => window.print()}>
                <FileText className="w-4 h-4 mr-2" />
                Print Prescription
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <BackButton />
        <Breadcrumbs
          items={[
            { label: 'Doctor', path: '/doctor' },
            { label: 'Patients', path: '/doctor/patients' },
            { label: 'Create Prescription', path: '/doctor/prescription/new' },
          ]}
        />
      </div>

      <div className="mb-6">
        <h1 className="text-2xl text-gray-900 mb-2">Create e-Prescription</h1>
        <p className="text-gray-600">Digital prescription for {patient.name}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Patient Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Patient Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Patient ID</p>
                <p className="text-gray-900">{patient.id}</p>
              </div>
              <div>
                <p className="text-gray-600">Name</p>
                <p className="text-gray-900">{patient.name}</p>
              </div>
              <div>
                <p className="text-gray-600">Age / Gender</p>
                <p className="text-gray-900">{patient.age}Y / {patient.gender}</p>
              </div>
              <div>
                <p className="text-gray-600">Contact</p>
                <p className="text-gray-900">{patient.contact}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Diagnosis */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Diagnosis</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Enter diagnosis and symptoms..."
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              rows={3}
              required
            />
          </CardContent>
        </Card>

        {/* Medicines */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Medications</CardTitle>
            <Button type="button" variant="outline" size="sm" onClick={addMedicine}>
              <Plus className="w-4 h-4 mr-2" />
              Add Medicine
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {medicines.map((medicine, index) => (
              <div key={medicine.id} className="border border-gray-200 rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm text-gray-700">Medicine {index + 1}</h4>
                  {medicines.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeMedicine(medicine.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Medicine Name *</Label>
                    <Input
                      placeholder="e.g., Paracetamol"
                      value={medicine.name}
                      onChange={(e) => updateMedicine(medicine.id, 'name', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Dosage *</Label>
                    <Input
                      placeholder="e.g., 500mg"
                      value={medicine.dosage}
                      onChange={(e) => updateMedicine(medicine.id, 'dosage', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Frequency *</Label>
                    <Select
                      value={medicine.frequency}
                      onValueChange={(value) => updateMedicine(medicine.id, 'frequency', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Once daily">Once daily</SelectItem>
                        <SelectItem value="Twice daily">Twice daily</SelectItem>
                        <SelectItem value="Three times daily">Three times daily</SelectItem>
                        <SelectItem value="Four times daily">Four times daily</SelectItem>
                        <SelectItem value="Every 4 hours">Every 4 hours</SelectItem>
                        <SelectItem value="Every 6 hours">Every 6 hours</SelectItem>
                        <SelectItem value="Before meals">Before meals</SelectItem>
                        <SelectItem value="After meals">After meals</SelectItem>
                        <SelectItem value="As needed">As needed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Duration *</Label>
                    <Select
                      value={medicine.duration}
                      onValueChange={(value) => updateMedicine(medicine.id, 'duration', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3 days">3 days</SelectItem>
                        <SelectItem value="5 days">5 days</SelectItem>
                        <SelectItem value="7 days">7 days</SelectItem>
                        <SelectItem value="10 days">10 days</SelectItem>
                        <SelectItem value="14 days">14 days</SelectItem>
                        <SelectItem value="21 days">21 days</SelectItem>
                        <SelectItem value="30 days">30 days</SelectItem>
                        <SelectItem value="Until next visit">Until next visit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Special Instructions (Optional)</Label>
                  <Input
                    placeholder="e.g., Take with food, avoid alcohol"
                    value={medicine.notes}
                    onChange={(e) => updateMedicine(medicine.id, 'notes', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Additional Notes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Additional Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Enter any additional instructions, dietary advice, follow-up recommendations..."
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              rows={3}
            />
          </CardContent>
        </Card>

        {/* Digital Signature Info */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm text-blue-900 mb-1">Digital Signature</p>
                <p className="text-sm text-blue-700">
                  This prescription will be digitally signed by Dr. {doctorName} and sent directly to the patient's portal.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700">
            {isSubmitting ? 'Creating...' : 'Create & Send Prescription'}
          </Button>
        </div>
      </form>
    </div>
  );
}
