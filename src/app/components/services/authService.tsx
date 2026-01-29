import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface LoginResponse {
  role: string;
  name: string;
  email?: string;
  id?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Login API call
 * @param email - User email
 * @param password - User password
 * @returns User data with role and name
 */
export async function loginApi(email: string, password: string): Promise<LoginResponse> {
  try {
    const response = await axios.post<LoginResponse>(`${API_BASE_URL}/api/login`, {
      email,
      password,
    });

    if (response.data && response.data.role && response.data.name) {
      return response.data;
    }

    throw new Error('Invalid response from server');
  } catch (error: any) {
    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.error || 'Login failed';
      throw new Error(message);
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Unable to connect to server. Please check your connection.');
    } else {
      // Something else happened
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
}

/**
 * Logout function (can be extended for API call if needed)
 */
export function logoutApi(): Promise<void> {
  // Currently just clears local state, but can be extended for server-side logout
  return Promise.resolve();
}

