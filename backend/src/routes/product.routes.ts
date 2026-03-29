import express from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validateRequest';

const router = express.Router();

// Mock data for testing
const mockProducts = [
  {
    id: 1,
    name: 'Beras Pandan Wangi 5kg',
    category: 'Beras & Beras Ketan',
    price: 65000,
    stock: 50,
    description: 'Beras premium kualitas terbaik',
    imageUrl: '/images/beras-pandan.jpg',
  },
  {
    id: 2,
    name: 'Minyak Goreng Bimoli 2L',
    category: 'Minyak Goreng',
    price: 35000,
    stock: 100,
    description: 'Minyak goreng sehat tanpa kolesterol',
    imageUrl: '/images/minyak-bimoli.jpg',
  },
  {
    id: 3,
    name: 'Gula Pasir Gulaku 1kg',
    category: 'Gula & Pemanis',
    price: 15000,
    stock: 200,
    description: 'Gula pasir kristal putih',
    imageUrl: '/images/gula-gulaku.jpg',
  },
];

// GET /api/products
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: mockProducts,
    total: mockProducts.length,
  });
});

// GET /api/products/:id
router.get('/:id', (req, res) => {
  const product = mockProducts.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({
      success: false,
      error: 'Product not found',
    });
  }
  res.json({
    success: true,
    data: product,
  });
});

// POST /api/products
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Product name is required'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
  ],
  validateRequest,
  (req, res) => {
    const newProduct = {
      id: mockProducts.length + 1,
      ...req.body,
      createdAt: new Date(),
    };
    
    mockProducts.push(newProduct);
    
    res.status(201).json({
      success: true,
      data: newProduct,
      message: 'Product created successfully',
    });
  }
);

// PUT /api/products/:id
router.put('/:id', (req, res) => {
  const index = mockProducts.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'Product not found',
    });
  }
  
  mockProducts[index] = {
    ...mockProducts[index],
    ...req.body,
    updatedAt: new Date(),
  };
  
  res.json({
    success: true,
    data: mockProducts[index],
    message: 'Product updated successfully',
  });
});

// DELETE /api/products/:id
router.delete('/:id', (req, res) => {
  const index = mockProducts.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'Product not found',
    });
  }
  
  mockProducts.splice(index, 1);
  
  res.json({
    success: true,
    message: 'Product deleted successfully',
  });
});

export default router;