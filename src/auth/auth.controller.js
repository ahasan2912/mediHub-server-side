import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import { generateToken } from './auth.service.js';

// Generate JWT token for user
export const createToken = asyncHandler(async (req, res) => {
    const user = req.body;
    const token = generateToken(user);
    
    res.status(200).json(new ApiResponse(200, { token }, 'Token generated successfully'));
});

export default { createToken };
