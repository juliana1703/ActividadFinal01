export interface UserProfile {
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
  phoneNumber: string;
  employeeCode: string;
  roles: string[];
  lastLoginAt: string;
  isActive: boolean;
  createdAt: string;
}