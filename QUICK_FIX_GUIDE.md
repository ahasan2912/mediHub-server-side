# 🔥 Quick Fix Guide - MongoDB Connection Error

## ❌ Error: `querySrv ECONNREFUSED _mongodb._tcp.cluster0.w0iow.mongodb.net`

---

## 🎯 দ্রুত সমাধান (যেকোনো একটি try করুন):

### Solution 1: Internet Connection Fix (সবচেয়ে সম্ভাব্য)

**Windows Command Prompt (Administrator হিসেবে চালান):**
\`\`\`bash
# DNS cache flush করুন
ipconfig /flushdns

# Network reset করুন
ipconfig /release
ipconfig /renew

# DNS server change করুন Google DNS এ
# Control Panel → Network → Change Adapter Settings
# Right-click connection → Properties → IPv4 → Properties
# DNS: 8.8.8.8 এবং 8.8.4.4
\`\`\`

তারপর computer restart করুন।

---

### Solution 2: MongoDB Atlas IP Whitelist (সবচেয়ে common issue)

1. **MongoDB Atlas Dashboard** এ যান: https://cloud.mongodb.com
2. আপনার project select করুন
3. Left sidebar থেকে **"Network Access"** click করুন
4. **"Add IP Address"** button click করুন
5. দুটি option:
   - **Option A**: "Allow Access from Anywhere" select করুন (0.0.0.0/0)
   - **Option B**: "Add Current IP Address" click করুন
6. **"Confirm"** click করুন
7. **2-3 মিনিট অপেক্ষা করুন** - changes propagate হতে সময় লাগে

#### Visual Guide:
\`\`\`
MongoDB Atlas → Network Access → Add IP Address → Allow from Anywhere → Confirm
\`\`\`

---

### Solution 3: VPN/Firewall/Antivirus বন্ধ করুন

যদি আপনি ব্যবহার করেন:
- ❌ VPN connection বন্ধ করুন
- ❌ Firewall temporarily disable করুন
- ❌ Antivirus temporarily disable করুন
- ✅ তারপর test করুন

---

### Solution 4: Alternative Network

- 📱 **Mobile Hotspot** use করে try করুন
- 🏠 অন্য WiFi network try করুন
- 🌐 যদি কাজ করে, তাহলে আপনার network এ restriction আছে

---

### Solution 5: Old File দিয়ে Test করুন

Old file যদি কাজ করে, তাহলে new structure সঠিক আছে:

\`\`\`bash
# Old file test করুন
node index.js.old

# যদি এটা কাজ করে, তাহলে:
node src/server.js

# উভয়েই একই error দিলে, এটা network issue
\`\`\`

---

### Solution 6: MongoDB Cluster Status Check

1. MongoDB Atlas Dashboard এ যান
2. আপনার cluster এর status check করুন
3. যদি **"Paused"** দেখায়, তাহলে **"Resume"** click করুন
4. Cluster running হওয়ার জন্য অপেক্ষা করুন

---

### Solution 7: Credentials Re-check

`.env` file check করুন:

\`\`\`env
DB_USER=mediHub-fullstack
DB_PASS=vSKoEWtswMe1tsx4
\`\`\`

MongoDB Atlas এ verify করুন:
1. **Database Access** section এ যান
2. User **"mediHub-fullstack"** exist করে কিনা check করুন
3. Password সঠিক কিনা verify করুন (Edit → Change Password)

---

## 🧪 Testing Commands

Test করার জন্য নিচের commands run করুন:

\`\`\`bash
# 1. Check internet connectivity
node check-internet.js

# 2. Test MongoDB connection
node test-connection.js

# 3. If both work, start server
npm run dev
# or
node src/server.js
\`\`\`

---

## ✅ যদি কাজ করে

Server successfully start হলে আপনি দেখবেন:

\`\`\`
🔄 Attempting to connect to MongoDB...
📍 Database: mediHub-store
✅ Successfully connected to MongoDB!
ℹ️  [INFO] MediHub application is running on port 5000
\`\`\`

তারপর test করুন:
\`\`\`bash
curl http://localhost:5000/
curl http://localhost:5000/api/health
\`\`\`

---

## 🆘 এখনো কাজ না করলে

### Option 1: Local MongoDB Use করুন (Temporary)

\`\`\`bash
# Install MongoDB locally
# Download from: https://www.mongodb.com/try/download/community

# Start local MongoDB
mongod

# Update .env
MONGODB_URI=mongodb://localhost:27017/mediHub-store
\`\`\`

### Option 2: MongoDB Compass দিয়ে Test

1. Download MongoDB Compass: https://www.mongodb.com/try/download/compass
2. Connection string paste করুন:
   \`\`\`
   mongodb+srv://mediHub-fullstack:vSKoEWtswMe1tsx4@cluster0.w0iow.mongodb.net/
   \`\`\`
3. Connect button click করুন
4. যদি connect করে, তাহলে Node.js environment issue
5. যদি না করে, তাহলে network/MongoDB Atlas issue

### Option 3: Screenshots Share করুন

নিচের screenshots নিন এবং share করুন:
1. MongoDB Atlas → Network Access page
2. MongoDB Atlas → Database Access page
3. MongoDB Atlas → Cluster page
4. Terminal error message
5. `.env` file (password hide করে)

---

## 📊 Checklist

নিচের সবগুলো check করুন:

- [ ] Internet connection কাজ করছে
- [ ] DNS resolution কাজ করছে (`ipconfig /flushdns` করেছেন)
- [ ] MongoDB Atlas cluster running আছে
- [ ] Network Access এ IP whitelisted আছে (0.0.0.0/0 বা আপনার IP)
- [ ] Database Access এ user credentials সঠিক
- [ ] `.env` file এ সঠিক values আছে
- [ ] VPN/Firewall/Antivirus বন্ধ করে try করেছেন
- [ ] Computer restart করেছেন
- [ ] Alternative network (mobile hotspot) try করেছেন

---

## 🎯 সবচেয়ে সম্ভাব্য কারণ:

1. **MongoDB Atlas IP Whitelist** (80% cases)
2. **DNS/Internet Connection Issue** (15% cases)
3. **VPN/Firewall Blocking** (3% cases)
4. **MongoDB Cluster Paused** (2% cases)

---

## 💬 এখনো help লাগলে:

যেসব information share করবেন:
1. `node check-internet.js` এর output
2. `node test-connection.js` এর output
3. MongoDB Atlas Network Access screenshot
4. আপনার current IP: https://whatismyipaddress.com/

---

**Remember**: IP Whitelist change করার পর 2-3 মিনিট অপেক্ষা করতে হবে! 🕒
