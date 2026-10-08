import { MongoClient, ServerApiVersion } from 'mongodb';
import { config } from './env.js';

const uri = `mongodb+srv://${config.db.user}:${config.db.pass}@cluster0.w0iow.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let db;
let collections = {};

export const connectDB = async () => {
    try {
        console.log('🔄 Attempting to connect to MongoDB...');
        console.log('📍 Database:', config.db.name);
        
        await client.connect();
        
        // Ping to verify connection
        await client.db("admin").command({ ping: 1 });
        
        db = client.db(config.db.name);
        
        // Initialize collections
        collections.users = db.collection('users');
        collections.products = db.collection('products');
        collections.orders = db.collection('orders');
        collections.banners = db.collection('banners');
        collections.payments = db.collection('payments');
        collections.orderList = db.collection('orderList');
        
        console.log('✅ Successfully connected to MongoDB!');
        return db;
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        console.error('💡 Troubleshooting tips:');
        console.error('   1. Check your internet connection');
        console.error('   2. Verify DB_USER and DB_PASS in .env file');
        console.error('   3. Check MongoDB cluster is running');
        console.error('   4. Verify your IP is whitelisted in MongoDB Atlas');
        throw error;
    }
};

export const getDB = () => {
    if (!db) {
        throw new Error('Database not initialized. Call connectDB first.');
    }
    return db;
};

export const getCollections = () => {
    if (!collections.users) {
        throw new Error('Collections not initialized. Call connectDB first.');
    }
    return collections;
};

export { client };
export default { connectDB, getDB, getCollections, client };
