import React, { useState, useEffect } from "react";
import { 
  BarChart3, 
  ShoppingBag, 
  Users, 
  Truck, 
  Tags, 
  FileText, 
  Settings,
  AreaChart,
  Package,
  Clock,
  AlertCircle,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Search,
  Filter,
  Calendar,
  RefreshCw,
  Download,
  ChevronLeft,
  Shield,
  Bell,
  Plus
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProductStore } from "../store/ProductStore";
import { useToast } from "@/hooks/use-toast";
import ProductsManager from "../components/admin/ProductsManager";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [accessLogs, setAccessLogs] = useState<{time: string; device: string; ip: string}[]>([]);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { products } = useProductStore();
  
  useEffect(() => {
    // Simulate access logs data
    setAccessLogs([
      { time: "2025-04-04 09:23:12", device: "Windows 11 - Chrome 123.0.6312.58", ip: "192.168.1.105" },
      { time: "2025-04-03 17:45:33", device: "macOS Sonoma - Safari 17.3", ip: "192.168.1.102" },
      { time: "2025-04-03 14:12:08", device: "iPhone 15 - iOS 17.4", ip: "192.168.1.120" },
      { time: "2025-04-02 11:33:27", device: "Android 14 - Chrome Mobile", ip: "192.168.1.110" },
      { time: "2025-04-02 08:57:19", device: "Windows 11 - Firefox 115", ip: "192.168.1.105" },
    ]);

    // Record current access
    const now = new Date();
    const formattedTime = now.toISOString().replace('T', ' ').substring(0, 19);
    const currentDevice = `${navigator.platform} - ${navigator.userAgent.split(' ').slice(-1)[0]}`;
    
    setAccessLogs(prev => [
      { time: formattedTime, device: currentDevice, ip: "Current Session" },
      ...prev
    ]);
  }, []);

  const renderDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-500 text-sm">Total Products</p>
            <h3 className="text-2xl font-bold mt-2">{products.length}</h3>
          </div>
          <div className="bg-blue-50 p-3 rounded-full">
            <ShoppingBag className="w-6 h-6 text-flipkart-blue" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-500 text-sm">Revenue Today</p>
            <h3 className="text-2xl font-bold mt-2">₹0</h3>
          </div>
          <div className="bg-green-50 p-3 rounded-full">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-500 text-sm">Active Users</p>
            <h3 className="text-2xl font-bold mt-2">0</h3>
          </div>
          <div className="bg-purple-50 p-3 rounded-full">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-500 text-sm">Pending Deliveries</p>
            <h3 className="text-2xl font-bold mt-2">0</h3>
          </div>
          <div className="bg-orange-50 p-3 rounded-full">
            <Truck className="w-6 h-6 text-orange-500" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 md:col-span-2">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Recent Activity</h3>
        </div>
        <p className="text-gray-500 text-sm">No recent activity to show</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 md:col-span-2">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-medium">Sales Analytics</h3>
        </div>
        <div className="h-48 flex items-center justify-center">
          <div className="w-full h-full bg-gray-50 rounded-md flex items-center justify-center">
            <AreaChart className="w-12 h-12 text-gray-300" />
            <span className="ml-2 text-gray-400">No sales data available</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <ProductsManager />
  );
  
  const renderOrders = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden p-8 text-center">
      <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
      <h3 className="text-lg font-medium mb-2">No Orders</h3>
      <p className="text-gray-500">No orders have been placed yet</p>
    </div>
  );

  const renderDelivery = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden p-8 text-center">
      <Truck className="w-16 h-16 mx-auto text-gray-300 mb-4" />
      <h3 className="text-lg font-medium mb-2">No Deliveries</h3>
      <p className="text-gray-500">No deliveries to manage</p>
    </div>
  );

  const renderAccessLogs = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Access Logs</h2>
          <Button variant="outline" className="flex items-center gap-1">
            <Download className="w-4 h-4" />
            <span>Export Logs</span>
          </Button>
        </div>
        <p className="text-gray-500 mt-2">Track when and where admin access occurred</p>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>Device & Browser</TableHead>
            <TableHead>IP Address</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accessLogs.map((log, i) => (
            <TableRow key={i} className={i === 0 ? "bg-blue-50" : ""}>
              <TableCell>{log.time}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  {i === 0 && (
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-2">
                      Current
                    </span>
                  )}
                  {log.device}
                </div>
              </TableCell>
              <TableCell>{log.ip}</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm">Details</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  const renderPromotions = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden p-8 text-center">
      <Tags className="w-16 h-16 mx-auto text-gray-300 mb-4" />
      <h3 className="text-lg font-medium mb-2">Promotions</h3>
      <p className="text-gray-500">No active promotions available</p>
      <Button className="mt-4 bg-flipkart-blue">Create New Promotion</Button>
    </div>
  );

  const renderReports = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden p-8">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-lg font-medium">Sales Reports</h3>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>Date Range</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-1">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>
      <div className="h-64 bg-gray-50 rounded-md flex items-center justify-center mb-8">
        <AreaChart className="w-12 h-12 text-gray-300" />
        <span className="ml-2 text-gray-400">No sales data available</span>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden p-8">
      <h3 className="text-lg font-medium mb-6">Admin Settings</h3>
      
      <div className="space-y-6">
        <div className="border-b pb-6">
          <h4 className="font-medium mb-4">General Settings</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Store Name</label>
              <Input defaultValue="Flipkart Clone" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Currency</label>
              <Input defaultValue="₹ (INR)" />
            </div>
          </div>
        </div>
        
        <div className="border-b pb-6">
          <h4 className="font-medium mb-4">Notification Settings</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Email notifications</span>
              <Button variant="outline" size="sm">Configure</Button>
            </div>
            <div className="flex items-center justify-between">
              <span>Order alerts</span>
              <Button variant="outline" size="sm">Configure</Button>
            </div>
          </div>
        </div>
        
        <div>
          <Button className="bg-flipkart-blue">Save Settings</Button>
        </div>
      </div>
    </div>
  );

  const renderPaymentHistory = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Payment History</h2>
          <Button variant="outline" className="flex items-center gap-1">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </Button>
        </div>
        <p className="text-gray-500 mt-2">View all transaction records</p>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={5} className="text-center py-8 text-gray-500">
              No payment history available
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 overflow-y-auto">
          <div className="p-4 border-b border-gray-200 flex items-center">
            <Shield className="w-6 h-6 text-flipkart-blue mr-2" />
            <h2 className="font-bold text-lg">Admin Panel</h2>
          </div>

          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => setActiveTab("dashboard")}
                  className={`flex items-center w-full px-4 py-2 text-sm rounded-md ${
                    activeTab === "dashboard" 
                      ? "bg-flipkart-blue text-white" 
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <BarChart3 className="w-5 h-5 mr-3" />
                  Dashboard
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab("products")}
                  className={`flex items-center w-full px-4 py-2 text-sm rounded-md ${
                    activeTab === "products" 
                      ? "bg-flipkart-blue text-white" 
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <ShoppingBag className="w-5 h-5 mr-3" />
                  Products
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab("orders")}
                  className={`flex items-center w-full px-4 py-2 text-sm rounded-md ${
                    activeTab === "orders" 
                      ? "bg-flipkart-blue text-white" 
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Package className="w-5 h-5 mr-3" />
                  Orders
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab("delivery")}
                  className={`flex items-center w-full px-4 py-2 text-sm rounded-md ${
                    activeTab === "delivery" 
                      ? "bg-flipkart-blue text-white" 
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Truck className="w-5 h-5 mr-3" />
                  Delivery
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab("promotions")}
                  className={`flex items-center w-full px-4 py-2 text-sm rounded-md ${
                    activeTab === "promotions" 
                      ? "bg-flipkart-blue text-white" 
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Tags className="w-5 h-5 mr-3" />
                  Promotions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab("reports")}
                  className={`flex items-center w-full px-4 py-2 text-sm rounded-md ${
                    activeTab === "reports" 
                      ? "bg-flipkart-blue text-white" 
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <FileText className="w-5 h-5 mr-3" />
                  Reports
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab("access_logs")}
                  className={`flex items-center w-full px-4 py-2 text-sm rounded-md ${
                    activeTab === "access_logs" 
                      ? "bg-flipkart-blue text-white" 
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Clock className="w-5 h-5 mr-3" />
                  Access Logs
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab("settings")}
                  className={`flex items-center w-full px-4 py-2 text-sm rounded-md ${
                    activeTab === "settings" 
                      ? "bg-flipkart-blue text-white" 
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Settings className="w-5 h-5 mr-3" />
                  Settings
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab("payment_history")}
                  className={`flex items-center w-full px-4 py-2 text-sm rounded-md ${
                    activeTab === "payment_history" 
                      ? "bg-flipkart-blue text-white" 
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <FileText className="w-5 h-5 mr-3" />
                  Payment History
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main className="ml-64 flex-1 p-8">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <button 
                onClick={() => navigate('/')}
                className="text-flipkart-blue flex items-center text-sm mb-2"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Store
              </button>
              <h1 className="text-2xl font-bold">
                {activeTab === "dashboard" && "Dashboard"}
                {activeTab === "products" && "Product Management"}
                {activeTab === "orders" && "Order Management"}
                {activeTab === "delivery" && "Delivery Management"}
                {activeTab === "promotions" && "Promotions"}
                {activeTab === "reports" && "Reports"}
                {activeTab === "access_logs" && "Access Logs"}
                {activeTab === "settings" && "Settings"}
                {activeTab === "payment_history" && "Payment History"}
              </h1>
              <p className="text-gray-500">
                {activeTab === "dashboard" && "Overview of your store's performance"}
                {activeTab === "products" && "Manage your product catalog"}
                {activeTab === "orders" && "View and manage customer orders"}
                {activeTab === "delivery" && "Track and manage deliveries"}
                {activeTab === "promotions" && "Manage special offers and discounts"}
                {activeTab === "reports" && "View sales and performance reports"}
                {activeTab === "access_logs" && "Track admin access history"}
                {activeTab === "settings" && "Configure admin panel settings"}
                {activeTab === "payment_history" && "View payment transaction history"}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Bell className="w-4 h-4" />
                  <span>Notifications</span>
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gray-100 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-gray-500">Super Admin</p>
                </div>
              </div>
            </div>
          </div>

          {activeTab === "dashboard" && renderDashboard()}
          {activeTab === "products" && renderProducts()}
          {activeTab === "orders" && renderOrders()}
          {activeTab === "delivery" && renderDelivery()}
          {activeTab === "promotions" && renderPromotions()}
          {activeTab === "reports" && renderReports()}
          {activeTab === "access_logs" && renderAccessLogs()}
          {activeTab === "settings" && renderSettings()}
          {activeTab === "payment_history" && renderPaymentHistory()}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
