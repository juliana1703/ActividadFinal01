import React from 'react';
import {
  Users, Building2, Package, ShoppingCart,
  TrendingUp, DollarSign, AlertCircle, CheckCircle, BarChart3
} from 'lucide-react';

const DashboardHome: React.FC = () => {
  const stats = [
    {
      title: 'Total Usuarios',
      value: '1,284',
      change: '+12%',
      changeType: 'increase',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Clientes Activos',
      value: '856',
      change: '+8%',
      changeType: 'increase',
      icon: Building2,
      color: 'bg-green-500',
    },
    {
      title: 'Productos',
      value: '2,341',
      change: '+15%',
      changeType: 'increase',
      icon: Package,
      color: 'bg-purple-500',
    },
    {
      title: 'Órdenes de Compra',
      value: '142',
      change: '+23%',
      changeType: 'increase',
      icon: ShoppingCart,
      color: 'bg-orange-500',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'order',
      message: 'Nueva orden de compra #ORD-2024-001 creada',
      time: 'Hace 5 minutos',
      status: 'pending',
    },
    {
      id: 2,
      type: 'user',
      message: 'Usuario Juan Pérez registrado exitosamente',
      time: 'Hace 15 minutos',
      status: 'completed',
    },
    {
      id: 3,
      type: 'product',
      message: 'Producto "Laptop Dell" actualizado',
      time: 'Hace 30 minutos',
      status: 'completed',
    },
    {
      id: 4,
      type: 'alert',
      message: 'Stock bajo: 5 productos requieren reabastecimiento',
      time: 'Hace 1 hora',
      status: 'warning',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Dashboard Principal</h2>
        <p className="text-gray-600 mt-2">Resumen general del sistema</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs mes anterior</span>
                </div>
              </div>
              <div className={`${stat.color} p-3 rounded-full`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Placeholder */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Ventas Mensuales</h3>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Gráfico de ventas</p>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Actividad Reciente</h3>
            <AlertCircle className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`p-2 rounded-full ${
                  activity.status === 'completed' ? 'bg-green-100' :
                  activity.status === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                }`}>
                  {activity.status === 'completed' ? (
                    <CheckCircle className={`w-4 h-4 ${
                      activity.status === 'completed' ? 'text-green-600' :
                      activity.status === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                    }`} />
                  ) : activity.status === 'warning' ? (
                    <AlertCircle className="w-4 h-4 text-yellow-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-blue-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Users className="w-8 h-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Nuevo Usuario</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Building2 className="w-8 h-8 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Nuevo Cliente</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Package className="w-8 h-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Nuevo Producto</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <ShoppingCart className="w-8 h-8 text-orange-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Nueva Orden</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;