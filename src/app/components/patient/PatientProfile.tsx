import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import BackButton from '../shared/BackButton';
import Breadcrumbs from '../shared/Breadcrumbs';
import FileUploadWithPreview, { UploadedFile } from '../shared/FileUploadWithPreview';
import { User, Phone, Mail, MapPin, Calendar, Save, Edit2 } from 'lucide-react';
import { toast } from 'sonner';

interface PatientData {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  age: number;
  gender: string;
  height: string; // in cm
  weight: string; // in kg
  bloodGroup: string;
  medicalHistory: string;
}

export default function PatientProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [patientData, setPatientData] = useState<PatientData>({
    id: 'PT-2026-001234',
    name: 'John Patient',
    email: 'john.patient@email.com',
    phone: '+91 98765 43210',
    address: '123 Medical Street, Healthcare City, HC 12345',
    dateOfBirth: '1990-05-15',
    age: 35,
    gender: 'Male',
    height: '175',
    weight: '70',
    bloodGroup: 'B+',
    medicalHistory: 'No known chronic conditions. Allergic to penicillin.',
  });

  const [editedData, setEditedData] = useState<PatientData>(patientData);
  const [medicalReports, setMedicalReports] = useState<UploadedFile[]>([
    {
      id: '1',
      name: 'Blood_Test_Report_Dec2025.pdf',
      size: 245600,
      type: 'application/pdf',
      uploadDate: new Date('2025-12-20'),
    },
    {
      id: '2',
      name: 'X-Ray_Chest_Nov2025.pdf',
      size: 512000,
      type: 'application/pdf',
      uploadDate: new Date('2025-11-15'),
    },
  ]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData(patientData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData(patientData);
  };

  const handleSave = () => {
    setPatientData(editedData);
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  const handleChange = (field: keyof PatientData, value: string) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  const calculateBMI = () => {
    const heightInMeters = parseFloat(editedData.height) / 100;
    const weightInKg = parseFloat(editedData.weight);
    if (heightInMeters > 0 && weightInKg > 0) {
      const bmi = weightInKg / (heightInMeters * heightInMeters);
      return bmi.toFixed(1);
    }
    return 'N/A';
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-6">
        <BackButton />
        <Breadcrumbs
          items={[
            { label: 'Patient Portal', path: '/patient' },
            { label: 'My Profile', path: '/patient/profile' },
          ]}
        />
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your personal and medical information</p>
        </div>
        {!isEditing && (
          <Button onClick={handleEdit} className="gap-2">
            <Edit2 className="w-4 h-4" />
            Edit Profile
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Patient ID</Label>
                <Input value={patientData.id} disabled />
              </div>
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input value={patientData.name} disabled />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={isEditing ? editedData.email : patientData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={isEditing ? editedData.phone : patientData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">
                <MapPin className="w-4 h-4 inline mr-2" />
                Address
              </Label>
              <Textarea
                id="address"
                value={isEditing ? editedData.address : patientData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                disabled={!isEditing}
                rows={2}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Date of Birth
                </Label>
                <Input value={patientData.dateOfBirth} disabled />
              </div>
              <div className="space-y-2">
                <Label>Age</Label>
                <Input value={`${patientData.age} years`} disabled />
              </div>
              <div className="space-y-2">
                <Label>Gender</Label>
                <Input value={patientData.gender} disabled />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Health Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Health Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  value={isEditing ? editedData.height : patientData.height}
                  onChange={(e) => handleChange('height', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={isEditing ? editedData.weight : patientData.weight}
                  onChange={(e) => handleChange('weight', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label>BMI</Label>
                <Input value={calculateBMI()} disabled />
              </div>
              <div className="space-y-2">
                <Label>Blood Group</Label>
                <Input value={patientData.bloodGroup} disabled />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <strong>Note:</strong> BMI is calculated automatically based on your height and weight.
                {parseFloat(calculateBMI()) < 18.5 && ' Your BMI indicates underweight.'}
                {parseFloat(calculateBMI()) >= 18.5 && parseFloat(calculateBMI()) < 25 && ' Your BMI is in the normal range.'}
                {parseFloat(calculateBMI()) >= 25 && parseFloat(calculateBMI()) < 30 && ' Your BMI indicates overweight.'}
                {parseFloat(calculateBMI()) >= 30 && ' Your BMI indicates obesity.'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Medical History */}
        <Card>
          <CardHeader>
            <CardTitle>Medical History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="medicalHistory">Known Conditions & Allergies</Label>
              <Textarea
                id="medicalHistory"
                value={patientData.medicalHistory}
                rows={4}
                disabled
                className="bg-gray-50"
              />
              <p className="text-sm text-gray-600">
                Medical history is read-only. Contact your doctor to update.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Medical Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Medical Reports & Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <FileUploadWithPreview
              files={medicalReports}
              onFilesChange={setMedicalReports}
              accept=".pdf,.png,.jpg,.jpeg"
              maxSize={10}
              label="Upload medical reports, test results, or other documents"
            />
          </CardContent>
        </Card>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="gap-2 bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
