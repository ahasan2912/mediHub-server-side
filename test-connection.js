import { connectDB } from './src/config/db.js';
import { config } from './src/config/env.js';

console.log('=== MongoDB Connection Test ===\n');
console.log('Environment Variables:');
console.log('- PORT:', config.port);
console.log('- NODE_ENV:', config.nodeEnv);
console.log('- DB_USER:', config.db.user ? '✅ Set' : '❌ Missing');
console.log('- DB_PASS:', config.db.pass ? '✅ Set' : '❌ Missing');
console.log('- DB_NAME:', config.db.name);
console.log('- JWT_SECRET:', config.jwt.secret ? '✅ Set' : '❌ Missing');
console.log('- STRIPE_KEY:', config.stripe.secretKey ? '✅ Set' : '❌ Missing');
console.log('\n=== Attempting MongoDB Connection ===\n');

connectDB()
    .then(() => {
        console.log('\n✅ Connection test PASSED!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n❌ Connection test FAILED!');
        console.error('Error details:', error.message);
        process.exit(1);
    });
