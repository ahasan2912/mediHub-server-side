# MongoDB Connection Troubleshooting

## Error: `querySrv ECONNREFUSED _mongodb._tcp.cluster0.w0iow.mongodb.net`

এই error টি DNS resolution সমস্যার কারণে হয়। নিচের solutions try করুন:

## Solution 1: Internet Connection Check করুন

```bash
# Test internet connectivity
ping 8.8.8.8

# Test DNS resolution
nslookup cluster0.w0iow.mongodb.net
```

## Solution 2: MongoDB Atlas IP Whitelist

1. MongoDB Atlas এ login করুন
2. আপনার cluster এ যান
3. **Network Access** section এ যান
4. **Add IP Address** click করুন
5. **Allow Access from Anywhere** select করুন (বা আপনার current IP add করুন)
6. **Confirm** করুন

## Solution 3: VPN বা Firewall Check

যদি আপনি VPN বা corporate network ব্যবহার করেন:
- VPN বন্ধ করে try করুন
- Firewall settings check করুন
- Port 27017 open আছে কিনা check করুন

## Solution 4: DNS Server পরিবর্তন করুন

Windows এ:
1. Control Panel → Network and Sharing Center
2. Change adapter settings
3. Right-click your connection → Properties
4. Select IPv4 → Properties
5. Use these DNS servers:
   - Preferred: `8.8.8.8` (Google)
   - Alternate: `8.8.4.4` (Google)
6. Save এবং connection restart করুন

## Solution 5: MongoDB Connection String Alternative

যদি DNS issue persist করে, direct connection string try করুন:

`.env` file এ add করুন:
\`\`\`env
MONGODB_URI=mongodb+srv://mediHub-fullstack:vSKoEWtswMe1tsx4@cluster0.w0iow.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
\`\`\`

তারপর `src/config/db.js` update করুন:
\`\`\`javascript
const uri = process.env.MONGODB_URI || 
            \`mongodb+srv://\${config.db.user}:\${config.db.pass}@cluster0.w0iow.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0\`;
\`\`\`

## Solution 6: Flush DNS Cache

Windows এ:
\`\`\`bash
ipconfig /flushdns
\`\`\`

Mac/Linux এ:
\`\`\`bash
sudo dscacheutil -flushcache
# or
sudo killall -HUP mDNSResponder
\`\`\`

## Solution 7: Old index.js দিয়ে Test করুন

যদি old file কাজ করে কিন্তু new structure কাজ না করে:

\`\`\`bash
# Temporarily restore old file
cp index.js.old index.temp.js

# Update package.json main temporarily
# "main": "index.temp.js"

# Test
node index.temp.js
\`\`\`

যদি এটা কাজ করে, তাহলে সমস্যা structure এ নয়, environment এ।

## Solution 8: MongoDB Compass দিয়ে Test করুন

1. MongoDB Compass download করুন
2. Connection string দিয়ে connect করার try করুন:
   \`\`\`
   mongodb+srv://mediHub-fullstack:vSKoEWtswMe1tsx4@cluster0.w0iow.mongodb.net/
   \`\`\`
3. যদি Compass connect করতে পারে, তাহলে Node.js environment এ সমস্যা

## Solution 9: Node.js DNS Module Test

Test script run করুন:
\`\`\`bash
node -e "require('dns').resolve('cluster0.w0iow.mongodb.net', (err, addresses) => { if(err) console.error('DNS Error:', err); else console.log('Resolved:', addresses); })"
\`\`\`

## Quick Check Commands

\`\`\`bash
# 1. Test connection with old file
node index.js.old

# 2. Test with new structure
node test-connection.js

# 3. Check environment variables
node -e "require('dotenv').config(); console.log('DB_USER:', process.env.DB_USER ? 'OK' : 'MISSING')"

# 4. Test MongoDB driver
npm list mongodb
\`\`\`

## যদি কোনো solution কাজ না করে:

1. **Restart your computer** - DNS cache clear হতে পারে
2. **Check MongoDB Atlas Status**: https://status.mongodb.com/
3. **Try different network** - mobile hotspot try করুন
4. **Contact MongoDB Support** - যদি cluster issue হয়

---

## বর্তমান Status Check করুন:

\`\`\`bash
# Run this command to see current status
node test-connection.js
\`\`\`

যদি সমস্যা সমাধান না হয়, screenshot সহ error message share করুন।
