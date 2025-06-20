
import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { 
  Package, 
  ShoppingCart, 
  Users, 
  Tag, 
  RotateCcw, 
  Settings,
  BarChart3,
  Shield,
  FileText,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminStore } from "@/store/AdminStore";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { currentUser } = useAdminStore();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: BarChart3 },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { name: 'Customers', href: '/admin/customers', icon: Users },
    { name: 'Promotions', href: '/admin/promotions', icon: Tag },
    { name: 'Returns', href: '/admin/returns', icon: RotateCcw },
    { name: 'Audit Logs', href: '/admin/audit', icon: Shield },
    { name: 'Reports', href: '/admin/reports', icon: FileText },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden bg-black bg-opacity-50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:inset-0
      `}>
        <div className="flex items-center justify-between h-16 px-6 bg-flipkart-blue">
          <h1 className="text-xl font-bold text-white">Fashion Zone Admin</h1>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-white hover:bg-blue-700"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="mt-6">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  flex items-center px-6 py-3 text-sm font-medium transition-colors
                  ${isActive 
                    ? 'bg-flipkart-blue text-white border-r-2 border-flipkart-yellow' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-flipkart-blue rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-white">
                {currentUser?.name.charAt(0)}
              </span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{currentUser?.name}</p>
              <p className="text-xs text-gray-500">{currentUser?.role.name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Last login: {currentUser?.lastLogin.toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
