
import { create } from 'zustand';
import { AdminUser, Order, Promotion, AuditLog, ReturnRequest } from '@/types/admin';

interface AdminState {
  // User & Auth
  currentUser: AdminUser | null;
  users: AdminUser[];
  
  // Orders
  orders: Order[];
  
  // Promotions
  promotions: Promotion[];
  
  // Audit & Logs
  auditLogs: AuditLog[];
  
  // Returns
  returnRequests: ReturnRequest[];
  
  // Actions
  setCurrentUser: (user: AdminUser) => void;
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  addPromotion: (promotion: Promotion) => void;
  updatePromotion: (promotion: Promotion) => void;
  deactivatePromotion: (promotionId: string) => void;
  addAuditLog: (log: Omit<AuditLog, 'id' | 'timestamp'>) => void;
  addReturnRequest: (request: ReturnRequest) => void;
  updateReturnRequest: (requestId: string, status: ReturnRequest['status']) => void;
}

// Mock data for demonstration
const mockOrders: Order[] = [
  {
    id: '1001',
    customerId: 'cust_001',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    items: [
      {
        productId: '1',
        productName: 'Premium Cotton T-Shirt',
        quantity: 2,
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&q=80'
      }
    ],
    total: 59.98,
    status: 'processing',
    paymentStatus: 'paid',
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '1002',
    customerId: 'cust_002',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    items: [
      {
        productId: '2',
        productName: 'Designer Hoodie',
        quantity: 1,
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=200&q=80'
      }
    ],
    total: 79.99,
    status: 'shipped',
    paymentStatus: 'paid',
    shippingAddress: {
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'USA'
    },
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-16')
  }
];

const mockPromotions: Promotion[] = [
  {
    id: 'promo_001',
    name: 'New Year Sale',
    type: 'percentage',
    value: 20,
    code: 'NEWYEAR20',
    description: '20% off on all items',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-01-31'),
    isActive: true,
    usageLimit: 1000,
    usedCount: 245,
    minimumOrderValue: 50
  },
  {
    id: 'promo_002',
    name: 'Free Shipping',
    type: 'free_shipping',
    value: 0,
    code: 'FREESHIP',
    description: 'Free shipping on orders above $75',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    isActive: true,
    usageLimit: 5000,
    usedCount: 1200,
    minimumOrderValue: 75
  }
];

export const useAdminStore = create<AdminState>((set, get) => ({
  currentUser: {
    id: 'admin_001',
    name: 'Admin User',
    email: 'admin@fashionzone.com',
    role: {
      id: 'role_001',
      name: 'Super Admin',
      level: 'super_admin',
      permissions: []
    },
    permissions: [],
    lastLogin: new Date(),
    isActive: true
  },
  users: [],
  orders: mockOrders,
  promotions: mockPromotions,
  auditLogs: [],
  returnRequests: [],

  setCurrentUser: (user) => set({ currentUser: user }),

  addOrder: (order) => set((state) => ({ 
    orders: [order, ...state.orders] 
  })),

  updateOrderStatus: (orderId, status) => set((state) => ({
    orders: state.orders.map(order => 
      order.id === orderId 
        ? { ...order, status, updatedAt: new Date() }
        : order
    )
  })),

  addPromotion: (promotion) => set((state) => ({ 
    promotions: [promotion, ...state.promotions] 
  })),

  updatePromotion: (updatedPromotion) => set((state) => ({
    promotions: state.promotions.map(promo => 
      promo.id === updatedPromotion.id ? updatedPromotion : promo
    )
  })),

  deactivatePromotion: (promotionId) => set((state) => ({
    promotions: state.promotions.map(promo => 
      promo.id === promotionId ? { ...promo, isActive: false } : promo
    )
  })),

  addAuditLog: (logData) => set((state) => ({
    auditLogs: [{
      ...logData,
      id: `log_${Date.now()}`,
      timestamp: new Date()
    }, ...state.auditLogs]
  })),

  addReturnRequest: (request) => set((state) => ({ 
    returnRequests: [request, ...state.returnRequests] 
  })),

  updateReturnRequest: (requestId, status) => set((state) => ({
    returnRequests: state.returnRequests.map(request => 
      request.id === requestId 
        ? { ...request, status, processedAt: new Date() }
        : request
    )
  }))
}));
