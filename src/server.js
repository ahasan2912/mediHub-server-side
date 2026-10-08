import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import app from './app.js';
import { connectDB } from './config/db.js';
import { config } from './config/env.js';
import logger from './config/logger.js';

const PORT = config.port;

// Function to start the server
const startServer = async () => {
    try {
        // Connect to MongoDB
        await connectDB();
        logger.success('Database connected successfully');
        
        // Start Express server
        app.listen(PORT, () => {
            logger.info(`MediHub application is running on port ${PORT}`);
            logger.info(`Environment: ${config.nodeEnv}`);
            logger.info(`API endpoint: http://localhost:${PORT}/api`);
        });
    } catch (error) {
        logger.error('Failed to start server:', error);
        process.exit(1);
    }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    logger.error('Unhandled Promise Rejection:', err);
    process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception:', err);
    process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    logger.info('SIGTERM received, shutting down gracefully');
    process.exit(0);
});

process.on('SIGINT', () => {
    logger.info('SIGINT received, shutting down gracefully');
    process.exit(0);
});

// Start the server
startServer();

export default app;
