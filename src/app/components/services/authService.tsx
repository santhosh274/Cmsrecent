import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
axios.defaults.baseURL = API_BASE_URL;

// Interceptor for real-time deactivation
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      delete axios.defaults.headers.common['Authorization'];
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export interface LoginResponse {
  token: string;
  role: string;
  name: string;
  email?: string;
  id?: string;
}
export async function loginApi(email: string, password: string): Promise<LoginResponse> {
  try {
    const response = await axios.post<LoginResponse>('/api/auth/login', { email, password });
    if (response.data && response.data.token) {
      setAuthToken(response.data.token);
      return response.data;
    }
    throw new Error('Invalid response from server');
  } catch (error: any) {
    const message = error.response?.data?.error || 'Login failed';
    throw new Error(message);
  }
}

export function setAuthToken(token?: string | null) {
  if (token) {
    // 1. Set for the global axios instance
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    // 2. Persist for page refreshes
    localStorage.setItem('auth_token', token);
    console.log("Auth token set successfully"); // Debug log
  } else {
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
  }
}

// CRITICAL FIX: Ensure this is exported
export function getAuthToken() {
  return localStorage.getItem('auth_token');
}

export function logoutApi(): Promise<void> {
  setAuthToken(null);
  localStorage.removeItem('user_data');
  return Promise.resolve();
}