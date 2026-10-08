import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

// Generate JWT token
export const generateToken = (user) => {
    const token = jwt.sign(user, config.jwt.secret, { 
        expiresIn: config.jwt.expiresIn 
    });
    return token;
};

export default { generateToken };
