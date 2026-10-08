import * as productRepository from './product.repository.js';
import ApiError from '../../utils/ApiError.js';

// Get product by ID
export const getProductById = async (id) => {
    return await productRepository.findProductById(id);
};

// Get all products with filters
export const getAllProducts = async (search, sort, page, size) => {
    return await productRepository.findAllProducts(search, sort, page, size);
};

// Get products by category
export const getProductsByCategory = async (category, page, size) => {
    return await productRepository.findProductsByCategory(category, page, size);
};

// Get seller products
export const getSellerProducts = async (email, page, size) => {
    return await productRepository.findProductsBySeller(email, page, size);
};

// Get admin products (all products with pagination)
export const getAdminProducts = async (page, size) => {
    return await productRepository.findProductsBySeller(null, page, size);
};

// Get seller product count
export const getSellerProductCount = async (email) => {
    const count = await productRepository.countProductsBySeller(email);
    return { count };
};

// Get total products count
export const getProductsCount = async () => {
    const count = await productRepository.getTotalProductsCount();
    return { count };
};

// Create product
export const createProduct = async (productData) => {
    return await productRepository.createProduct(productData);
};

// Update product
export const updateProduct = async (id, productData) => {
    return await productRepository.updateProduct(id, productData);
};

// Delete product
export const deleteProduct = async (id) => {
    return await productRepository.deleteProductById(id);
};

export default {
    getProductById,
    getAllProducts,
    getProductsByCategory,
    getSellerProducts,
    getAdminProducts,
    getSellerProductCount,
    getProductsCount,
    createProduct,
    updateProduct,
    deleteProduct
};
