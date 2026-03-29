import express from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validateRequest';

const router = express.Router();

// Mock order data
const orders = [
  {
    id: 1,
    userId: 1,
    orderNumber: 'UMKM-2026-001',
    items: [
      {
        productId: 1,
        name: 'Beras Pandan Wangi 5kg',
        price: 65000,
        quantity: 2,
        total: 130000,
      },
      {
        productId: 2,
        name: 'Minyak Goreng Bimoli 2L',
        price: 35000,
        quantity: 1,
        total: 35000,
      },
    ],
    subtotal: 165000,
    shippingCost: 15000,
    totalAmount: 180000,
    status: 'completed',
    shippingAddress: {
      name: 'John Doe',
      phone: '081234567890',
      address: 'Jl. Contoh No. 123',
      city: 'Jakarta',
      postalCode: '12345',
      notes: 'Tolong antar sebelum jam 5 sore',
    },
    paymentMethod: 'bank_transfer',
    paymentStatus: 'paid',
    createdAt: new Date('2026-03-28'),
    completedAt: new Date('2026-03-29'),
  },
  {
    id: 2,
    userId: 1,
    orderNumber: 'UMKM-2026-002',
    items: [
      {
        productId: 3,
        name: 'Gula Pasir Gulaku 1kg',
        price: 15000,
        quantity: 3,
        total: 45000,
      },
    ],
    subtotal: 45000,
    shippingCost: 10000,
    totalAmount: 55000,
    status: 'processing',
    shippingAddress: {
      name: 'John Doe',
      phone: '081234567890',
      address: 'Jl. Contoh No. 123',
      city: 'Jakarta',
      postalCode: '12345',
      notes: '',
    },
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    createdAt: new Date('2026-03-29'),
    completedAt: null,
  },
];

// Generate unique order number
const generateOrderNumber = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const sequence = orders.length + 1;
  return `UMKM-${year}-${month}${day}-${String(sequence).padStart(3, '0')}`;
};

// GET /api/orders (get user orders)
router.get('/', (req, res) => {
  // In real app, get userId from auth token
  const userId = parseInt(req.headers['x-user-id'] as string) || 1;
  
  const userOrders = orders.filter(order => order.userId === userId);
  
  res.json({
    success: true,
    data: userOrders,
    total: userOrders.length,
  });
});

// GET /api/orders/:id (get specific order)
router.get('/:id', (req, res) => {
  const userId = parseInt(req.headers['x-user-id'] as string) || 1;
  const orderId = parseInt(req.params.id);
  
  const order = orders.find(o => o.id === orderId && o.userId === userId);
  
  if (!order) {
    return res.status(404).json({
      success: false,
      error: 'Order not found',
    });
  }
  
  res.json({
    success: true,
    data: order,
  });
});

// POST /api/orders (create new order)
router.post(
  '/',
  [
    body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
    body('shippingAddress').isObject().withMessage('Shipping address is required'),
    body('paymentMethod').isIn(['cod', 'bank_transfer', 'e_wallet']).withMessage('Valid payment method is required'),
  ],
  validateRequest,
  (req, res) => {
    const userId = parseInt(req.headers['x-user-id'] as string) || 1;
    const { items, shippingAddress, paymentMethod, notes } = req.body;

    // Calculate order totals
    let subtotal = 0;
    const processedItems = items.map((item: any) => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;
      return {
        ...item,
        total: itemTotal,
      };
    });

    // Calculate shipping cost (mock calculation)
    const shippingCost = subtotal > 100000 ? 0 : 15000;
    const totalAmount = subtotal + shippingCost;

    const newOrder = {
      id: orders.length + 1,
      userId,
      orderNumber: generateOrderNumber(),
      items: processedItems,
      subtotal,
      shippingCost,
      totalAmount,
      status: 'pending',
      shippingAddress: {
        ...shippingAddress,
        notes: notes || '',
      },
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'pending',
      createdAt: new Date(),
      completedAt: null,
    };

    orders.push(newOrder);

    res.status(201).json({
      success: true,
      data: newOrder,
      message: 'Order created successfully',
    });
  }
);

// PUT /api/orders/:id/cancel (cancel order)
router.put('/:id/cancel', (req, res) => {
  const userId = parseInt(req.headers['x-user-id'] as string) || 1;
  const orderId = parseInt(req.params.id);
  
  const orderIndex = orders.findIndex(o => o.id === orderId && o.userId === userId);
  
  if (orderIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Order not found',
    });
  }

  // Only allow cancellation if order is pending or processing
  const allowedStatuses = ['pending', 'processing'];
  if (!allowedStatuses.includes(orders[orderIndex].status)) {
    return res.status(400).json({
      success: false,
      error: `Cannot cancel order with status: ${orders[orderIndex].status}`,
    });
  }

  orders[orderIndex].status = 'cancelled';
  orders[orderIndex].cancelledAt = new Date();

  res.json({
    success: true,
    data: orders[orderIndex],
    message: 'Order cancelled successfully',
  });
});

// PUT /api/orders/:id/status (admin only - update order status)
router.put('/:id/status', (req, res) => {
  // In real app, check admin role
  const isAdmin = req.headers['x-user-role'] === 'admin';
  if (!isAdmin) {
    return res.status(403).json({
      success: false,
      error: 'Admin access required',
    });
  }

  const orderId = parseInt(req.params.id);
  const { status } = req.body;

  const validStatuses = ['pending', 'processing', 'shipped', 'completed', 'cancelled'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
    });
  }

  const orderIndex = orders.findIndex(o => o.id === orderId);
  if (orderIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Order not found',
    });
  }

  orders[orderIndex].status = status;
  
  if (status === 'completed') {
    orders[orderIndex].completedAt = new Date();
  }

  res.json({
    success: true,
    data: orders[orderIndex],
    message: 'Order status updated successfully',
  });
});

// GET /api/orders/tracking/:orderNumber (track order)
router.get('/tracking/:orderNumber', (req, res) => {
  const orderNumber = req.params.orderNumber;
  const order = orders.find(o => o.orderNumber === orderNumber);

  if (!order) {
    return res.status(404).json({
      success: false,
      error: 'Order not found',
    });
  }

  // Simplified tracking info
  const trackingInfo = {
    orderNumber: order.orderNumber,
    status: order.status,
    estimatedDelivery: order.status === 'shipped' ? '2026-04-01' : null,
    lastUpdated: order.updatedAt || order.createdAt,
    shippingAddress: order.shippingAddress,
    itemsCount: order.items.length,
    totalAmount: order.totalAmount,
  };

  res.json({
    success: true,
    data: trackingInfo,
  });
});

export default router;