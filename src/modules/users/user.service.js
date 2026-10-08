import * as userRepository from './user.repository.js';
import { UserRoles } from './user.model.js';
import ApiError from '../../utils/ApiError.js';

// Get user role by email
export const getUserRole = async (email) => {
    const user = await userRepository.findUserByEmail(email);
    return { role: user?.role };
};

// Get all users except the given email
export const getAllUsersExcept = async (email) => {
    return await userRepository.findAllUsersExcept(email);
};

// Get all users
export const getAllUsers = async () => {
    return await userRepository.findAllUsers();
};

// Get user data by email
export const getUserData = async (email) => {
    return await userRepository.findUserByEmail(email);
};

// Create a new user
export const createUser = async (userData) => {
    const existingUser = await userRepository.findUserByEmail(userData.email);
    
    if (existingUser) {
        return { 
            message: 'user already exists', 
            insertedId: null 
        };
    }
    
    return await userRepository.createUser(userData);
};

// Delete user by ID
export const deleteUser = async (id) => {
    return await userRepository.deleteUserById(id);
};

// Update user role
export const updateUserRole = async (id, role) => {
    if (!["Customer", "Seller", "Admin"].includes(role)) {
        throw new ApiError(400, 'Invalid role');
    }
    
    return await userRepository.updateUserRole(id, role);
};

// Update user profile
export const updateUserProfile = async (email, name, image) => {
    return await userRepository.updateUserProfile(email, name, image);
};

export default {
    getUserRole,
    getAllUsersExcept,
    getAllUsers,
    getUserData,
    createUser,
    deleteUser,
    updateUserRole,
    updateUserProfile
};
