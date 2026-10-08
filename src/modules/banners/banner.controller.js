import asyncHandler from '../../utils/asyncHandler.js';
import ApiResponse from '../../utils/ApiResponse.js';
import * as bannerService from './banner.service.js';

// Create banner
export const createBanner = asyncHandler(async (req, res) => {
    const banner = req.body;
    const result = await bannerService.createBanner(banner);
    res.status(201).json(result);
});

// Get all banners
export const getBanners = asyncHandler(async (req, res) => {
    const result = await bannerService.getAllBanners();
    res.status(200).json(result);
});

// Delete banner
export const deleteBanner = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const result = await bannerService.deleteBanner(id);
    res.status(200).json(result);
});

export default {
    createBanner,
    getBanners,
    deleteBanner
};
