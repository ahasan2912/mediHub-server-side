// Validation middleware for order endpoints

export const validateOrderCreation = (req, res, next) => {
    const { productId, quantity } = req.body;
    
    if (!productId || !quantity) {
        return res.status(400).json({
            success: false,
            message: 'Product ID and quantity are required'
        });
    }
    
    next();
};

export const validateOrderUpdate = (req, res, next) => {
    const { quantity } = req.body;
    
    if (!quantity || quantity <= 0) {
        return res.status(400).json({
            success: false,
            message: 'Valid quantity is required'
        });
    }
    
    next();
};

export default {
    validateOrderCreation,
    validateOrderUpdate
};
