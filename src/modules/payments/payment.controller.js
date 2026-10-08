import asyncHandler from '../../utils/asyncHandler.js';
import ApiResponse from '../../utils/ApiResponse.js';
import * as paymentService from './payment.service.js';

// Create payment intent
export const createPaymentIntent = asyncHandler(async (req, res) => {
    const { price } = req.body;
    const result = await paymentService.createPaymentIntent(price);
    res.status(200).json(result);
});

// Save payment
export const savePayment = asyncHandler(async (req, res) => {
    const payment = req.body;
    const result = await paymentService.savePayment(payment);
    res.status(201).json(result);
});

// Get payment history
export const getPaymentHistory = asyncHandler(async (req, res) => {
    const email = req.params.email;
    const decodedEmail = req.decoded.email;
    const result = await paymentService.getPaymentHistory(email, decodedEmail);
    res.status(200).json(result);
});

// Get total payments (admin)
export const getTotalPayments = asyncHandler(async (req, res) => {
    const result = await paymentService.getAllPayments();
    res.status(200).json(result);
});

// Get total seller payments
export const getTotalSellerPayments = asyncHandler(async (req, res) => {
    const result = await paymentService.getAllSellerPayments();
    res.status(200).json(result);
});

export default {
    createPaymentIntent,
    savePayment,
    getPaymentHistory,
    getTotalPayments,
    getTotalSellerPayments
};
