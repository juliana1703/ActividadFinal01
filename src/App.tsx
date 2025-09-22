import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Layout from './components/layout/Layout';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import ForgotPasswordForm from './components/auth/ForgotPasswordForm';
import DashboardHome from './components/dashboard/DashboardHome';
import UserManagement from './components/users/UserManagement';
import ProfileManagement from './components/profile/ProfileManagement';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Layout>
                <DashboardHome />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/users" element={
            <ProtectedRoute roles={['Admin', 'Manager']}>
              <Layout>
                <UserManagement />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/profile" element={
            <ProtectedRoute>
              <Layout>
                <ProfileManagement />
              </Layout>
            </ProtectedRoute>
          } />

          {/* Placeholder routes for other modules */}
          <Route path="/dashboard/roles" element={
            <ProtectedRoute roles={['Admin']}>
              <Layout>
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Gestión de Roles</h2>
                  <p className="text-gray-600">Módulo en desarrollo</p>
                </div>
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/user-claims" element={
            <ProtectedRoute roles={['Admin']}>
              <Layout>
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Claims de Usuario</h2>
                  <p className="text-gray-600">Módulo en desarrollo</p>
                </div>
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/role-claims" element={
            <ProtectedRoute roles={['Admin']}>
              <Layout>
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Claims de Rol</h2>
                  <p className="text-gray-600">Módulo en desarrollo</p>
                </div>
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/permissions" element={
            <ProtectedRoute roles={['Admin']}>
              <Layout>
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Gestión de Permisos</h2>
                  <p className="text-gray-600">Módulo en desarrollo</p>
                </div>
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/audit" element={
            <ProtectedRoute roles={['Admin', 'Manager']}>
              <Layout>
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Auditoría</h2>
                  <p className="text-gray-600">Módulo en desarrollo</p>
                </div>
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/customers" element={
            <ProtectedRoute>
              <Layout>
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Gestión de Clientes</h2>
                  <p className="text-gray-600">Módulo en desarrollo</p>
                </div>
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/suppliers" element={
            <ProtectedRoute>
              <Layout>
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Gestión de Proveedores</h2>
                  <p className="text-gray-600">Módulo en desarrollo</p>
                </div>
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/products" element={
            <ProtectedRoute>
              <Layout>
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Gestión de Productos</h2>
                  <p className="text-gray-600">Módulo en desarrollo</p>
                </div>
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/purchase-orders" element={
            <ProtectedRoute>
              <Layout>
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Órdenes de Compra</h2>
                  <p className="text-gray-600">Módulo en desarrollo</p>
                </div>
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/analytics" element={
            <ProtectedRoute>
              <Layout>
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Reportes y Analítica</h2>
                  <p className="text-gray-600">Módulo en desarrollo</p>
                </div>
              </Layout>
            </ProtectedRoute>
          } />

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;