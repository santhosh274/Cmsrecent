import { getAuthToken } from './authService';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface Prescription {
  id: string;
  patient_id: string;
  patient_name?: string;
  doctor_id: string;
  doctor_name?: string;
  medicines: Array<{
    name: string;
    dosage: string;
    quantity: number;
  }>;
  notes: string;
  created_at: string;
}

export interface PrescriptionWithDetails extends Prescription {
  patient: {
    id: string;
    name: string;
    phone: string;
  };
  doctor: {
    id: string;
    name: string;
  };
}

export async function fetchPrescriptions(): Promise<Prescription[]> {
  const token = getAuthToken();

  const res = await fetch(`${API_BASE_URL}/api/prescriptions`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || 'Could not fetch prescriptions');
  }

  return res.json();
}

export async function fetchPrescriptionById(id: string): Promise<Prescription> {
  const token = getAuthToken();

  const res = await fetch(`${API_BASE_URL}/api/prescriptions/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || 'Could not fetch prescription');
  }

  return res.json();
}

export async function fetchPrescriptionsByPatient(patientId: string): Promise<Prescription[]> {
  const token = getAuthToken();

  const res = await fetch(`${API_BASE_URL}/api/prescriptions/patient/${patientId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || 'Could not fetch prescriptions');
  }

  return res.json();
}

export async function fetchPrescriptionsByDoctor(doctorId: string): Promise<Prescription[]> {
  const token = getAuthToken();

  const res = await fetch(`${API_BASE_URL}/api/prescriptions/doctor/${doctorId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || 'Could not fetch prescriptions');
  }

  return res.json();
}

export async function createPrescription(data: {
  patient_id: string;
  doctor_id: string;
  medicines: Array<{
    name: string;
    dosage: string;
    quantity: number;
  }>;
  notes?: string;
}): Promise<Prescription> {
  const token = getAuthToken();

  const res = await fetch(`${API_BASE_URL}/api/prescriptions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || 'Could not create prescription');
  }

  return res.json();
}

export async function updatePrescription(id: string, data: {
  medicines?: Array<{
    name: string;
    dosage: string;
    quantity: number;
  }>;
  notes?: string;
}): Promise<Prescription> {
  const token = getAuthToken();

  const res = await fetch(`${API_BASE_URL}/api/prescriptions/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || 'Could not update prescription');
  }

  return res.json();
}

export async function deletePrescription(id: string): Promise<void> {
  const token = getAuthToken();

  const res = await fetch(`${API_BASE_URL}/api/prescriptions/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || 'Could not delete prescription');
  }
}
