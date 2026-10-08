# MediHub Server - ES6 Modules Architecture

Modern, scalable backend API for MediHub medical e-commerce platform, built with Express.js and MongoDB.

## 🏗️ Project Architecture

```
src/
├── config/              # Configuration files
│   ├── db.js           # MongoDB connection
│   ├── env.js          # Environment variables
│   └── logger.js       # Logging utility
│
├── modules/            # Feature modules
│   ├── users/
│   │   ├── user.controller.js
│   │   ├── user.service.js
│   │   ├── user.repository.js
│   │   ├── user.routes.js
│   │   ├── user.validation.js
│   │   └── user.model.js
│   │
│   ├── products/       # Product management
│   ├── orders/         # Order processing
│   ├── payments/       # Stripe payment integration
│   └── banners/        # Banner management
│
├── middlewares/        # Global middlewares
│   ├── auth.middleware.js      # JWT authentication
│   ├── error.middleware.js     # Error handling
│   ├── notFound.middleware.js  # 404 handler
│   └── rateLimit.middleware.js # Rate limiting
│
├── auth/               # Authentication module
│   ├── auth.controller.js
│   ├── auth.service.js
│   ├── auth.routes.js
│   └── auth.validation.js
│
├── utils/              # Utility functions
│   ├── ApiError.js
│   ├── ApiResponse.js
│   ├── asyncHandler.js
│   └── pagination.js
│
├── routes/             # Route aggregator
│   └── index.js
│
├── app.js              # Express app configuration
└── server.js           # Entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd madiHub-server-side
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory:
```env
PORT=5000
NODE_ENV=development

# Database
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password

# JWT
ACCESS_TOKEN_SECRET=your_jwt_secret_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### Running the Application

**Development mode** (with nodemon):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

The server will start on `http://localhost:5000`

## 📡 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Health Check
```
GET /api/health
```

### Authentication
- `POST /api/auth/jwt` - Generate JWT token

### Users
- `POST /api/users` - Create user
- `GET /api/users/role/:email` - Get user role
- `GET /api/users/data/:email` - Get user data
- `GET /api/users/:email` - Get all users except given email (Admin)
- `PATCH /api/users/role/:id` - Update user role (Admin)
- `PATCH /api/users/profile/:email` - Update user profile
- `DELETE /api/users/:id` - Delete user (Admin)

### Products
- `GET /api/products` - Get all products (with search & sort)
- `GET /api/products/:id` - Get single product
- `GET /api/products/categories` - Get products by category
- `POST /api/products/seller` - Create product (Seller)
- `GET /api/products/seller/:email` - Get seller products
- `PATCH /api/products/seller/:id` - Update product (Seller)
- `DELETE /api/products/seller/:id` - Delete product (Seller)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get customer orders
- `GET /api/orders/:id` - Get order by ID
- `PATCH /api/orders/:id` - Update order
- `DELETE /api/orders/:id` - Delete order
- `GET /api/orders/seller/:email` - Get seller orders
- `GET /api/orders/chart/admin` - Get admin chart data
- `GET /api/orders/chart/seller/:email` - Get seller chart data

### Payments
- `POST /api/payments/create-payment-intent` - Create Stripe payment intent
- `POST /api/payments` - Save payment
- `GET /api/payments/:email` - Get payment history
- `GET /api/payments/total/all` - Get all payments (Admin)

### Banners
- `GET /api/banners` - Get all banners
- `POST /api/banners` - Create banner (Admin)
- `DELETE /api/banners/:id` - Delete banner (Admin)

## 🔐 Authentication & Authorization

The API uses JWT for authentication with three role levels:
- **Customer**: Basic user access
- **Seller**: Product management
- **Admin**: Full system access

### Using Protected Endpoints

Include the JWT token in the Authorization header:
```
Authorization: Bearer <your_token>
```

## 🛠️ Technology Stack

- **Runtime**: Node.js with ES6 Modules
- **Framework**: Express.js
- **Database**: MongoDB with Native Driver
- **Authentication**: JSON Web Tokens (JWT)
- **Payment**: Stripe API
- **Architecture**: Modular MVC pattern

## 📦 Key Features

✅ **ES6 Module System** - Modern JavaScript with import/export syntax
✅ **Modular Architecture** - Clean separation of concerns
✅ **Repository Pattern** - Database abstraction layer
✅ **Error Handling** - Centralized error management
✅ **Authentication** - JWT-based auth with role-based access
✅ **Payment Integration** - Stripe payment processing
✅ **Data Validation** - Request validation middleware
✅ **CORS Enabled** - Cross-origin resource sharing
✅ **Production Ready** - Error logging and graceful shutdown

## 🔧 Development Guidelines

### Adding a New Module

1. Create module folder in `src/modules/`
2. Implement the following files:
   - `*.controller.js` - Request handlers
   - `*.service.js` - Business logic
   - `*.repository.js` - Database operations
   - `*.routes.js` - Route definitions
   - `*.validation.js` - Input validation
   - `*.model.js` (optional) - Data models/schemas

3. Register routes in `src/routes/index.js`

### Code Structure Principles

- **Controllers**: Handle HTTP requests/responses
- **Services**: Contain business logic
- **Repositories**: Manage database operations
- **Middlewares**: Process requests before controllers
- **Utils**: Reusable helper functions

## 🚢 Deployment

### Vercel Deployment

The project is configured for Vercel deployment:

```bash
vercel deploy
```

Configuration is in `vercel.json`

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | No (default: 5000) |
| `NODE_ENV` | Environment mode | No (default: development) |
| `DB_USER` | MongoDB username | Yes |
| `DB_PASS` | MongoDB password | Yes |
| `ACCESS_TOKEN_SECRET` | JWT secret key | Yes |
| `STRIPE_SECRET_KEY` | Stripe API key | Yes |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

ISC

## 👨‍💻 Migration Notes

This project has been migrated from CommonJS to ES6 Modules with a complete architectural restructure:
- ✅ Converted from `require()` to `import/export`
- ✅ Organized into modular feature-based structure
- ✅ Separated concerns (controller, service, repository)
- ✅ Added standardized error handling
- ✅ Implemented validation layer
- ✅ Enhanced code maintainability

---

**Built with ❤️ for MediHub**
