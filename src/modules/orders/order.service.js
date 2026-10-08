import * as orderRepository from './order.repository.js';
import ApiError from '../../utils/ApiError.js';

// Create order
export const createOrder = async (orderData) => {
    return await orderRepository.createOrder(orderData);
};

// Create order list entry
export const createOrderListEntry = async (orderData) => {
    return await orderRepository.createOrderListEntry(orderData);
};

// Get all order list
export const getAllOrderList = async () => {
    return await orderRepository.getAllOrderList();
};

// Get customer orders
export const getCustomerOrders = async (email) => {
    return await orderRepository.findOrdersByCustomerEmail(email);
};

// Get seller orders
export const getSellerOrders = async (email, page, size) => {
    return await orderRepository.findOrdersBySellerEmail(email, page, size);
};

// Get order by ID
export const getOrderById = async (id) => {
    return await orderRepository.findOrderById(id);
};

// Update order
export const updateOrder = async (id, orderData) => {
    return await orderRepository.updateOrder(id, orderData);
};

// Delete order
export const deleteOrder = async (id) => {
    return await orderRepository.deleteOrderById(id);
};

// Delete multiple orders
export const deleteMultipleOrders = async (orderIds) => {
    return await orderRepository.deleteOrdersByIds(orderIds);
};

// Get seller orders count
export const getSellerOrdersCount = async (email) => {
    const count = await orderRepository.countOrdersBySeller(email);
    return { count };
};

// Get admin chart data
export const getAdminChartData = async () => {
    return await orderRepository.getAdminChartData();
};

// Get seller chart data
export const getSellerChartData = async (email) => {
    return await orderRepository.getSellerChartData(email);
};

export default {
    createOrder,
    createOrderListEntry,
    getAllOrderList,
    getCustomerOrders,
    getSellerOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
    deleteMultipleOrders,
    getSellerOrdersCount,
    getAdminChartData,
    getSellerChartData
};
