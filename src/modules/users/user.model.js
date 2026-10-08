// User model schema/structure
// This file can be used for data validation or defining user structure

export const UserRoles = {
    CUSTOMER: 'Customer',
    SELLER: 'Seller',
    ADMIN: 'Admin'
};

export const userSchema = {
    email: String,
    name: String,
    image: String,
    role: String,
    timestamp: Number
};

export default { UserRoles, userSchema };
