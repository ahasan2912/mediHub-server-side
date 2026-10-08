import ApiError from '../utils/ApiError.js';
import { config } from '../config/env.js';

// Global error handler middleware
export const errorHandler = (err, req, res, next) => {
    let error = err;
    
    // If error is not an instance of ApiError, create one
    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode || 500;
        const message = error.message || 'Internal Server Error';
        error = new ApiError(statusCode, message, false, err.stack);
    }
    
    const response = {
        success: false,
        message: error.message,
        ...(config.nodeEnv === 'development' && { stack: error.stack })
    };
    
    // Log error for debugging
    if (config.nodeEnv === 'development') {
        console.error('❌ Error:', error);
    }
    
    res.status(error.statusCode).json(response);
};

export default errorHandler;
