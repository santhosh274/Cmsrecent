import { useState, useEffect } from 'react';
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
import { fetchPatients, fetchPatientById, Patient } from '../services/patientService';

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
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loadingPatients, setLoadingPatients] = useState(false);
  const [selectedPatientData, setSelectedPatientData] = useState<Patient | undefined>(undefined);

  // Fetch patient list on mount
  useEffect(() => {
    async function loadPatients() {
      setLoadingPatients(true);
      try {
        const data = await fetchPatients();
        setPatients(data);
      } catch (err) {
        console.error('Failed to fetch patients:', err);
        toast.error('Failed to load patients');
      } finally {
        setLoadingPatients(false);
      }
    }
    loadPatients();
  }, []);

  // Fetch details for selected patient (family members etc.)
  useEffect(() => {
    if (!selectedPatient) {
      setSelectedPatientData(undefined);
      return;
    }
    async function loadPatientDetails() {
      try {
        const data = await fetchPatientById(selectedPatient);
        setSelectedPatientData(data);
      } catch (err) {
        console.error('Failed to fetch patient details:', err);
      }
    }
    loadPatientDetails();
  }, [selectedPatient]);

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
      navigation={[]}
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
                {loadingPatients ? (
                  <SelectItem value="__loading" disabled aria-disabled>
                    Loading patients...
                  </SelectItem>
                ) : patients.length ? (
                  patients.map(p => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name} - {p.phone}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="__none" disabled aria-disabled>
                    No patients found
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Family Member */}
        {selectedPatientData && selectedPatientData.family_members && selectedPatientData.family_members.length > 0 && (
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
                  {selectedPatientData.family_members.map(m => (
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
