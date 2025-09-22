import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Users, Shield, Building2, Truck, Package, 
  ShoppingCart, BarChart3, FileText, Settings, ChevronDown, 
  UserCog, Key, Activity
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = React.useState<string[]>(['management']);

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const menuItems = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: Home,
    },
    {
      title: 'Gestión de Roles y Usuarios',
      id: 'management',
      icon: Shield,
      submenu: [
        { title: 'Usuarios', href: '/dashboard/users', icon: Users },
        { title: 'Roles', href: '/dashboard/roles', icon: UserCog },
        { title: 'Claims de Usuario', href: '/dashboard/user-claims', icon: Key },
        { title: 'Claims de Rol', href: '/dashboard/role-claims', icon: Key },
        { title: 'Permisos', href: '/dashboard/permissions', icon: Shield },
        { title: 'Auditoría', href: '/dashboard/audit', icon: Activity },
      ],
    },
    {
      title: 'Clientes',
      href: '/dashboard/customers',
      icon: Building2,
    },
    {
      title: 'Proveedores',
      href: '/dashboard/suppliers',
      icon: Truck,
    },
    {
      title: 'Productos',
      href: '/dashboard/products',
      icon: Package,
    },
    {
      title: 'Órdenes de Compra',
      href: '/dashboard/purchase-orders',
      icon: ShoppingCart,
    },
    {
      title: 'Reportes y Analítica',
      href: '/dashboard/analytics',
      icon: BarChart3,
    },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-300
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      lg:translate-x-0 lg:static lg:inset-0
    `}>
      <div className="flex flex-col h-full">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">BusinessApp</h2>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.title}>
                {item.submenu ? (
                  <div>
                    <button
                      onClick={() => toggleMenu(item.id!)}
                      className="w-full flex items-center justify-between px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="flex items-center">
                        <item.icon className="w-5 h-5 mr-3" />
                        <span className="font-medium">{item.title}</span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          expandedMenus.includes(item.id!) ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    
                    {expandedMenus.includes(item.id!) && (
                      <ul className="mt-2 ml-6 space-y-1">
                        {item.submenu.map((subItem) => (
                          <li key={subItem.href}>
                            <Link
                              to={subItem.href}
                              className={`flex items-center px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${
                                isActive(subItem.href)
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'text-gray-600 hover:bg-gray-100'
                              }`}
                            >
                              <subItem.icon className="w-4 h-4 mr-2" />
                              {subItem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.href!}
                    className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-200 ${
                      isActive(item.href!)
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    <span className="font-medium">{item.title}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;