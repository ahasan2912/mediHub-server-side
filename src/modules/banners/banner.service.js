import * as bannerRepository from './banner.repository.js';

// Create banner
export const createBanner = async (bannerData) => {
    return await bannerRepository.createBanner(bannerData);
};

// Get all banners
export const getAllBanners = async () => {
    return await bannerRepository.getAllBanners();
};

// Delete banner
export const deleteBanner = async (id) => {
    return await bannerRepository.deleteBannerById(id);
};

export default {
    createBanner,
    getAllBanners,
    deleteBanner
};
