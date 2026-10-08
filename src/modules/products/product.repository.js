import { ObjectId } from 'mongodb';
import { getCollections } from '../../config/db.js';

// Find product by ID
export const findProductById = async (id) => {
    const collections = getCollections();
    const query = { _id: new ObjectId(id) };
    return await collections.products.findOne(query);
};

// Find all products with pagination, search, and sort
export const findAllProducts = async (search, sort, page, size) => {
    const collections = getCollections();
    let options = {};
    let query = {};
    
    if (search) {
        query = {
            $or: [
                { name: { $regex: String(search), $options: 'i' } },
                { company: { $regex: String(search), $options: 'i' } }
            ]
        };
    }
    
    if (sort) {
        options = {
            sort: {
                price: parseInt(sort === 'asc' ? 1 : -1)
            }
        };
    }
    
    return await collections.products.find(query, options)
        .skip(page * size)
        .limit(size)
        .toArray();
};

// Find products by category
export const findProductsByCategory = async (category, page, size) => {
    const collections = getCollections();
    let query = {};
    
    if (category) {
        query = { category };
    }
    
    return await collections.products.find(query)
        .skip(page * size)
        .limit(size)
        .toArray();
};

// Find products by seller email
export const findProductsBySeller = async (email, page, size) => {
    const collections = getCollections();
    let query = {};
    
    if (email) {
        query = { 'seller.email': email };
    }
    
    return await collections.products.find(query)
        .skip(page * size)
        .limit(size)
        .toArray();
};

// Count products by seller
export const countProductsBySeller = async (email) => {
    const collections = getCollections();
    let query = {};
    
    if (email) {
        query = { 'seller.email': email };
    }
    
    return await collections.products.countDocuments(query);
};

// Get total products count
export const getTotalProductsCount = async () => {
    const collections = getCollections();
    return await collections.products.estimatedDocumentCount();
};

// Create new product
export const createProduct = async (productData) => {
    const collections = getCollections();
    return await collections.products.insertOne(productData);
};

// Update product
export const updateProduct = async (id, productData) => {
    const collections = getCollections();
    const filter = { _id: new ObjectId(id) };
    const { name, image, category, company, description, price, quantity } = productData;
    
    const updatedDoc = {
        $set: {
            name,
            image,
            category,
            company,
            description,
            price,
            quantity
        }
    };
    
    return await collections.products.updateOne(filter, updatedDoc);
};

// Delete product by ID
export const deleteProductById = async (id) => {
    const collections = getCollections();
    const query = { _id: new ObjectId(id) };
    return await collections.products.deleteOne(query);
};

export default {
    findProductById,
    findAllProducts,
    findProductsByCategory,
    findProductsBySeller,
    countProductsBySeller,
    getTotalProductsCount,
    createProduct,
    updateProduct,
    deleteProductById
};
