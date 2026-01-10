import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Microscope, User, Users, Upload, FileText } from 'lucide-react';
import BackButton from '../shared/BackButton';
import { toast } from 'sonner';

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

export default function LabPortal() {
  const [selectedPatient, setSelectedPatient] = useState<string>('');
  const [selectedMember, setSelectedMember] = useState<string>('self');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const patients: Patient[] = [
    { 
      id: 'p1', 
      name: 'John Patient', 
      phone: '9876543210',
      familyMembers: [
        { id: 'fm1', name: 'Sarah Patient', relationship: 'Spouse' },
        { id: 'fm2', name: 'Tom Patient', relationship: 'Son' },
      ]
    },
    { 
      id: 'p2', 
      name: 'Sarah Patient', 
      phone: '9876543220',
      familyMembers: []
    },
    { 
      id: 'p3', 
      name: 'Mike Patient', 
      phone: '9876543230',
      familyMembers: [
        { id: 'fm3', name: 'Lisa Patient', relationship: 'Spouse' },
      ]
    },
  ];

  const selectedPatientData = patients.find(p => p.id === selectedPatient);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size (max 10MB)
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

    // Simulate upload
    toast.success(`Report uploaded successfully for ${selectedPatientData?.name}`);
    setSelectedFile(null);
    
    // Reset file input
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <BackButton to="/admin" />
        <h1 className="text-3xl text-gray-900 mt-4 flex items-center gap-3">
          <Microscope className="w-8 h-8 text-purple-600" />
          Lab Technician Portal
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
            <Select value={selectedPatient} onValueChange={(value) => {
              setSelectedPatient(value);
              setSelectedMember('self');
            }}>
              <SelectTrigger id="patient">
                <SelectValue placeholder="Choose patient" />
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

      {/* Family Member Selection */}
      {selectedPatient && selectedPatientData && selectedPatientData.familyMembers.length > 0 && (
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Family Member
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="member">Family Member</Label>
              <Select value={selectedMember} onValueChange={setSelectedMember}>
                <SelectTrigger id="member">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="self">{selectedPatientData.name} (Self)</SelectItem>
                  {selectedPatientData.familyMembers.map(member => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.name} ({member.relationship})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Report Upload */}
      {selectedPatient && (
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-green-600" />
              Upload Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* File Upload */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png,.dcm"
                  onChange={handleFileChange}
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                      <Upload className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Click to upload</p>
                      <p className="text-xs text-gray-600">PDF, JPG, PNG, DICOM (max 10MB)</p>
                    </div>
                  </div>
                </label>
              </div>

              {/* Selected File */}
              {selectedFile && (
                <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <FileText className="w-5 h-5 text-green-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-green-900">{selectedFile.name}</p>
                    <p className="text-xs text-green-700">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                </div>
              )}

              {/* Upload Button */}
              <Button 
                onClick={handleUpload}
                disabled={!selectedFile}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Report
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {!selectedPatient && (
        <div className="text-center py-12 text-gray-500">
          <Microscope className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p>Select a patient to upload reports</p>
        </div>
      )}

      {/* Recent Uploads */}
      {selectedPatient && (
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Recent Uploads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Blood_Test_Report.pdf</p>
                    <p className="text-xs text-gray-600">Uploaded 2 hours ago</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">X_Ray_Chest.jpg</p>
                    <p className="text-xs text-gray-600">Uploaded 1 day ago</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}