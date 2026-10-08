import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import { getCollections } from '../config/db.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';

// Verify JWT token
export const verifyToken = asyncHandler(async (req, res, next) => {
    if (!req.headers.authorization) {
        throw new ApiError(401, 'unauthorized access');
    }
    
    const token = req.headers.authorization.split(' ')[1];
    
    jwt.verify(token, config.jwt.secret, (err, decoded) => {
        if (err) {
            throw new ApiError(401, 'unauthorized access');
        }
        req.decoded = decoded;
        next();
    });
});

// Verify Admin role
export const verifyAdmin = asyncHandler(async (req, res, next) => {
    const email = req.decoded.email;
    const collections = getCollections();
    
    const query = { email: email };
    const user = await collections.users.findOne(query);
    const isAdmin = user?.role === 'Admin';
    
    if (!isAdmin) {
        throw new ApiError(403, 'forbidden access');
    }
    
    next();
});

// Verify Seller role
export const verifySeller = asyncHandler(async (req, res, next) => {
    const email = req.decoded.email;
    const collections = getCollections();
    
    const query = { email: email };
    const user = await collections.users.findOne(query);
    const isSeller = user?.role === 'Seller';
    
    if (!isSeller) {
        throw new ApiError(403, 'forbidden access');
    }
    
    next();
});

export default { verifyToken, verifyAdmin, verifySeller };
