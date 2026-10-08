import express from 'express';
import * as userController from './user.controller.js';
import { verifyToken, verifyAdmin } from '../../middlewares/auth.middleware.js';
import { validateUserCreation, validateRoleUpdate, validateProfileUpdate } from './user.validation.js';

const router = express.Router();

// POST /api/users - Create new user
router.post('/', validateUserCreation, userController.createUser);

// GET /api/users/role/:email - Get user role
router.get('/role/:email', verifyToken, userController.getUserRole);

// GET /api/users/total - Get all users
router.get('/total', verifyToken, verifyAdmin, userController.getTotalUsers);

// GET /api/users/data/:email - Get user data
router.get('/data/:email', verifyToken, userController.getUserData);

// GET /api/users/:email - Get all users except given email
router.get('/:email', verifyToken, verifyAdmin, userController.getUsers);

// DELETE /api/users/:id - Delete user
router.delete('/:id', verifyToken, verifyAdmin, userController.deleteUser);

// PATCH /api/users/role/:id - Update user role
router.patch('/role/:id', verifyToken, verifyAdmin, validateRoleUpdate, userController.updateUserRole);

// PATCH /api/users/profile/:email - Update user profile
router.patch('/profile/:email', verifyToken, validateProfileUpdate, userController.updateUserProfile);

export default router;
