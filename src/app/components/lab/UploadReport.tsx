import { useState } from 'react';
import { Upload, FileText, Check, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';

const patients = [
  { id: '1', name: 'John Smith', testType: 'Blood Test', date: 'Jan 2, 2026' },
  { id: '2', name: 'Emma Davis', testType: 'X-Ray Chest', date: 'Dec 28, 2025' },
  { id: '3', name: 'Michael Brown', testType: 'ECG', date: 'Dec 20, 2025' },
];

export default function UploadReport() {
  const [selectedPatient, setSelectedPatient] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setUploaded(true);
      setTimeout(() => {
        setUploaded(false);
        setSelectedPatient('');
        setUploadedFile(null);
      }, 3000);
    }, 1500);
  };

  if (uploaded) {
    const patient = patients.find(p => p.id === selectedPatient);
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
              <h2 className="text-2xl text-gray-900">Report Uploaded Successfully!</h2>
              <p className="text-gray-600">Report has been uploaded for {patient?.name}</p>
              
              <div className="mt-4 p-4 bg-gray-50 rounded-lg text-left space-y-2">
                <p className="text-sm"><span className="text-gray-600">Patient:</span> <span className="text-gray-900">{patient?.name}</span></p>
                <p className="text-sm"><span className="text-gray-600">Test Type:</span> <span className="text-gray-900">{patient?.testType}</span></p>
                <p className="text-sm"><span className="text-gray-600">File:</span> <span className="text-gray-900">{uploadedFile?.name}</span></p>
              </div>

              <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mt-4">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>WhatsApp delivery automated</span>
              </div>
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
        <h1 className="text-3xl text-gray-900">Upload Report</h1>
        <p className="text-gray-600 mt-2">Upload test reports for patients</p>
      </div>

      {/* Info Box */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-blue-900">Automated Delivery</p>
              <p className="text-sm text-blue-700 mt-1">
                Reports are automatically delivered to patients via WhatsApp once uploaded. No manual notification required.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient Selection */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Select Patient</CardTitle>
            <CardDescription>Choose patient for report upload</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search patient name..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  onClick={() => setSelectedPatient(patient.id)}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedPatient === patient.id
                      ? 'border-gray-900 bg-gray-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-900">{patient.name}</p>
                      <p className="text-sm text-gray-600">{patient.testType}</p>
                      <p className="text-xs text-gray-500 mt-1">{patient.date}</p>
                    </div>
                    {selectedPatient === patient.id && (
                      <Check className="h-5 w-5 text-gray-900" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* File Upload */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Upload Report File</CardTitle>
            <CardDescription>
              {selectedPatient 
                ? 'Upload PDF report file'
                : 'Select a patient first'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="file">Report File (PDF)</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                <input
                  id="file"
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleFileChange}
                  disabled={!selectedPatient}
                />
                <label
                  htmlFor="file"
                  className={`cursor-pointer ${!selectedPatient ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                  {uploadedFile ? (
                    <>
                      <p className="text-sm text-gray-900">{uploadedFile.name}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {(uploadedFile.size / 1024).toFixed(2)} KB
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500 mt-1">PDF files only</p>
                    </>
                  )}
                </label>
              </div>
            </div>

            {selectedPatient && uploadedFile && (
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      Ready to Upload
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Patient: {patients.find(p => p.id === selectedPatient)?.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    File: {uploadedFile.name}
                  </p>
                </div>

                <Button 
                  onClick={handleUpload} 
                  disabled={uploading}
                  className="w-full"
                >
                  {uploading ? 'Uploading...' : 'Upload Report'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
