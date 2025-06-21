
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSupabaseProductStore } from "../../store/SupabaseProductStore";
import { Package, DollarSign, TrendingUp, AlertTriangle } from "lucide-react";
import { useEffect } from "react";

const AdminDashboard = () => {
  const { products, fetchProducts } = useSupabaseProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const totalProducts = products.length;
  const totalValue = products.reduce((sum, product) => sum + (product.price * product.stock), 0);
  const lowStockProducts = products.filter(product => product.stock < 10).length;
  const averageRating = products.length > 0 
    ? (products.reduce((sum, product) => sum + product.rating, 0) / products.length).toFixed(1)
    : 0;

  const stats = [
    {
      title: "Total Products",
      value: totalProducts,
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Inventory Value",
      value: `₹${totalValue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Average Rating",
      value: averageRating,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Low Stock Items",
      value: lowStockProducts,
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome to your admin dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {products.slice(0, 5).map((product) => (
                <div key={product.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center gap-3">
                    <img 
                      src={product.image || '/placeholder.svg'} 
                      alt={product.title}
                      className="w-8 h-8 rounded object-cover"
                    />
                    <div>
                      <p className="font-medium text-sm">{product.title}</p>
                      <p className="text-xs text-gray-600">₹{product.price}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    product.stock > 20 ? 'bg-green-100 text-green-700' :
                    product.stock > 5 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    Stock: {product.stock}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Low Stock Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {products.filter(product => product.stock < 10).slice(0, 5).map((product) => (
                <div key={product.id} className="flex items-center justify-between p-2 bg-red-50 rounded">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <div>
                      <p className="font-medium text-sm">{product.title}</p>
                      <p className="text-xs text-gray-600">{product.category}</p>
                    </div>
                  </div>
                  <span className="text-xs text-red-700 font-medium">
                    {product.stock} left
                  </span>
                </div>
              ))}
              {products.filter(product => product.stock < 10).length === 0 && (
                <p className="text-gray-500 text-sm">All products are well stocked!</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
