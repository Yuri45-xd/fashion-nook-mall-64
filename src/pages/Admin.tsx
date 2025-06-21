
import { useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminDashboard from "../components/admin/AdminDashboard";
import DatabaseProductManagement from "../components/admin/DatabaseProductManagement";
import DatabaseProductEditor from "../components/admin/DatabaseProductEditor";
import ProductInventory from "../components/admin/ProductInventory";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'products':
        return <DatabaseProductManagement />;
      case 'add-product':
        return <DatabaseProductEditor onSave={() => setActiveTab('products')} onCancel={() => setActiveTab('products')} />;
      case 'inventory':
        return <ProductInventory />;
      case 'orders':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Orders Management</h1>
            <p className="text-gray-600">Order management functionality coming soon...</p>
          </div>
        );
      case 'customers':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Customer Management</h1>
            <p className="text-gray-600">Customer management functionality coming soon...</p>
          </div>
        );
      case 'analytics':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Analytics & Reports</h1>
            <p className="text-gray-600">Analytics dashboard coming soon...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Settings</h1>
            <p className="text-gray-600">Admin settings coming soon...</p>
          </div>
        );
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex">
        <div className="w-64 border-r bg-white">
          <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
        <main className="flex-1 bg-gray-50 overflow-auto">
          {renderContent()}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
