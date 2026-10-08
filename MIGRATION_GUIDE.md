# Migration Guide - CommonJS to ES6 Modules

## Overview

This document explains the migration from the old CommonJS-based monolithic structure to the new ES6 Modules with a modular architecture.

## What Changed?

### 1. Module System
**Before (CommonJS):**
```javascript
const express = require('express');
const cors = require('cors');
module.exports = router;
```

**After (ES6 Modules):**
```javascript
import express from 'express';
import cors from 'cors';
export default router;
```

### 2. File Structure

**Before:**
```
.
├── index.js (3000+ lines)
├── package.json
└── .env
```

**After:**
```
src/
├── config/
├── modules/
│   ├── users/
│   ├── products/
│   ├── orders/
│   ├── payments/
│   └── banners/
├── middlewares/
├── auth/
├── utils/
├── routes/
├── app.js
└── server.js
```

## API Route Changes

All routes now have `/api` prefix:

| Old Route | New Route |
|-----------|-----------|
| `POST /jwt` | `POST /api/auth/jwt` |
| `GET /users` | `GET /api/users` |
| `GET /products` | `GET /api/products` |
| `GET /orders` | `GET /api/orders` |
| `POST /create-payment-intent` | `POST /api/payments/create-payment-intent` |
| `GET /banners` | `GET /api/banners` |

**⚠️ Important**: Update your frontend API calls to include the `/api` prefix.

## Breaking Changes

### 1. Entry Point Changed
- **Old**: `index.js`
- **New**: `src/server.js`

Update your deployment scripts and configurations.

### 2. Package.json Changes
Added `"type": "module"` to enable ES6 modules:
```json
{
  "type": "module",
  "main": "src/server.js"
}
```

### 3. Vercel Configuration
Updated `vercel.json` to point to the new entry file:
```json
{
  "builds": [
    {
      "src": "src/server.js",
      "use": "@vercel/node"
    }
  ]
}
```

## Features Added

### 1. Modular Architecture
Each feature (users, products, orders, etc.) now has its own module with:
- Controller (request handling)
- Service (business logic)
- Repository (database operations)
- Routes (endpoint definitions)
- Validation (input validation)
- Model (data structures)

### 2. Error Handling
Centralized error handling with custom `ApiError` class:
```javascript
throw new ApiError(404, 'Resource not found');
```

### 3. Utility Functions
- `asyncHandler`: Wraps async functions to catch errors
- `ApiResponse`: Standardized API responses
- `pagination`: Helper for paginated results

### 4. Middleware Organization
- Authentication middlewares (`verifyToken`, `verifyAdmin`, `verifySeller`)
- Global error handler
- 404 not found handler
- Rate limiting (placeholder)

## Migration Checklist for Frontend

- [ ] Update all API endpoints to include `/api` prefix
- [ ] Verify authentication token handling still works
- [ ] Test all CRUD operations
- [ ] Check error response format handling
- [ ] Update environment variables if needed
- [ ] Test file uploads (if any)
- [ ] Verify CORS settings work with your frontend

## Testing After Migration

### 1. Health Check
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "MediHub API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 2. Authentication
```bash
curl -X POST http://localhost:5000/api/auth/jwt \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

### 3. Products
```bash
curl http://localhost:5000/api/products
```

## Running the New Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## Rollback Plan

If you need to rollback to the old version:

1. Keep the old `index.js` file (currently in root)
2. Revert `package.json` changes:
   - Remove `"type": "module"`
   - Change `"main"` back to `"index.js"`
3. Revert `vercel.json` changes
4. Restart the server

## Benefits of New Architecture

### ✅ Maintainability
- Code is organized into logical modules
- Easy to locate and modify specific features
- Clear separation of concerns

### ✅ Scalability
- Easy to add new features
- Modular structure supports team collaboration
- Better code reusability

### ✅ Testability
- Individual modules can be tested in isolation
- Mock dependencies easily
- Better unit test coverage

### ✅ Modern JavaScript
- ES6 import/export syntax
- Async/await patterns
- Destructuring and modern features

### ✅ Error Handling
- Centralized error management
- Consistent error responses
- Better debugging

## Common Issues and Solutions

### Issue 1: "Cannot use import statement outside a module"
**Solution**: Ensure `"type": "module"` is in `package.json`

### Issue 2: "ERR_MODULE_NOT_FOUND"
**Solution**: Add `.js` extension to all imports:
```javascript
import router from './routes/index.js'; // ✅ Correct
import router from './routes/index';    // ❌ Wrong
```

### Issue 3: "__dirname is not defined"
**Solution**: In ES6 modules, use:
```javascript
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
```

### Issue 4: Database connection errors
**Solution**: Check your `.env` file has correct MongoDB credentials

## Support

For issues or questions about the migration:
1. Check this guide first
2. Review the README.md
3. Check the module-specific files
4. Contact the development team

## Next Steps

After successful migration:
1. ✅ Monitor application logs for errors
2. ✅ Test all endpoints thoroughly
3. ✅ Update API documentation
4. ✅ Inform frontend team about changes
5. ✅ Deploy to staging environment
6. ✅ Run integration tests
7. ✅ Deploy to production

---

**Migration completed successfully!** 🎉
