import express from 'express';
import { createToken } from './auth.controller.js';
import { validateTokenRequest } from './auth.validation.js';

const router = express.Router();

// POST /api/auth/jwt - Generate JWT token
router.post('/jwt', validateTokenRequest, createToken);

export default router;
