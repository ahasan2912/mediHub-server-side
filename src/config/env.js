import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const config = {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    
    // Database
    db: {
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        name: 'mediHub-store'
    },
    
    // JWT
    jwt: {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: '5h'
    },
    
    // Stripe
    stripe: {
        secretKey: process.env.STRIPE_SECRET_KEY
    }
};

export default config;
