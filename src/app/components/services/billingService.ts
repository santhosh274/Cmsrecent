import { getAuthToken } from './authService';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface Bill {
  id: string;
  patient_id: string;
  patient_name?: string;
  amount: number;
  items: Array<{
    description: string;
    quantity: number;
    price: number;
  }>;
  created_at: string;
}

export async function fetchBills(): Promise<Bill[]> {
  const token = getAuthToken();

  const res = await fetch(`${API_BASE_URL}/api/bills`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || 'Could not fetch bills');
  }

  return res.json();
}

export async function fetchBillById(id: string): Promise<Bill> {
  const token = getAuthToken();

  const res = await fetch(`${API_BASE_URL}/api/bills/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || 'Could not fetch bill');
  }

  return res.json();
}

export async function fetchBillsByPatient(patientId: string): Promise<Bill[]> {
  const token = getAuthToken();

  const res = await fetch(`${API_BASE_URL}/api/bills/patient/${patientId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || 'Could not fetch bills');
  }

  return res.json();
}

export async function createBill(data: {
  patient_id: string;
  amount: number;
  items?: Array<{
    description: string;
    quantity: number;
    price: number;
  }>;
}): Promise<Bill> {
  const token = getAuthToken();

  const res = await fetch(`${API_BASE_URL}/api/bills`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || 'Could not create bill');
  }

  return res.json();
}

export async function updateBill(id: string, data: {
  amount?: number;
  items?: Array<{
    description: string;
    quantity: number;
    price: number;
  }>;
}): Promise<Bill> {
  const token = getAuthToken();

  const res = await fetch(`${API_BASE_URL}/api/bills/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || 'Could not update bill');
  }

  return res.json();
}

export async function deleteBill(id: string): Promise<void> {
  const token = getAuthToken();

  const res = await fetch(`${API_BASE_URL}/api/bills/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || 'Could not delete bill');
  }
}
