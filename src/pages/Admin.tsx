
import { useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminDashboard from "../components/admin/AdminDashboard";
import DatabaseProductManagement from "../components/admin/DatabaseProductManagement";
import DatabaseProductEditor from "../components/admin/DatabaseProductEditor";
import ProductInventory from "../components/admin/ProductInventory";
import AdminOrdersManagement from "../components/admin/AdminOrdersManagement";
import AdminCustomers from "../components/admin/AdminCustomers";
import AdminAnalytics from "../components/admin/AdminAnalytics";
import AdminSettings from "../components/admin/AdminSettings";
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
        return <AdminOrdersManagement />;
      case 'customers':
        return <AdminCustomers />;
      case 'analytics':
        return <AdminAnalytics />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex-1 flex">
        <div className="w-64 border-r bg-white shadow-sm">
          <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {renderContent()}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
