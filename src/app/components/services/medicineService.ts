import { getAuthToken } from './authService';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface Medicine {
  id: string;
  name: string;
  stock: number;
  price: number;
  created_at: string;
}

export async function fetchMedicines(): Promise<Medicine[]> {
  const token = getAuthToken();

  const res = await fetch(`${API_BASE_URL}/api/medicines`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || 'Could not fetch medicines');
  }

  return res.json();
}

export async function fetchMedicineById(id: string): Promise<Medicine> {
  const token = getAuthToken();

  const res = await fetch(`${API_BASE_URL}/api/medicines/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || 'Could not fetch medicine');
  }

  return res.json();
}

export async function createMedicine(data: {
  name: string;
  stock?: number;
  price?: number;
}): Promise<Medicine> {
  const token = getAuthToken();

  const res = await fetch(`${API_BASE_URL}/api/medicines`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || 'Could not create medicine');
  }

  return res.json();
}

export async function updateMedicine(id: string, data: {
  name?: string;
  stock?: number;
  price?: number;
}): Promise<Medicine> {
  const token = getAuthToken();

  const res = await fetch(`${API_BASE_URL}/api/medicines/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || 'Could not update medicine');
  }

  return res.json();
}

export async function deleteMedicine(id: string): Promise<void> {
  const token = getAuthToken();

  const res = await fetch(`${API_BASE_URL}/api/medicines/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || 'Could not delete medicine');
  }
}
