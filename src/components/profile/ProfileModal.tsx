import React, { useState, useEffect } from 'react';
import { X, User, Mail, Calendar, MapPin, Building, Shield, Clock } from 'lucide-react';
import { apiClient } from '../../utils/api';
import { UserProfile } from '../../types/user';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchProfile();
    }
  }, [isOpen]);

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const profileData = await apiClient.getUserProfile();
      setProfile(profileData);
    } catch (err) {
      setError('Error al cargar el perfil del usuario');
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const formatDateTime = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Mi Perfil</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <div className="text-red-600 mb-2">⚠️</div>
              <p className="text-red-600">{error}</p>
              <button
                onClick={fetchProfile}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Reintentar
              </button>
            </div>
          ) : profile ? (
            <div className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-600" />
                  Información Personal
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Nombre Completo
                    </label>
                    <p className="text-gray-900 font-medium">{profile.fullName}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Usuario
                    </label>
                    <p className="text-gray-900 font-medium">{profile.userName}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Nombres
                    </label>
                    <p className="text-gray-900 font-medium">{profile.names}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Apellidos
                    </label>
                    <p className="text-gray-900 font-medium">{profile.surnames}</p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-blue-600" />
                  Información de Contacto
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Correo Electrónico
                    </label>
                    <p className="text-gray-900 font-medium">{profile.email}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Teléfono/Dirección
                    </label>
                    <p className="text-gray-900 font-medium">{profile.phoneNumber || 'No especificado'}</p>
                  </div>
                </div>
              </div>

              {/* Location & Demographics */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                  Ubicación y Demografía
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      País
                    </label>
                    <p className="text-gray-900 font-medium">{profile.pais || 'No especificado'}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Ciudad
                    </label>
                    <p className="text-gray-900 font-medium">{profile.ciudad || 'No especificado'}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Fecha de Nacimiento
                    </label>
                    <p className="text-gray-900 font-medium">
                      {profile.fechaNacimiento ? formatDate(profile.fechaNacimiento) : 'No especificado'}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Sexo
                    </label>
                    <p className="text-gray-900 font-medium">{profile.sexo || 'No especificado'}</p>
                  </div>
                </div>
              </div>

              {/* Identification */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-blue-600" />
                  Identificación
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Tipo de Identificación
                    </label>
                    <p className="text-gray-900 font-medium">{profile.tipoIdentificacion || 'No especificado'}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Número de Identificación
                    </label>
                    <p className="text-gray-900 font-medium">{profile.numeroIdentificacion || 'No especificado'}</p>
                  </div>
                </div>
              </div>

              {/* Work Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Building className="w-5 h-5 mr-2 text-blue-600" />
                  Información Laboral
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Departamento
                    </label>
                    <p className="text-gray-900 font-medium">{profile.department || 'No especificado'}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Código de Empleado
                    </label>
                    <p className="text-gray-900 font-medium">{profile.employeeCode || 'No especificado'}</p>
                  </div>
                </div>
              </div>

              {/* Roles */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-blue-600" />
                  Roles y Permisos
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex flex-wrap gap-2">
                    {profile.roles.map((role, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-600" />
                  Información de la Cuenta
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Último Acceso
                    </label>
                    <p className="text-gray-900 font-medium">
                      {profile.lastLoginAt ? formatDateTime(profile.lastLoginAt) : 'No disponible'}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Fecha de Registro
                    </label>
                    <p className="text-gray-900 font-medium">
                      {profile.createdAt ? formatDateTime(profile.createdAt) : 'No disponible'}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Estado de la Cuenta
                    </label>
                    <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                      profile.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {profile.isActive ? 'Activa' : 'Inactiva'}
                    </span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      ID de Usuario
                    </label>
                    <p className="text-gray-900 font-medium text-xs break-all">{profile.id}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;