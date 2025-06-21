
import DatabaseProductManagement from "../components/admin/DatabaseProductManagement";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Admin = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <DatabaseProductManagement />
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
