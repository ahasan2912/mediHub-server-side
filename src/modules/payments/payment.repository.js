import { getCollections } from '../../config/db.js';
import { ObjectId } from 'mongodb';

// Create payment record
export const createPayment = async (paymentData) => {
    const collections = getCollections();
    return await collections.payments.insertOne(paymentData);
};

// Find payments by email
export const findPaymentsByEmail = async (email) => {
    const collections = getCollections();
    let query = {};
    
    if (email) {
        query = { email };
    }
    
    return await collections.payments.find(query).toArray();
};

// Get all payments (admin)
export const getAllPayments = async () => {
    const collections = getCollections();
    return await collections.payments.find().toArray();
};

// Get all payments for seller
export const getAllSellerPayments = async () => {
    const collections = getCollections();
    return await collections.payments.find().toArray();
};

export default {
    createPayment,
    findPaymentsByEmail,
    getAllPayments,
    getAllSellerPayments
};
