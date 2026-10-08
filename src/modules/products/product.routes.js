import express from 'express';
import * as productController from './product.controller.js';
import { verifyToken, verifyAdmin, verifySeller } from '../../middlewares/auth.middleware.js';
import { validateProductCreation, validateProductUpdate } from './product.validation.js';

const router = express.Router();

// Public routes
// GET /api/products - Get all products with search and sort
router.get('/', productController.getProducts);

// GET /api/products/categories - Get products by category
router.get('/categories', productController.getProductsByCategory);

// GET /api/products/count - Get total products count
router.get('/count', productController.getProductsCount);

// GET /api/products/:id - Get single product by ID
router.get('/:id', productController.getProduct);

// Seller routes
// POST /api/products/seller - Create product
router.post('/seller', verifyToken, verifySeller, validateProductCreation, productController.createProduct);

// GET /api/products/seller/:email - Get seller products
router.get('/seller/:email', verifyToken, verifySeller, productController.getSellerProducts);

// GET /api/products/seller/count/:email - Get seller product count
router.get('/seller/count/:email', productController.getSellerProductCount);

// GET /api/products/seller/product/:id - Get seller specific product
router.get('/seller/product/:id', verifyToken, verifySeller, productController.getSellerProduct);

// PATCH /api/products/seller/:id - Update seller product
router.patch('/seller/:id', verifyToken, verifySeller, validateProductUpdate, productController.updateSellerProduct);

// DELETE /api/products/seller/:id - Delete seller product
router.delete('/seller/:id', verifyToken, verifySeller, productController.deleteSellerProduct);

// Admin routes
// GET /api/products/admin - Get all products (admin)
router.get('/admin', verifyToken, verifyAdmin, productController.getAdminProducts);

// GET /api/products/admin/:id - Get admin specific product
router.get('/admin/:id', verifyToken, verifyAdmin, productController.getAdminProduct);

// PATCH /api/products/admin/:id - Update admin product
router.patch('/admin/:id', verifyToken, verifyAdmin, validateProductUpdate, productController.updateAdminProduct);

// DELETE /api/products/admin/:id - Delete admin product
router.delete('/admin/:id', verifyToken, verifyAdmin, productController.deleteAdminProduct);

export default router;
