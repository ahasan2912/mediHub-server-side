import asyncHandler from '../../utils/asyncHandler.js';
import ApiResponse from '../../utils/ApiResponse.js';
import * as orderService from './order.service.js';
import { getPaginationParams } from '../../utils/pagination.js';

// Create order
export const createOrder = asyncHandler(async (req, res) => {
    const order = req.body;
    const result = await orderService.createOrder(order);
    res.status(201).json(result);
});

// Create order list entry
export const createOrderList = asyncHandler(async (req, res) => {
    const order = req.body;
    const result = await orderService.createOrderListEntry(order);
    res.status(201).json(result);
});

// Get all order list
export const getOrdersList = asyncHandler(async (req, res) => {
    const result = await orderService.getAllOrderList();
    res.status(200).json(result);
});

// Get customer orders
export const getOrders = asyncHandler(async (req, res) => {
    const email = req.query.email;
    const result = await orderService.getCustomerOrders(email);
    res.status(200).json(result);
});

// Get seller orders
export const getSellerOrders = asyncHandler(async (req, res) => {
    const email = req.params.email;
    const result = await orderService.getSellerOrders(email);
    res.status(200).json(result);
});

// Get seller orders with pagination
export const getSellerOrdersPaginated = asyncHandler(async (req, res) => {
    const { page, size } = getPaginationParams(req);
    const email = req.params.email;
    const result = await orderService.getSellerOrders(email, page, size);
    res.status(200).json(result);
});

// Get order by ID
export const getOrder = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const result = await orderService.getOrderById(id);
    res.status(200).json(result);
});

// Update order
export const updateOrder = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const medicine = req.body;
    const result = await orderService.updateOrder(id, medicine);
    res.status(200).json(result);
});

// Delete order
export const deleteOrder = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const result = await orderService.deleteOrder(id);
    res.status(200).json(result);
});

// Get seller orders count
export const getOrdersCount = asyncHandler(async (req, res) => {
    const email = req.params.email;
    const result = await orderService.getSellerOrdersCount(email);
    res.status(200).json(result);
});

// Get admin chart data
export const getAdminChart = asyncHandler(async (req, res) => {
    const result = await orderService.getAdminChartData();
    res.status(200).json(result);
});

// Get seller chart data
export const getSellerChart = asyncHandler(async (req, res) => {
    const email = req.params.email;
    const result = await orderService.getSellerChartData(email);
    res.status(200).json(result);
});

export default {
    createOrder,
    createOrderList,
    getOrdersList,
    getOrders,
    getSellerOrders,
    getSellerOrdersPaginated,
    getOrder,
    updateOrder,
    deleteOrder,
    getOrdersCount,
    getAdminChart,
    getSellerChart
};
