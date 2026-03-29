// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl: string;
  expiryDate?: string;
}

export interface Category {
  id: string;
  name: string;
  parentId?: string;
  description?: string;
}

// Cart Types
export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  product?: Product;
}

export interface Cart {
  id: string;
  userId?: string;
  items: CartItem[];
  totalAmount: number;
  expiresAt?: string;
}

// Order Types
export interface Order {
  id: string;
  userId: string;
  totalAmount: number;
  status: OrderStatus;
  deliveryAddress: string;
  deliveryCost: number;
  createdAt: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  priceAtTime: number;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: string;
  createdAt: string;
}

// Delivery Types
export interface Delivery {
  id: string;
  orderId: string;
  riderId?: string;
  status: DeliveryStatus;
  trackingUrl?: string;
  estimatedDelivery?: string;
  actualDelivery?: string;
}

export type DeliveryStatus = 'pending' | 'assigned' | 'picked_up' | 'in_transit' | 'delivered';

// Payment Types
export interface Payment {
  id: string;
  orderId: string;
  method: PaymentMethod;
  amount: number;
  status: PaymentStatus;
  transactionId?: string;
  paidAt?: string;
}

export type PaymentMethod = 'cash' | 'bank_transfer' | 'e-wallet' | 'credit_card';
export type PaymentStatus = 'pending' | 'processing' | 'success' | 'failed' | 'refunded';

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    code: string;
    message: string;
    details?: string[];
  };
  timestamp: string;
}

// Pagination
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
