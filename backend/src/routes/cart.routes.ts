import express from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validateRequest';

const router = express.Router();

// Mock user cart data
const userCarts = new Map<number, any>();

// Initialize cart for user 1
userCarts.set(1, {
  userId: 1,
  items: [
    {
      productId: 1,
      name: 'Beras Pandan Wangi 5kg',
      price: 65000,
      quantity: 2,
      imageUrl: '/images/beras-pandan.jpg',
    },
    {
      productId: 2,
      name: 'Minyak Goreng Bimoli 2L',
      price: 35000,
      quantity: 1,
      imageUrl: '/images/minyak-bimoli.jpg',
    },
  ],
  totalItems: 3,
  subtotal: 165000,
  updatedAt: new Date(),
});

// Helper function to get user cart
const getUserCart = (userId: number) => {
  if (!userCarts.has(userId)) {
    userCarts.set(userId, {
      userId,
      items: [],
      totalItems: 0,
      subtotal: 0,
      updatedAt: new Date(),
    });
  }
  return userCarts.get(userId);
};

// Helper function to calculate cart totals
const calculateCartTotals = (cart: any) => {
  let totalItems = 0;
  let subtotal = 0;

  cart.items.forEach((item: any) => {
    totalItems += item.quantity;
    subtotal += item.price * item.quantity;
  });

  cart.totalItems = totalItems;
  cart.subtotal = subtotal;
  cart.updatedAt = new Date();

  return cart;
};

// GET /api/cart (get user cart)
router.get('/', (req, res) => {
  // In real app, get userId from auth token
  const userId = parseInt(req.headers['x-user-id'] as string) || 1;
  
  const cart = getUserCart(userId);
  
  res.json({
    success: true,
    data: cart,
  });
});

// POST /api/cart/add (add item to cart)
router.post(
  '/add',
  [
    body('productId').isInt({ min: 1 }).withMessage('Valid product ID is required'),
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  ],
  validateRequest,
  (req, res) => {
    const userId = parseInt(req.headers['x-user-id'] as string) || 1;
    const { productId, quantity } = req.body;

    // Mock product data (in real app, fetch from database)
    const mockProducts = [
      {
        id: 1,
        name: 'Beras Pandan Wangi 5kg',
        price: 65000,
        imageUrl: '/images/beras-pandan.jpg',
      },
      {
        id: 2,
        name: 'Minyak Goreng Bimoli 2L',
        price: 35000,
        imageUrl: '/images/minyak-bimoli.jpg',
      },
      {
        id: 3,
        name: 'Gula Pasir Gulaku 1kg',
        price: 15000,
        imageUrl: '/images/gula-gulaku.jpg',
      },
    ];

    const product = mockProducts.find(p => p.id === productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }

    const cart = getUserCart(userId);
    
    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex((item: any) => item.productId === productId);
    
    if (existingItemIndex !== -1) {
      // Update quantity if item exists
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({
        productId,
        name: product.name,
        price: product.price,
        quantity,
        imageUrl: product.imageUrl,
        addedAt: new Date(),
      });
    }

    // Recalculate totals
    calculateCartTotals(cart);
    userCarts.set(userId, cart);

    res.json({
      success: true,
      data: cart,
      message: 'Item added to cart successfully',
    });
  }
);

// PUT /api/cart/update (update item quantity)
router.put(
  '/update',
  [
    body('productId').isInt({ min: 1 }).withMessage('Valid product ID is required'),
    body('quantity').isInt({ min: 0 }).withMessage('Quantity must be 0 or more'),
  ],
  validateRequest,
  (req, res) => {
    const userId = parseInt(req.headers['x-user-id'] as string) || 1;
    const { productId, quantity } = req.body;

    const cart = getUserCart(userId);
    const itemIndex = cart.items.findIndex((item: any) => item.productId === productId);

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Item not found in cart',
      });
    }

    if (quantity === 0) {
      // Remove item if quantity is 0
      cart.items.splice(itemIndex, 1);
    } else {
      // Update quantity
      cart.items[itemIndex].quantity = quantity;
    }

    // Recalculate totals
    calculateCartTotals(cart);
    userCarts.set(userId, cart);

    res.json({
      success: true,
      data: cart,
      message: quantity === 0 ? 'Item removed from cart' : 'Cart updated successfully',
    });
  }
);

// DELETE /api/cart/clear (clear cart)
router.delete('/clear', (req, res) => {
  const userId = parseInt(req.headers['x-user-id'] as string) || 1;

  const cart = getUserCart(userId);
  cart.items = [];
  calculateCartTotals(cart);
  userCarts.set(userId, cart);

  res.json({
    success: true,
    data: cart,
    message: 'Cart cleared successfully',
  });
});

// DELETE /api/cart/item/:productId (remove specific item)
router.delete('/item/:productId', (req, res) => {
  const userId = parseInt(req.headers['x-user-id'] as string) || 1;
  const productId = parseInt(req.params.productId);

  const cart = getUserCart(userId);
  const itemIndex = cart.items.findIndex((item: any) => item.productId === productId);

  if (itemIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Item not found in cart',
    });
  }

  cart.items.splice(itemIndex, 1);
  calculateCartTotals(cart);
  userCarts.set(userId, cart);

  res.json({
    success: true,
    data: cart,
    message: 'Item removed from cart',
  });
});

export default router;