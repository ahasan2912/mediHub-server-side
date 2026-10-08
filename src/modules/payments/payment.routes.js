import express from 'express';
import * as paymentController from './payment.controller.js';
import { verifyToken, verifyAdmin, verifySeller } from '../../middlewares/auth.middleware.js';
import { validatePaymentIntent, validatePayment } from './payment.validation.js';

const router = express.Router();

// POST /api/payments/create-payment-intent - Create Stripe payment intent
router.post('/create-payment-intent', validatePaymentIntent, paymentController.createPaymentIntent);

// POST /api/payments - Save payment and delete orders
router.post('/', validatePayment, paymentController.savePayment);

// GET /api/payments/:email - Get payment history
router.get('/:email', verifyToken, paymentController.getPaymentHistory);

// GET /api/payments/total/all - Get all payments (admin)
router.get('/total/all', verifyToken, verifyAdmin, paymentController.getTotalPayments);

// GET /api/payments/total/seller - Get all seller payments
router.get('/total/seller', verifyToken, verifySeller, paymentController.getTotalSellerPayments);

export default router;
