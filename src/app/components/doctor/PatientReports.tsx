import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FileText, Download } from 'lucide-react';
import { fetchPatients, Patient } from '../services/patientService';
import { fetchLabReports, LabReport } from '../services/labReportService';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';

export default function PatientReports() {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();

  const [patients, setPatients] = useState<Patient[]>([]);
  const [reports, setReports] = useState<LabReport[]>([]);
  const [loadingPatients, setLoadingPatients] = useState(true);
  const [loadingReports, setLoadingReports] = useState(false);

  useEffect(() => {
    async function loadPatients() {
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

  useEffect(() => {
    if (!patientId) {
      setReports([]);
      return;
    }

    async function loadReports() {
      setLoadingReports(true);
      try {
        const allReports = await fetchLabReports();
        // Filter reports for the selected patient
        const patientReports = allReports.filter(r => r.patient_id === patientId);
        setReports(patientReports);
      } catch (err) {
        console.error('Failed to fetch lab reports:', err);
        toast.error('Failed to load reports');
      } finally {
        setLoadingReports(false);
      }
    }
    loadReports();
  }, [patientId]);

  const selectedPatient = patientId
    ? patients.find((p) => p.id === patientId) || null
    : null;

  const handlePatientChange = (id: string) => {
    navigate(id ? `/doctor/reports/${id}` : '/doctor/reports');
  };

  if (!selectedPatient) {
    // Patient selection page
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Select a Patient to View Reports
        </h1>
        
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Select Patient</CardTitle>
          </CardHeader>
          <CardContent>
            <Label>Patient</Label>
            <Select
              value=""
              onValueChange={handlePatientChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="-- Select Patient --" />
              </SelectTrigger>
              <SelectContent>
                {loadingPatients ? (
                  <SelectItem value="__loading" disabled>
                    Loading patients...
                  </SelectItem>
                ) : patients.length > 0 ? (
                  patients.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name} ({p.phone})
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="__none" disabled>
                    No patients found
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">
        Reports for {selectedPatient.name}
      </h1>

      {/* Back button */}
      <button
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        onClick={() => navigate('/doctor/reports')}
      >
        Back to Patient Selection
      </button>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lab Reports</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingReports ? (
            <p className="text-gray-600">Loading reports...</p>
          ) : reports.length > 0 ? (
            <table className="w-full text-sm border">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left">File Name</th>
                  <th className="px-6 py-3 text-left">Uploaded On</th>
                  <th className="px-6 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id} className="border-b last:border-b-0">
                    <td className="px-6 py-4 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-600" />
                      {report.file_name}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(report.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="inline-flex items-center gap-2 text-blue-600 hover:underline"
                        onClick={() => {
                          // In a real app, this would download the file
                          toast.info(`Downloading ${report.file_name}...`);
                        }}
                      >
                        <Download className="h-4 w-4" />
                        View / Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-6 text-center text-gray-500">
              No reports uploaded for this patient.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
