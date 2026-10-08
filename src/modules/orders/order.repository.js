import { ObjectId } from 'mongodb';
import { getCollections } from '../../config/db.js';

// Create order
export const createOrder = async (orderData) => {
    const collections = getCollections();
    return await collections.orders.insertOne(orderData);
};

// Create order list entry
export const createOrderListEntry = async (orderData) => {
    const collections = getCollections();
    return await collections.orderList.insertOne(orderData);
};

// Get all order list entries
export const getAllOrderList = async () => {
    const collections = getCollections();
    return await collections.orderList.find().toArray();
};

// Find orders by customer email
export const findOrdersByCustomerEmail = async (email) => {
    const collections = getCollections();
    let query = {};
    
    if (email) {
        query = { 'customer.email': email };
    }
    
    return await collections.orders.find(query).toArray();
};

// Find orders by seller email
export const findOrdersBySellerEmail = async (email, page, size) => {
    const collections = getCollections();
    const query = { seller: email };
    
    return await collections.orders.find(query)
        .skip(page * size)
        .limit(size)
        .toArray();
};

// Find order by ID
export const findOrderById = async (id) => {
    const collections = getCollections();
    const query = { _id: new ObjectId(id) };
    return await collections.orders.findOne(query);
};

// Update order
export const updateOrder = async (id, orderData) => {
    const collections = getCollections();
    const filter = { _id: new ObjectId(id) };
    const updatedDoc = {
        $set: {
            "customer.name": orderData?.name,
            quantity: orderData?.quantity,
            address: orderData?.address,
            phone: orderData?.phone
        }
    };
    
    return await collections.orders.updateOne(filter, updatedDoc);
};

// Delete order by ID
export const deleteOrderById = async (id) => {
    const collections = getCollections();
    const query = { _id: new ObjectId(id) };
    return await collections.orders.deleteOne(query);
};

// Delete multiple orders by IDs
export const deleteOrdersByIds = async (orderIds) => {
    const collections = getCollections();
    const query = {
        _id: {
            $in: orderIds.map(id => new ObjectId(id))
        }
    };
    return await collections.orders.deleteMany(query);
};

// Count orders by seller
export const countOrdersBySeller = async (email) => {
    const collections = getCollections();
    const query = { seller: email };
    return await collections.orders.countDocuments(query);
};

// Get admin chart data
export const getAdminChartData = async () => {
    const collections = getCollections();
    return await collections.orders.aggregate([
        { $sort: { _id: -1 } },
        {
            $addFields: {
                _id: {
                    $dateToString: {
                        format: '%Y-%m-%d',
                        date: { $toDate: '$_id' },
                    },
                },
                quantity: { $sum: '$quantity' },
                price: { $sum: '$price' },
                order: { $sum: 1 },
            },
        },
        {
            $project: {
                _id: 0,
                date: '$_id',
                quantity: 1,
                order: 1,
                price: 1,
            }
        },
    ]).toArray();
};

// Get seller chart data
export const getSellerChartData = async (email) => {
    const collections = getCollections();
    const query = { seller: email };
    
    return await collections.orders.aggregate([
        {
            $match: query,
        },
        { $sort: { _id: -1 } },
        {
            $addFields: {
                _id: {
                    $dateToString: {
                        format: '%Y-%m-%d',
                        date: { $toDate: '$_id' },
                    },
                },
                quantity: { $sum: '$quantity' },
                price: { $sum: '$price' },
                order: { $sum: 1 },
            },
        },
        {
            $project: {
                _id: 0,
                date: '$_id',
                quantity: 1,
                order: 1,
                price: 1,
            }
        },
    ]).toArray();
};

export default {
    createOrder,
    createOrderListEntry,
    getAllOrderList,
    findOrdersByCustomerEmail,
    findOrdersBySellerEmail,
    findOrderById,
    updateOrder,
    deleteOrderById,
    deleteOrdersByIds,
    countOrdersBySeller,
    getAdminChartData,
    getSellerChartData
};
