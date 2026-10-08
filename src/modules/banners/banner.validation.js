// Validation middleware for banner endpoints

export const validateBannerCreation = (req, res, next) => {
    const { image, title } = req.body;
    
    if (!image || !title) {
        return res.status(400).json({
            success: false,
            message: 'Image and title are required'
        });
    }
    
    next();
};

export default {
    validateBannerCreation
};
