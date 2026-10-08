import asyncHandler from '../../utils/asyncHandler.js';
import ApiResponse from '../../utils/ApiResponse.js';
import * as productService from './product.service.js';
import { getPaginationParams } from '../../utils/pagination.js';

// Get product by ID
export const getProduct = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const result = await productService.getProductById(id);
    res.status(200).json(result);
});

// Get all products
export const getProducts = asyncHandler(async (req, res) => {
    const search = req.query.search;
    const sort = req.query.sort;
    const { page, size } = getPaginationParams(req);
    
    const result = await productService.getAllProducts(search, sort, page, size);
    res.status(200).json(result);
});

// Get products by category
export const getProductsByCategory = asyncHandler(async (req, res) => {
    const { page, size } = getPaginationParams(req);
    const category = req.query.category;
    
    const result = await productService.getProductsByCategory(category, page, size);
    res.status(200).json(result);
});

// Get seller products
export const getSellerProducts = asyncHandler(async (req, res) => {
    const { page, size } = getPaginationParams(req);
    const email = req.params.email;
    
    const result = await productService.getSellerProducts(email, page, size);
    res.status(200).json(result);
});

// Get seller specific product
export const getSellerProduct = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const result = await productService.getProductById(id);
    res.status(200).json(result);
});

// Get admin products
export const getAdminProducts = asyncHandler(async (req, res) => {
    const { page, size } = getPaginationParams(req);
    const result = await productService.getAdminProducts(page, size);
    res.status(200).json(result);
});

// Get admin specific product
export const getAdminProduct = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const result = await productService.getProductById(id);
    res.status(200).json(result);
});

// Get products count
export const getProductsCount = asyncHandler(async (req, res) => {
    const result = await productService.getProductsCount();
    res.status(200).json(result);
});

// Get seller product count
export const getSellerProductCount = asyncHandler(async (req, res) => {
    const email = req.params.email;
    const result = await productService.getSellerProductCount(email);
    res.status(200).json(result);
});

// Create product
export const createProduct = asyncHandler(async (req, res) => {
    const product = req.body;
    const result = await productService.createProduct(product);
    res.status(201).json(result);
});

// Update seller product
export const updateSellerProduct = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = req.body;
    const result = await productService.updateProduct(id, product);
    res.status(200).json(result);
});

// Update admin product
export const updateAdminProduct = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = req.body;
    const result = await productService.updateProduct(id, product);
    res.status(200).json(result);
});

// Delete seller product
export const deleteSellerProduct = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const result = await productService.deleteProduct(id);
    res.status(200).json(result);
});

// Delete admin product
export const deleteAdminProduct = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const result = await productService.deleteProduct(id);
    res.status(200).json(result);
});

export default {
    getProduct,
    getProducts,
    getProductsByCategory,
    getSellerProducts,
    getSellerProduct,
    getAdminProducts,
    getAdminProduct,
    getProductsCount,
    getSellerProductCount,
    createProduct,
    updateSellerProduct,
    updateAdminProduct,
    deleteSellerProduct,
    deleteAdminProduct
};
