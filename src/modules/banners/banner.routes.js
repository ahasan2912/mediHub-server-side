import express from 'express';
import * as bannerController from './banner.controller.js';
import { verifyToken, verifyAdmin } from '../../middlewares/auth.middleware.js';
import { validateBannerCreation } from './banner.validation.js';

const router = express.Router();

// GET /api/banners - Get all banners (public)
router.get('/', bannerController.getBanners);

// POST /api/banners - Create banner (admin only)
router.post('/', verifyToken, verifyAdmin, validateBannerCreation, bannerController.createBanner);

// DELETE /api/banners/:id - Delete banner (admin only)
router.delete('/:id', verifyToken, verifyAdmin, bannerController.deleteBanner);

export default router;
