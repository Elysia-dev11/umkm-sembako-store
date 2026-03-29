import express from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validateRequest';

const router = express.Router();

// Mock data for categories
const categories = [
  {
    id: 1,
    name: 'Beras & Beras Ketan',
    description: 'Berbagai jenis beras premium',
    slug: 'beras-beras-ketan',
    imageUrl: '/categories/beras.jpg',
    productCount: 15,
    createdAt: new Date('2026-01-15'),
  },
  {
    id: 2,
    name: 'Minyak Goreng',
    description: 'Minyak goreng sehat dan berkualitas',
    slug: 'minyak-goreng',
    imageUrl: '/categories/minyak.jpg',
    productCount: 8,
    createdAt: new Date('2026-01-15'),
  },
  {
    id: 3,
    name: 'Gula & Pemanis',
    description: 'Gula pasir, gula merah, dan pemanis lainnya',
    slug: 'gula-pemanis',
    imageUrl: '/categories/gula.jpg',
    productCount: 12,
    createdAt: new Date('2026-01-15'),
  },
  {
    id: 4,
    name: 'Susu & Produk Olahan',
    description: 'Susu bubuk, kental manis, dan produk susu lainnya',
    slug: 'susu-produk-olahan',
    imageUrl: '/categories/susu.jpg',
    productCount: 10,
    createdAt: new Date('2026-01-15'),
  },
  {
    id: 5,
    name: 'Bumbu Dapur',
    description: 'Bumbu masak lengkap untuk kebutuhan dapur',
    slug: 'bumbu-dapur',
    imageUrl: '/categories/bumbu.jpg',
    productCount: 25,
    createdAt: new Date('2026-01-15'),
  },
];

// GET /api/categories
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: categories,
    total: categories.length,
  });
});

// GET /api/categories/:id
router.get('/:id', (req, res) => {
  const category = categories.find(c => c.id === parseInt(req.params.id));
  if (!category) {
    return res.status(404).json({
      success: false,
      error: 'Category not found',
    });
  }
  res.json({
    success: true,
    data: category,
  });
});

// GET /api/categories/slug/:slug
router.get('/slug/:slug', (req, res) => {
  const category = categories.find(c => c.slug === req.params.slug);
  if (!category) {
    return res.status(404).json({
      success: false,
      error: 'Category not found',
    });
  }
  res.json({
    success: true,
    data: category,
  });
});

// POST /api/categories
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Category name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('slug').notEmpty().withMessage('Slug is required'),
  ],
  validateRequest,
  (req, res) => {
    const newCategory = {
      id: categories.length + 1,
      ...req.body,
      productCount: 0,
      createdAt: new Date(),
    };
    
    categories.push(newCategory);
    
    res.status(201).json({
      success: true,
      data: newCategory,
      message: 'Category created successfully',
    });
  }
);

// PUT /api/categories/:id
router.put('/:id', (req, res) => {
  const index = categories.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'Category not found',
    });
  }
  
  categories[index] = {
    ...categories[index],
    ...req.body,
  };
  
  res.json({
    success: true,
    data: categories[index],
    message: 'Category updated successfully',
  });
});

// DELETE /api/categories/:id
router.delete('/:id', (req, res) => {
  const index = categories.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'Category not found',
    });
  }
  
  // Check if category has products
  if (categories[index].productCount > 0) {
    return res.status(400).json({
      success: false,
      error: 'Cannot delete category with products',
    });
  }
  
  categories.splice(index, 1);
  
  res.json({
    success: true,
    message: 'Category deleted successfully',
  });
});

export default router;