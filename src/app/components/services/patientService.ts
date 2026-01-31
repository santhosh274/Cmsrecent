import axios from 'axios';

export interface Patient {
  id: string;
  name: string;
  phone: string;
  email?: string;
}

// IMPORTANT: This must match the backend route in users.js
const USER_API = '/api/users';

export async function fetchPatients(): Promise<Patient[]> {
  try {
    // Calls router.get('/patients', ...) in users.js
    const response = await axios.get(`${USER_API}/patients`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Could not fetch patients');
  }
}

export async function fetchPatientById(id: string): Promise<Patient> {
  const response = await axios.get(`${USER_API}/${id}`);
  return response.data;
}