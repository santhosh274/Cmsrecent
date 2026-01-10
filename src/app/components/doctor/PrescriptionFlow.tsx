import { useState } from 'react';
import { Search, Plus, AlertTriangle, Check, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';

const medicineDatabase = [
  { id: '1', name: 'Amoxicillin 500mg', category: 'Antibiotic', inStock: true },
  { id: '2', name: 'Paracetamol 650mg', category: 'Pain Relief', inStock: true },
  { id: '3', name: 'Ibuprofen 400mg', category: 'Pain Relief', inStock: false },
  { id: '4', name: 'Omeprazole 20mg', category: 'Antacid', inStock: true },
  { id: '5', name: 'Metformin 500mg', category: 'Diabetes', inStock: true },
];

interface PrescribedMedicine {
  medicine: typeof medicineDatabase[0];
  dosage: string;
  frequency: string;
  duration: string;
}

export default function PrescriptionFlow() {
  const [searchQuery, setSearchQuery] = useState('');
  const [prescribed, setPrescribed] = useState<PrescribedMedicine[]>([]);
  const [selectedPatient, setSelectedPatient] = useState('Emma Davis');
  const [showSuccess, setShowSuccess] = useState(false);

  const filteredMedicines = medicineDatabase.filter(med =>
    med.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addMedicine = (medicine: typeof medicineDatabase[0]) => {
    setPrescribed([...prescribed, {
      medicine,
      dosage: '1 tablet',
      frequency: 'Twice daily',
      duration: '5 days'
    }]);
    setSearchQuery('');
  };

  const removeMedicine = (index: number) => {
    setPrescribed(prescribed.filter((_, i) => i !== index));
  };

  const handleSendPrescription = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setPrescribed([]);
    }, 3000);
  };

  const hasOutOfStockMedicine = prescribed.some(p => !p.medicine.inStock);

  if (showSuccess) {
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
              <h2 className="text-2xl text-gray-900">Prescription Sent!</h2>
              <p className="text-gray-600">Prescription has been successfully sent to pharmacy and patient</p>
              
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mt-4">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>Patient will receive this via WhatsApp</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-gray-900">Quick Prescribe</h1>
        <p className="text-gray-600 mt-2">Create and send prescriptions efficiently</p>
      </div>

      {/* Patient Selection */}
      <Card className="border-gray-200 bg-gray-50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Current Patient</p>
              <p className="text-lg text-gray-900 mt-1">{selectedPatient}</p>
            </div>
            <Button variant="outline">Change Patient</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Medicine Search */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Search Medicines</CardTitle>
            <CardDescription>Add medicines from the database</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search medicine name..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {searchQuery && (
              <div className="space-y-2">
                {filteredMedicines.length > 0 ? (
                  filteredMedicines.map((medicine) => (
                    <div
                      key={medicine.id}
                      className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => addMedicine(medicine)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{medicine.name}</p>
                          <p className="text-sm text-gray-600">{medicine.category}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {medicine.inStock ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                              In Stock
                            </Badge>
                          ) : (
                            <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-100">
                              Out of Stock
                            </Badge>
                          )}
                          <Plus className="h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-600 text-center py-4">No medicines found</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Prescription Summary */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Prescription Summary</CardTitle>
            <CardDescription>
              {prescribed.length} medicine(s) added
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {prescribed.length === 0 ? (
              <div className="text-center py-8 text-gray-600">
                <p className="text-sm">No medicines added yet</p>
                <p className="text-sm mt-1">Search and add medicines from the left panel</p>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {prescribed.map((item, index) => (
                    <div key={index} className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="text-sm text-gray-900">{item.medicine.name}</p>
                            {!item.medicine.inStock && (
                              <AlertTriangle className="h-4 w-4 text-red-600" />
                            )}
                          </div>
                          <div className="mt-2 space-y-1">
                            <p className="text-sm text-gray-600">
                              <span className="text-gray-500">Dosage:</span> {item.dosage}
                            </p>
                            <p className="text-sm text-gray-600">
                              <span className="text-gray-500">Frequency:</span> {item.frequency}
                            </p>
                            <p className="text-sm text-gray-600">
                              <span className="text-gray-500">Duration:</span> {item.duration}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeMedicine(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {hasOutOfStockMedicine && (
                  <Card className="border-red-200 bg-red-50">
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-red-900">Out of Stock Warning</p>
                          <p className="text-sm text-red-700 mt-1">
                            Some medicines are currently out of stock. Patient will be notified to check alternative pharmacies.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Separator />

                <Button 
                  onClick={handleSendPrescription}
                  className="w-full gap-2"
                  disabled={prescribed.length === 0}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  Send to Pharmacy & WhatsApp
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
