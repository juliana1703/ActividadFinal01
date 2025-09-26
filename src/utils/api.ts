import { LoginRequest, LoginResponse } from '../types/auth';
import { storageManager } from './storage';
import { User } from '../types/auth';

const API_BASE_URL = import.meta.env.VITE_API_URL
  ? 'https://lab05webapiml20-amhucufsctatapgu.canadacentral-01.azurewebsites.net/api'
  : 'https://lab05webapiml20-amhucufsctatapgu.canadacentral-01.azurewebsites.net/api';

interface ApiConfig extends RequestInit {
  requiresAuth?: boolean;
}

class ApiClient {
  private async makeRequest<T>(
    endpoint: string, 
    config: ApiConfig = {}
  ): Promise<T> {
    const { requiresAuth = true, ...fetchConfig } = config;
    
    const url = `${API_BASE_URL}${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'accept': 'application/json',
      ...((fetchConfig.headers as Record<string, string>) || {})
    };

    if (requiresAuth) {
      const { token } = storageManager.getCurrentTokens();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const response = await fetch(url, {
      ...fetchConfig,
      headers,
    });

    if (response.status === 401 && requiresAuth) {
      // Token might be expired, try to refresh
      const refreshed = await this.refreshToken();
      if (refreshed) {
        // Retry the original request
        return this.makeRequest(endpoint, config);
      } else {
        // Refresh failed, redirect to login
        storageManager.clearAuth();
        window.location.href = '/login';
        throw new Error('Authentication failed');
      }
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Error response from API:', {
        status: response.status,
        statusText: response.statusText,
        errorData,
        url: response.url
      });
      throw new Error(errorData.message || errorData.title || `HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  private async refreshToken(): Promise<boolean> {
    try {
      const { refreshToken, rememberMe } = storageManager.getCurrentTokens();
      
      if (!refreshToken) return false;

      const response = await fetch(`${API_BASE_URL}/Authentication/refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) return false;

      const data = await response.json();
      
      // Update stored tokens
      storageManager.setToken(data.token, rememberMe);
      storageManager.setRefreshToken(data.refreshToken, rememberMe);
      
      return true;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return false;
    }
  }

async login(credentials: LoginRequest): Promise<LoginResponse> {
  return this.makeRequest<LoginResponse>('/Authentication/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
    requiresAuth: false,
  });
}

async register(userData: any) {
  return this.makeRequest('/Authentication/register', {
    method: 'POST',
    body: JSON.stringify(userData),
    requiresAuth: false,
  });
}



async resetPassword(email: string) {
  return this.makeRequest('/Authentication/forgot-password', {   
    method: 'POST',
    body: JSON.stringify({ email }),
    requiresAuth: false,
  });
}

async changePassword(passwordData: any) {
  return this.makeRequest('/Authentication/change-password', {   
    method: 'POST',
    body: JSON.stringify(passwordData),
  });
}

async getUserProfile() {
  return this.makeRequest('/Authentication/profile');   
}

async updateProfile(userData: Partial<User>): Promise<User> {
  return this.makeRequest<User>('/Authentication/profile', {  
    method: 'PUT',
    body: JSON.stringify(userData),
  });
}

  // Generic CRUD operations
  async get<T>(endpoint: string): Promise<T> {
    return this.makeRequest(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.makeRequest(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.makeRequest(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.makeRequest(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();