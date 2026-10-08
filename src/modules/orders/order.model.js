// Order model schema/structure

export const OrderStatus = {
    PENDING: 'Pending',
    PROCESSING: 'Processing',
    SHIPPED: 'Shipped',
    DELIVERED: 'Delivered',
    CANCELLED: 'Cancelled'
};

export const orderSchema = {
    productId: String,
    productName: String,
    price: Number,
    quantity: Number,
    address: String,
    phone: String,
    seller: String,
    customer: {
        name: String,
        email: String
    },
    status: String,
    timestamp: Number
};

export default { OrderStatus, orderSchema };
