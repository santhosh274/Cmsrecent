import axios from 'axios';

export interface Appointment {
  id: string;
  patient_id: string;
  patient_name?: string;
  doctor_id: string;
  doctor_name?: string;
  scheduled_at: string;
  reason: string;
  status: string;
}

const API_PATH = '/api/appointments';

export async function fetchAppointments(): Promise<Appointment[]> {
  const response = await axios.get(API_PATH);
  return response.data;
}

export async function fetchAppointmentsByDoctor(doctorId: string): Promise<Appointment[]> {
  const response = await axios.get(`${API_PATH}/doctor/${doctorId}`);
  return response.data;
}

export async function createAppointment(data: Partial<Appointment>): Promise<Appointment> {
  const response = await axios.post(API_PATH, data);
  return response.data;
}

export async function updateAppointment(id: string, data: Partial<Appointment>): Promise<Appointment> {
  const response = await axios.put(`${API_PATH}/${id}`, data);
  return response.data;
}