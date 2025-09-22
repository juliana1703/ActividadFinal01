export interface LoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  tipoIdentificacion: string;
  numeroIdentificacion: string;
  names: string;
  surnames: string;
  fechaNacimiento: string;
  sexo: string;
  ciudad: string;
  pais: string;
  direccion: string;
  phoneNumber: string;
  department: string;
  employeeCode: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface LoginResponse {
  isAuthenticated: boolean;
  token: string;
  refreshToken: string;
  tokenExpiration: string;
  message: string;
  user: User;
  errors: string[];
}

export interface User {
  id: string;
  email: string;
  userName: string;
  tipoIdentificacion: string;
  numeroIdentificacion: string;
  names: string;
  surnames: string;
  fullName: string;
  fechaNacimiento: string;
  sexo: string;
  ciudad: string;
  pais: string;
  direccion: string;
  department: string;
  employeeCode: string;
  roles: string[];
  lastLoginAt: string;
  isActive: boolean;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  rememberMe: boolean;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message: string;
  errors: string[];
}