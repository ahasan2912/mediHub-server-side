import asyncHandler from '../../utils/asyncHandler.js';
import ApiResponse from '../../utils/ApiResponse.js';
import ApiError from '../../utils/ApiError.js';
import * as userService from './user.service.js';

// Get user role
export const getUserRole = asyncHandler(async (req, res) => {
    const email = req.params.email;
    const result = await userService.getUserRole(email);
    res.status(200).json(result);
});

// Get all users except current user
export const getUsers = asyncHandler(async (req, res) => {
    const email = req.params.email;
    const result = await userService.getAllUsersExcept(email);
    res.status(200).json(result);
});

// Get total users
export const getTotalUsers = asyncHandler(async (req, res) => {
    const result = await userService.getAllUsers();
    res.status(200).json(result);
});

// Get user data by email
export const getUserData = asyncHandler(async (req, res) => {
    const email = req.params.email;
    const result = await userService.getUserData(email);
    res.status(200).json(result);
});

// Create new user
export const createUser = asyncHandler(async (req, res) => {
    const user = req.body;
    const result = await userService.createUser(user);
    res.status(201).json(result);
});

// Delete user
export const deleteUser = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const result = await userService.deleteUser(id);
    res.status(200).json(result);
});

// Update user role
export const updateUserRole = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { role } = req.body;
    const result = await userService.updateUserRole(id, role);
    res.status(200).json(result);
});

// Update user profile
export const updateUserProfile = asyncHandler(async (req, res) => {
    const email = req.params.email;
    const { name, image } = req.body;
    const result = await userService.updateUserProfile(email, name, image);
    res.status(200).json(result);
});

export default {
    getUserRole,
    getUsers,
    getTotalUsers,
    getUserData,
    createUser,
    deleteUser,
    updateUserRole,
    updateUserProfile
};
