
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  permissions: Permission[];
  lastLogin: Date;
  isActive: boolean;
}

export interface AdminRole {
  id: string;
  name: string;
  level: 'super_admin' | 'admin' | 'manager' | 'staff';
  permissions: Permission[];
}

export interface Permission {
  id: string;
  name: string;
  module: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'manage';
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  shippingAddress: Address;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  image: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded' | 'partially_refunded';

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Promotion {
  id: string;
  name: string;
  type: 'percentage' | 'fixed' | 'bogo' | 'free_shipping';
  value: number;
  code: string;
  description: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  usageLimit: number;
  usedCount: number;
  minimumOrderValue?: number;
  applicableCategories?: string[];
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  module: string;
  details: string;
  timestamp: Date;
  ipAddress: string;
}

export interface ReturnRequest {
  id: string;
  orderId: string;
  customerId: string;
  customerName: string;
  items: OrderItem[];
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'processed';
  refundAmount: number;
  createdAt: Date;
  processedAt?: Date;
  processedBy?: string;
}
