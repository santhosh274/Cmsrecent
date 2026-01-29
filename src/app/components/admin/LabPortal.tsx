import { useState } from 'react';
import {
  Microscope,
  User,
  Users,
  Upload,
  FileText,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { toast } from 'sonner';

import DashboardLayout from '../shared/DashboardLayout';

interface Patient {
  id: string;
  name: string;
  phone: string;
  familyMembers: FamilyMember[];
}

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
}

interface LabPortalProps {
  userName: string;
  onLogout: () => void;
}

export default function LabPortal({
  userName,
  onLogout,
}: LabPortalProps) {
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedMember, setSelectedMember] = useState('self');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const patients: Patient[] = [
    {
      id: 'p1',
      name: 'John Patient',
      phone: '9876543210',
      familyMembers: [
        { id: 'fm1', name: 'Sarah Patient', relationship: 'Spouse' },
        { id: 'fm2', name: 'Tom Patient', relationship: 'Son' },
      ],
    },
    {
      id: 'p2',
      name: 'Sarah Patient',
      phone: '9876543220',
      familyMembers: [],
    },
    {
      id: 'p3',
      name: 'Mike Patient',
      phone: '9876543230',
      familyMembers: [
        { id: 'fm3', name: 'Lisa Patient', relationship: 'Spouse' },
      ],
    },
  ];

  const selectedPatientData = patients.find(p => p.id === selectedPatient);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (!selectedPatient) {
      toast.error('Please select a patient');
      return;
    }

    if (!selectedFile) {
      toast.error('Please select a file to upload');
      return;
    }

    toast.success(`Report uploaded successfully for ${selectedPatientData?.name}`);
    setSelectedFile(null);

    const input = document.getElementById('file-upload') as HTMLInputElement;
    if (input) input.value = '';
  };

  return (
    <DashboardLayout
      userName={userName}
      userRole="Lab Technician"
      navigation={[]}   // add sidebar items later if needed
      onLogout={onLogout}
    >
      <div className="space-y-6">
        {/* Header */}
        <h1 className="text-3xl text-gray-900 flex items-center gap-3">
          <Microscope className="w-8 h-8 text-purple-600" />
          Lab Technician Portal
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
            <Label>Patient</Label>
            <Select
              value={selectedPatient}
              onValueChange={value => {
                setSelectedPatient(value);
                setSelectedMember('self');
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose patient" />
              </SelectTrigger>
              <SelectContent>
                {patients.map(p => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name} - {p.phone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Family Member */}
        {selectedPatientData && selectedPatientData.familyMembers.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                Family Member
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Label>Family Member</Label>
              <Select value={selectedMember} onValueChange={setSelectedMember}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="self">
                    {selectedPatientData.name} (Self)
                  </SelectItem>
                  {selectedPatientData.familyMembers.map(m => (
                    <SelectItem key={m.id} value={m.id}>
                      {m.name} ({m.relationship})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        )}

        {/* Upload */}
        {selectedPatient && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-green-600" />
                Upload Report
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png,.dcm"
                onChange={handleFileChange}
              />

              <label
                htmlFor="file-upload"
                className="border-2 border-dashed rounded-lg p-6 block text-center cursor-pointer hover:border-purple-400"
              >
                <Upload className="mx-auto mb-2 text-purple-600" />
                <p className="text-sm font-medium">Click to upload</p>
                <p className="text-xs text-gray-500">PDF, JPG, PNG, DICOM (max 10MB)</p>
              </label>

              {selectedFile && (
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded">
                  <FileText className="text-green-600" />
                  <div>
                    <p className="text-sm font-medium">{selectedFile.name}</p>
                    <p className="text-xs">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              )}

              <Button
                onClick={handleUpload}
                disabled={!selectedFile}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                Upload Report
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
