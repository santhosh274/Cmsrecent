import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import BackButton from '../shared/BackButton';
import Breadcrumbs from '../shared/Breadcrumbs';
import { FileText, Download, Calendar, User, Pill, Clock } from 'lucide-react';
import { toast } from 'sonner';

interface Medicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes?: string;
}

interface Prescription {
  id: string;
  prescriptionNumber: string;
  date: Date;
  doctor: {
    name: string;
    specialty: string;
  };
  diagnosis: string;
  medicines: Medicine[];
  additionalNotes?: string;
  status: 'active' | 'completed';
  digitalSignature: string;
}

// Mock data
const mockPrescriptions: Prescription[] = [
  {
    id: '1',
    prescriptionNumber: 'RX-2026-001234',
    date: new Date('2026-01-03'),
    doctor: {
      name: 'Dr. Sarah Johnson',
      specialty: 'General Physician',
    },
    diagnosis: 'Acute Upper Respiratory Tract Infection',
    medicines: [
      {
        name: 'Paracetamol',
        dosage: '500mg',
        frequency: 'Three times daily',
        duration: '5 days',
        notes: 'Take after meals',
      },
      {
        name: 'Azithromycin',
        dosage: '500mg',
        frequency: 'Once daily',
        duration: '3 days',
        notes: 'Complete the full course',
      },
      {
        name: 'Cetirizine',
        dosage: '10mg',
        frequency: 'Once daily',
        duration: '7 days',
        notes: 'Take at bedtime',
      },
    ],
    additionalNotes: 'Rest well, increase fluid intake. Follow-up if symptoms persist beyond 5 days.',
    status: 'active',
    digitalSignature: 'Digitally signed by Dr. Sarah Johnson on Jan 3, 2026',
  },
  {
    id: '2',
    prescriptionNumber: 'RX-2025-012845',
    date: new Date('2025-12-15'),
    doctor: {
      name: 'Dr. Michael Chen',
      specialty: 'Cardiologist',
    },
    diagnosis: 'Essential Hypertension',
    medicines: [
      {
        name: 'Amlodipine',
        dosage: '5mg',
        frequency: 'Once daily',
        duration: '30 days',
        notes: 'Take in the morning',
      },
      {
        name: 'Atorvastatin',
        dosage: '20mg',
        frequency: 'Once daily',
        duration: '30 days',
        notes: 'Take at bedtime',
      },
    ],
    additionalNotes: 'Monitor blood pressure daily. Maintain low-salt diet. Next follow-up in 4 weeks.',
    status: 'completed',
    digitalSignature: 'Digitally signed by Dr. Michael Chen on Dec 15, 2025',
  },
];

export default function MyPrescriptions() {
  const [prescriptions] = useState<Prescription[]>(mockPrescriptions);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const filteredPrescriptions = prescriptions.filter((p) =>
    filter === 'all' ? true : p.status === filter
  );

  const handleDownload = (prescription: Prescription) => {
    toast.success(`Downloading ${prescription.prescriptionNumber}.pdf`);
    // Simulate download
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-6">
        <BackButton />
        <Breadcrumbs
          items={[
            { label: 'Patient Portal', path: '/patient' },
            { label: 'My Prescriptions', path: '/patient/prescriptions' },
          ]}
        />
      </div>

      <div className="mb-6">
        <h1 className="text-2xl text-gray-900 mb-2">My e-Prescriptions</h1>
        <p className="text-gray-600">View and download your digital prescriptions</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
          size="sm"
        >
          All ({prescriptions.length})
        </Button>
        <Button
          variant={filter === 'active' ? 'default' : 'outline'}
          onClick={() => setFilter('active')}
          size="sm"
        >
          Active ({prescriptions.filter((p) => p.status === 'active').length})
        </Button>
        <Button
          variant={filter === 'completed' ? 'default' : 'outline'}
          onClick={() => setFilter('completed')}
          size="sm"
        >
          Completed ({prescriptions.filter((p) => p.status === 'completed').length})
        </Button>
      </div>

      {/* Prescriptions List */}
      <div className="space-y-4">
        {filteredPrescriptions.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No prescriptions found</p>
            </CardContent>
          </Card>
        ) : (
          filteredPrescriptions.map((prescription) => (
            <Card key={prescription.id} className="border-gray-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-lg">{prescription.prescriptionNumber}</CardTitle>
                      <Badge
                        variant={prescription.status === 'active' ? 'default' : 'secondary'}
                        className={
                          prescription.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }
                      >
                        {prescription.status === 'active' ? 'Active' : 'Completed'}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(prescription.date)}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {prescription.doctor.name}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(prescription)}
                    className="gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Diagnosis */}
                <div>
                  <h4 className="text-sm text-gray-700 mb-1">Diagnosis</h4>
                  <p className="text-gray-900">{prescription.diagnosis}</p>
                </div>

                {/* Medicines */}
                <div>
                  <h4 className="text-sm text-gray-700 mb-3 flex items-center gap-2">
                    <Pill className="w-4 h-4" />
                    Medications ({prescription.medicines.length})
                  </h4>
                  <div className="space-y-3">
                    {prescription.medicines.map((medicine, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 border border-gray-200 rounded-lg p-3"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="text-gray-900">{medicine.name}</p>
                            <p className="text-sm text-gray-600">{medicine.dosage}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="w-3 h-3" />
                            <span>{medicine.frequency}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-3 h-3" />
                            <span>{medicine.duration}</span>
                          </div>
                        </div>
                        {medicine.notes && (
                          <p className="text-sm text-blue-600 mt-2 italic">
                            Note: {medicine.notes}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Notes */}
                {prescription.additionalNotes && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <h4 className="text-sm text-blue-900 mb-1">Additional Instructions</h4>
                    <p className="text-sm text-blue-800">{prescription.additionalNotes}</p>
                  </div>
                )}

                {/* Digital Signature */}
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FileText className="w-4 h-4" />
                    <span>{prescription.digitalSignature}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
