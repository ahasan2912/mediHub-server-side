// Validation schemas for auth endpoints
// You can use libraries like Joi or express-validator here

export const validateTokenRequest = (req, res, next) => {
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({
            success: false,
            message: 'Email is required'
        });
    }
    
    next();
};

export default { validateTokenRequest };
