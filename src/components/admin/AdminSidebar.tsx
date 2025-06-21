
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings, 
  Plus,
  List,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Home,
  FileText
} from "lucide-react";

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AdminSidebar = ({ activeTab, onTabChange }: AdminSidebarProps) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'add-product', label: 'Add Product', icon: Plus },
    { id: 'inventory', label: 'Inventory', icon: List },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <Card className="h-full">
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-blue-600">Admin Panel</h2>
            <p className="text-xs text-gray-500">Manage your store</p>
          </div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="w-4 h-4 mr-2" />
                {item.label}
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminSidebar;
