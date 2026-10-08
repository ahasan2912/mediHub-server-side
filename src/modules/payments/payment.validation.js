// Validation middleware for payment endpoints

export const validatePaymentIntent = (req, res, next) => {
    const { price } = req.body;
    
    if (!price || price <= 0) {
        return res.status(400).json({
            success: false,
            message: 'Valid price is required'
        });
    }
    
    next();
};

export const validatePayment = (req, res, next) => {
    const { email, orderId } = req.body;
    
    if (!email || !orderId || !Array.isArray(orderId) || orderId.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'Email and order IDs are required'
        });
    }
    
    next();
};

export default {
    validatePaymentIntent,
    validatePayment
};
