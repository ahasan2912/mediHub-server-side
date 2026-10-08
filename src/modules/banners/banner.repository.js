import { ObjectId } from 'mongodb';
import { getCollections } from '../../config/db.js';

// Create banner
export const createBanner = async (bannerData) => {
    const collections = getCollections();
    return await collections.banners.insertOne(bannerData);
};

// Get all banners
export const getAllBanners = async () => {
    const collections = getCollections();
    return await collections.banners.find().toArray();
};

// Delete banner by ID
export const deleteBannerById = async (id) => {
    const collections = getCollections();
    const query = { _id: new ObjectId(id) };
    return await collections.banners.deleteOne(query);
};

export default {
    createBanner,
    getAllBanners,
    deleteBannerById
};
