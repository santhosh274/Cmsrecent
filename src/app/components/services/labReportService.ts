import { getAuthToken } from './authService';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface LabReport {
  id: string;
  patient_id: string;
  patient_name?: string;
  uploaded_by: string;
  uploaded_by_name?: string;
  file_name: string;
  metadata?: Record<string, any>;
  created_at: string;
}

export interface LabReportWithPatient extends LabReport {
  patient: {
    id: string;
    name: string;
    phone: string;
  };
}

export async function fetchLabReports(): Promise<LabReport[]> {
  const token = getAuthToken();

  const res = await fetch(`${API_BASE_URL}/api/lab-reports`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || 'Could not fetch lab reports');
  }

  return res.json();
}

export async function fetchLabReportById(id: string): Promise<LabReport> {
  const token = getAuthToken();

  const res = await fetch(`${API_BASE_URL}/api/lab-reports/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || 'Could not fetch lab report');
  }

  return res.json();
}

export async function fetchLabReportsByPatient(patientId: string): Promise<LabReport[]> {
  const token = getAuthToken();

  const res = await fetch(`${API_BASE_URL}/api/lab-reports/patient/${patientId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || 'Could not fetch lab reports');
  }

  return res.json();
}

export async function uploadLabReport(patientId: string, file: File, category: string = 'general'): Promise<LabReport> {
  const token = getAuthToken();
  const formData = new FormData();
  formData.append('file', file);
  formData.append('patient_id', patientId);
  formData.append('category', category);

  const res = await fetch(`${API_BASE_URL}/api/files/upload`, {
    method: 'POST',
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: formData,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || 'Could not upload file');
  }

  return res.json();
}

export async function createLabReport(data: {
  patient_id: string;
  uploaded_by: string;
  file_name: string;
  metadata?: Record<string, any>;
}): Promise<LabReport> {
  const token = getAuthToken();

  const res = await fetch(`${API_BASE_URL}/api/lab-reports`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || 'Could not create lab report');
  }

  return res.json();
}

export async function updateLabReport(id: string, data: {
  file_name?: string;
  metadata?: Record<string, any>;
}): Promise<LabReport> {
  const token = getAuthToken();

  const res = await fetch(`${API_BASE_URL}/api/lab-reports/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || 'Could not update lab report');
  }

  return res.json();
}

export async function deleteLabReport(id: string): Promise<void> {
  const token = getAuthToken();

  const res = await fetch(`${API_BASE_URL}/api/lab-reports/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || 'Could not delete lab report');
  }
}

export async function downloadFile(fileName: string): Promise<Blob> {
  const token = getAuthToken();

  const res = await fetch(`${API_BASE_URL}/api/files/${fileName}`, {
    method: 'GET',
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!res.ok) {
    throw new Error('Could not download file');
  }

  return res.blob();
}
