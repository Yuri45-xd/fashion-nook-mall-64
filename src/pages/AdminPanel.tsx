
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import ProductsManager from "@/components/admin/ProductsManager";
import OrderManager from "@/components/admin/OrderManager";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, Users, TrendingUp } from "lucide-react";
import { useAdminStore } from "@/store/AdminStore";
import { useProductStore } from "@/store/ProductStore";

// Dashboard Component
const AdminDashboard = () => {
  const { orders } = useAdminStore();
  const { products } = useProductStore();

  const stats = [
    {
      title: "Total Products",
      value: products.length,
      icon: Package,
      change: "+12%",
      changeType: "positive" as const
    },
    {
      title: "Total Orders",
      value: orders.length,
      icon: ShoppingCart,
      change: "+8%",
      changeType: "positive" as const
    },
    {
      title: "Active Customers",
      value: "1,234",
      icon: Users,
      change: "+15%",
      changeType: "positive" as const
    },
    {
      title: "Revenue",
      value: "₹45,678",
      icon: TrendingUp,
      change: "+23%",
      changeType: "positive" as const
    }
  ];

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to Fashion Zone Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-flipkart-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-flipkart-blue rounded-full flex items-center justify-center text-white font-medium">
                    #{order.id.slice(-3)}
                  </div>
                  <div>
                    <p className="font-medium">{order.customerName}</p>
                    <p className="text-sm text-gray-600">
                      {order.items.length} item(s) • ₹{order.total.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium capitalize">{order.status}</p>
                  <p className="text-xs text-gray-600">
                    {order.createdAt.toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Placeholder components for other modules
const CustomerManager = () => (
  <div>
    <h1 className="text-2xl font-bold">Customer Management</h1>
    <p className="text-gray-600">Customer management functionality coming soon...</p>
  </div>
);

const PromotionManager = () => (
  <div>
    <h1 className="text-2xl font-bold">Promotion Management</h1>
    <p className="text-gray-600">Promotion management functionality coming soon...</p>
  </div>
);

const ReturnManager = () => (
  <div>
    <h1 className="text-2xl font-bold">Return Management</h1>
    <p className="text-gray-600">Return management functionality coming soon...</p>
  </div>
);

const AuditLogs = () => (
  <div>
    <h1 className="text-2xl font-bold">Audit Logs</h1>
    <p className="text-gray-600">Audit logs functionality coming soon...</p>
  </div>
);

const Reports = () => (
  <div>
    <h1 className="text-2xl font-bold">Reports</h1>
    <p className="text-gray-600">Reports functionality coming soon...</p>
  </div>
);

const AdminSettings = () => (
  <div>
    <h1 className="text-2xl font-bold">Settings</h1>
    <p className="text-gray-600">Settings functionality coming soon...</p>
  </div>
);

const AdminPanel = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/products" element={<ProductsManager />} />
        <Route path="/orders" element={<OrderManager />} />
        <Route path="/customers" element={<CustomerManager />} />
        <Route path="/promotions" element={<PromotionManager />} />
        <Route path="/returns" element={<ReturnManager />} />
        <Route path="/audit" element={<AuditLogs />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<AdminSettings />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminPanel;
