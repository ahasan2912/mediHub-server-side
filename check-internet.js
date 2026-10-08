import dns from 'dns';
import { promisify } from 'util';

const resolve = promisify(dns.resolve);

console.log('=== Internet & DNS Check ===\n');

// Check basic internet connectivity
console.log('1️⃣  Checking internet connectivity...');
try {
    const addresses = await resolve('google.com');
    console.log('   ✅ Internet is working');
    console.log('   📍 Google resolved to:', addresses[0]);
} catch (error) {
    console.log('   ❌ No internet connection');
    process.exit(1);
}

// Check MongoDB DNS resolution
console.log('\n2️⃣  Checking MongoDB DNS resolution...');
try {
    const addresses = await resolve('cluster0.w0iow.mongodb.net');
    console.log('   ✅ MongoDB DNS resolved successfully');
    console.log('   📍 Cluster resolved to:', addresses[0]);
} catch (error) {
    console.log('   ❌ Cannot resolve MongoDB cluster DNS');
    console.log('   Error:', error.message);
    console.log('\n💡 Possible Solutions:');
    console.log('   1. Flush DNS cache: ipconfig /flushdns');
    console.log('   2. Change DNS to Google DNS (8.8.8.8)');
    console.log('   3. Restart your computer');
    console.log('   4. Check if VPN is blocking');
    process.exit(1);
}

// Check SRV records (MongoDB specific)
console.log('\n3️⃣  Checking MongoDB SRV records...');
try {
    const srvRecords = await promisify(dns.resolveSrv)('_mongodb._tcp.cluster0.w0iow.mongodb.net');
    console.log('   ✅ MongoDB SRV records found');
    console.log('   📍 SRV records:', srvRecords.length, 'entries');
} catch (error) {
    console.log('   ❌ Cannot resolve MongoDB SRV records');
    console.log('   Error:', error.code);
    
    if (error.code === 'ECONNREFUSED') {
        console.log('\n💡 This is your issue! Solutions:');
        console.log('   1. Go to MongoDB Atlas → Network Access');
        console.log('   2. Add your IP address or allow from anywhere (0.0.0.0/0)');
        console.log('   3. Wait 2-3 minutes for changes to propagate');
        console.log('   4. Try connecting again');
    }
    process.exit(1);
}

console.log('\n✅ All checks passed! MongoDB should be reachable.');
console.log('📝 If connection still fails, check MongoDB Atlas:');
console.log('   - Cluster is running (not paused)');
console.log('   - IP whitelist includes your IP');
console.log('   - Username and password are correct');
