// Validation middleware for product endpoints

export const validateProductCreation = (req, res, next) => {
    const { name, price } = req.body;
    
    if (!name || !price) {
        return res.status(400).json({
            success: false,
            message: 'Name and price are required'
        });
    }
    
    next();
};

export const validateProductUpdate = (req, res, next) => {
    const { name, price } = req.body;
    
    if (!name || !price) {
        return res.status(400).json({
            success: false,
            message: 'Name and price are required'
        });
    }
    
    next();
};

export default {
    validateProductCreation,
    validateProductUpdate
};
