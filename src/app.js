import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Import middlewares
import { errorHandler } from './middlewares/error.middleware.js';
import { notFound } from './middlewares/notFound.middleware.js';

// Import routes
import routes from './routes/index.js';

// Create Express app
const app = express();

// Middleware configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Root route
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'MediHub application is running',
        version: '2.0.0',
        timestamp: new Date().toISOString()
    });
});

// Mount API routes
app.use('/api', routes);

// 404 handler - must come after all routes
app.use(notFound);

// Global error handler - must be last
app.use(errorHandler);

export default app;
