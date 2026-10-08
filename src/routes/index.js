import express from 'express';

// Import all module routes
import authRoutes from '../auth/auth.routes.js';
import userRoutes from '../modules/users/user.routes.js';
import productRoutes from '../modules/products/product.routes.js';
import orderRoutes from '../modules/orders/order.routes.js';
import paymentRoutes from '../modules/payments/payment.routes.js';
import bannerRoutes from '../modules/banners/banner.routes.js';

const router = express.Router();

// Health check route
router.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'MediHub API is running',
        timestamp: new Date().toISOString()
    });
});

// Mount all module routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/payments', paymentRoutes);
router.use('/banners', bannerRoutes);

export default router;
