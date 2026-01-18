// inside PatientReports.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { FileText, Download } from 'lucide-react';

const mockPatients = [
  { id: 'PT-2026-001234', name: 'John Patient' },
  { id: 'PT-2026-001235', name: 'Jane Doe' },
];

export default function PatientReports() {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();

  const selectedPatient = patientId
    ? mockPatients.find((p) => p.id === patientId) || null
    : null;

  const handlePatientChange = (id: string) => {
    navigate(id ? `/doctor/reports/${id}` : '/doctor/reports');
  };

  if (!selectedPatient) {
    // Patient selection page
    return (
      <div className="space-y-6 p-6 bg-white rounded shadow border border-gray-200 max-w-md">
        <h1 className="text-2xl font-semibold text-gray-900">
          Select a Patient to View Reports
        </h1>
        <select
          className="block w-full p-3 border rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
          value=""
          onChange={(e) => handlePatientChange(e.target.value)}
        >
          <option value="">-- Select Patient --</option>
          {mockPatients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} ({p.id})
            </option>
          ))}
        </select>
      </div>
    );
  }

  // Mock reports for selected patient
  const reports = [
    { id: 'REP-001', testName: 'Blood Test', uploadedOn: '2026-01-05', fileUrl: '#' },
    { id: 'REP-002', testName: 'X-Ray Chest', uploadedOn: '2026-01-06', fileUrl: '#' },
    { id: 'REP-003', testName: 'MRI Brain', uploadedOn: '2026-01-08', fileUrl: '#' },
  ];

  return (
    <div className="space-y-6 p-6 bg-white rounded shadow border border-gray-200">
      <h1 className="text-2xl font-semibold text-gray-900">
        Reports for {selectedPatient.name} ({selectedPatient.id})
      </h1>

      <table className="w-full text-sm border">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-3 text-left">Test Name</th>
            <th className="px-6 py-3 text-left">Uploaded On</th>
            <th className="px-6 py-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id} className="border-b last:border-b-0">
              <td className="px-6 py-4 flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-600" />
                {report.testName}
              </td>
              <td className="px-6 py-4">{report.uploadedOn}</td>
              <td className="px-6 py-4">
                <a
                  href={report.fileUrl}
                  className="inline-flex items-center gap-2 text-blue-600 hover:underline"
                >
                  <Download className="h-4 w-4" />
                  View / Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {reports.length === 0 && (
        <div className="p-6 text-center text-gray-500">
          No reports uploaded for this patient.
        </div>
      )}

      <button
        className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        onClick={() => navigate('/doctor/reports')}
      >
        Back to Patient Selection
      </button>
    </div>
  );
}