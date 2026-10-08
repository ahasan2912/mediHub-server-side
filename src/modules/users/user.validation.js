// Validation middleware for user endpoints

export const validateUserCreation = (req, res, next) => {
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({
            success: false,
            message: 'Email is required'
        });
    }
    
    next();
};

export const validateRoleUpdate = (req, res, next) => {
    const { role } = req.body;
    
    if (!role) {
        return res.status(400).json({
            success: false,
            message: 'Role is required'
        });
    }
    
    next();
};

export const validateProfileUpdate = (req, res, next) => {
    const { name } = req.body;
    
    if (!name) {
        return res.status(400).json({
            success: false,
            message: 'Name is required'
        });
    }
    
    next();
};

export default {
    validateUserCreation,
    validateRoleUpdate,
    validateProfileUpdate
};
