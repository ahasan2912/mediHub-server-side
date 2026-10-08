import Stripe from 'stripe';
import { config } from '../../config/env.js';
import * as paymentRepository from './payment.repository.js';
import * as orderRepository from '../orders/order.repository.js';
import ApiError from '../../utils/ApiError.js';

const stripe = new Stripe(config.stripe.secretKey);

// Create payment intent
export const createPaymentIntent = async (price) => {
    const amount = parseInt(price * 100);
    
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ['card'],
    });
    
    return {
        clientSecret: paymentIntent.client_secret
    };
};

// Save payment and delete related orders
export const savePayment = async (paymentData) => {
    // Save payment record
    const paymentResult = await paymentRepository.createPayment(paymentData);
    
    // Delete related orders
    const deleteResult = await orderRepository.deleteOrdersByIds(paymentData.orderId);
    
    return { paymentResult, deleteResult };
};

// Get payment history by email
export const getPaymentHistory = async (email, decodedEmail) => {
    if (email !== decodedEmail) {
        throw new ApiError(403, 'forbidden access');
    }
    
    return await paymentRepository.findPaymentsByEmail(email);
};

// Get all payments (admin)
export const getAllPayments = async () => {
    return await paymentRepository.getAllPayments();
};

// Get all seller payments
export const getAllSellerPayments = async () => {
    return await paymentRepository.getAllSellerPayments();
};

export default {
    createPaymentIntent,
    savePayment,
    getPaymentHistory,
    getAllPayments,
    getAllSellerPayments
};
