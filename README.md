# Project Name: MediHub Store
MediHub Medical Store is a MERN stack multi-vendor e-commerce platform for seamless online medicine and healthcare product sales. It features role-based dashboards, secure Stripe payments, JWT authentication, and a responsive, high-performance user experience with real-time updates, pagination, and SEO optimization.
## [Client side: ](https://github.com/ahasan2912/mediHub-client-side)
# Role Base
MediHub store supports three roles: **Customer**,**Seller**, and **Admin**.
- **Admin Email:** admin@gmail.com
- **Admin Password:** @Habib123@
- **Seller Email:** seller@gmail.com
- **Seller Password:** @Habib123@

## Admin
- **Admin Home:** Access the Admin Home from the Admin Dashboard.
- **Manage Medicine:** Update, delete, and view medicine details.
- **Manage Users:** Promote users to Admin or Seller and Remove users if needed..
- **Payment Integration:** View Stripe payment history all the Orders.
- **Manage Banner:** Add or delete banners from the platform.
    
## Seller
- **Seller Home:** Access the Seller Home from the Seller Dashboard.
- **Add Medicine:** Add new medicines to the platform..
- **Manage Medicine:** Update, delete, and view medicine details.
- **Manage Orders:** View the list of orders for their medicines and Cancel orders if needed.
- **Payment Integration:** View Stripe payment history for the seller specific medicine.

## Customer
- **Order List:** View the list of orders from the Dashboard and Manage order (update, delete).
- **Payment History:** View a list of all payments made for orders.

# Authentication
- **Firebase Authentication:** Used for user registration, login, and logout. Firebase provides a secure and easy-to-use authentication system for managing user credentials.
- **JWT (JSON Web Token):** Implemented for role-based access control. After a user logs in, a JWT token is generated and stored, ensuring that the user is authenticated for accessing protected routes and resources on the platform.

# Key and Features 
- Multi-role Access: Separate dashboards for Admin, Seller, and Customer.
- Authentication & Authorization: Secure login system using Firebase and JWT.
- Product Management: Add, update, delete, and view medicine details (for Admins and Sellers).
- Order Management: Track, update, or cancel orders based on user role.
- Payment Integration: Secure online payments using Stripe.
- Responsive UI: Mobile-friendly design using Tailwind CSS and DaisyUI.
- Search, Filter & Sort: Efficient navigation through products.
- SEO Optimization: Implemented with React Helmet.
- Notification System: Toast messages with React Toastify and alerts using SweetAlert.
- Image Preview: Product image view using React Lightbox.
- Dashboard Analytics: Role-based dashboards with organized access and data.
- Manage Users: Admin can promote users to Admin or Seller roles, and remove users when necessary.


# Technologies
- JavaScript (ES6), JSX
- React, React Router
- Node.js, MongoDB (Backend)
- Firebase Authentication
- JSON Web Token (JWT) (Authentication)
- Stripe (Payment Integration)
- MongoDB
- CSS/Tailwind, DaisyUI
- Git & GitHub, Firebase and Vercel (Deployment)

### Deploying with Firebase
## [Live-site: ](https://medihub-fullstack.web.app/)
