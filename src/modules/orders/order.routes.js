import express from 'express';
import * as orderController from './order.controller.js';
import { verifyToken, verifyAdmin, verifySeller } from '../../middlewares/auth.middleware.js';
import { validateOrderCreation, validateOrderUpdate } from './order.validation.js';

const router = express.Router();

// POST /api/orders - Create order
router.post('/', verifyToken, validateOrderCreation, orderController.createOrder);

// POST /api/orders/list - Create order list entry
router.post('/list', verifyToken, orderController.createOrderList);

// GET /api/orders/list - Get all order list (admin)
router.get('/list', verifyToken, verifyAdmin, orderController.getOrdersList);

// GET /api/orders - Get customer orders
router.get('/', orderController.getOrders);

// GET /api/orders/count/:email - Get seller orders count
router.get('/count/:email', orderController.getOrdersCount);

// GET /api/orders/seller/:email - Get seller orders
router.get('/seller/:email', verifyToken, verifySeller, orderController.getSellerOrders);

// GET /api/orders/seller/order/:email - Get seller orders paginated
router.get('/seller/order/:email', verifyToken, verifySeller, orderController.getSellerOrdersPaginated);

// GET /api/orders/chart/admin - Get admin chart data
router.get('/chart/admin', verifyToken, verifyAdmin, orderController.getAdminChart);

// GET /api/orders/chart/seller/:email - Get seller chart data
router.get('/chart/seller/:email', verifyToken, verifySeller, orderController.getSellerChart);

// GET /api/orders/:id - Get order by ID
router.get('/:id', verifyToken, orderController.getOrder);

// PATCH /api/orders/:id - Update order
router.patch('/:id', verifyToken, validateOrderUpdate, orderController.updateOrder);

// DELETE /api/orders/:id - Delete order
router.delete('/:id', verifyToken, orderController.deleteOrder);

export default router;
