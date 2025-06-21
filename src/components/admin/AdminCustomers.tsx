
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Users, Search, Mail, Phone, MapPin, UserCheck } from "lucide-react";

// Mock customer data - in real app this would come from Supabase
const mockCustomers = [
  {
    id: "CUST-001",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    orders: 5,
    totalSpent: 12499,
    status: "active",
    joinDate: "2024-01-15",
    location: "New York, USA"
  },
  {
    id: "CUST-002",
    name: "Jane Smith", 
    email: "jane@example.com",
    phone: "+1234567891",
    orders: 12,
    totalSpent: 25899,
    status: "vip",
    joinDate: "2023-12-10",
    location: "California, USA"
  },
  {
    id: "CUST-003",
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "+1234567892", 
    orders: 2,
    totalSpent: 3599,
    status: "new",
    joinDate: "2024-01-18",
    location: "Texas, USA"
  }
];

const AdminCustomers = () => {
  const [customers, setCustomers] = useState(mockCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "vip": return "default" as const;
      case "active": return "secondary" as const;
      case "new": return "outline" as const;
      default: return "outline" as const;
    }
  };

  const getTotalCustomers = () => customers.length;
  const getVIPCustomers = () => customers.filter(c => c.status === "vip").length;
  const getTotalRevenue = () => customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const getAvgOrderValue = () => {
    const totalOrders = customers.reduce((sum, c) => sum + c.orders, 0);
    const totalRevenue = getTotalRevenue();
    return totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Customer Management</h1>
        <p className="text-gray-600">Manage and track customer information</p>
      </div>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold">{getTotalCustomers()}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">VIP Customers</p>
                <p className="text-2xl font-bold">{getVIPCustomers()}</p>
              </div>
              <UserCheck className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">₹{getTotalRevenue().toLocaleString()}</p>
              </div>
              <Mail className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Order Value</p>
                <p className="text-2xl font-bold">₹{getAvgOrderValue()}</p>
              </div>
              <Phone className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border rounded-md bg-white"
        >
          <option value="all">All Status</option>
          <option value="new">New</option>
          <option value="active">Active</option>
          <option value="vip">VIP</option>
        </select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Customers ({filteredCustomers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-sm text-gray-500">{customer.id}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-3 h-3" />
                        {customer.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-3 h-3" />
                        {customer.phone}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MapPin className="w-3 h-3" />
                        {customer.location}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{customer.orders}</TableCell>
                  <TableCell>₹{customer.totalSpent.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(customer.status)}>
                      {customer.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>{customer.joinDate}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        Contact
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCustomers;
