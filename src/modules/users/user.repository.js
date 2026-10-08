import { ObjectId } from 'mongodb';
import { getCollections } from '../../config/db.js';

// Database operations for users
export const findUserByEmail = async (email) => {
    const collections = getCollections();
    return await collections.users.findOne({ email });
};

export const findAllUsersExcept = async (email) => {
    const collections = getCollections();
    const query = { email: { $ne: email } };
    return await collections.users.find(query).toArray();
};

export const findAllUsers = async () => {
    const collections = getCollections();
    return await collections.users.find().toArray();
};

export const createUser = async (userData) => {
    const collections = getCollections();
    return await collections.users.insertOne({
        ...userData,
        timestamp: Date.now(),
        role: 'Customer'
    });
};

export const deleteUserById = async (id) => {
    const collections = getCollections();
    const query = { _id: new ObjectId(id) };
    return await collections.users.deleteOne(query);
};

export const updateUserRole = async (id, role) => {
    const collections = getCollections();
    const query = { _id: new ObjectId(id) };
    const updatedDoc = { $set: { role } };
    return await collections.users.updateOne(query, updatedDoc);
};

export const updateUserProfile = async (email, name, image) => {
    const collections = getCollections();
    const filter = { email };
    const updatedDoc = {
        $set: {
            name,
            image
        }
    };
    return await collections.users.updateOne(filter, updatedDoc);
};

export default {
    findUserByEmail,
    findAllUsersExcept,
    findAllUsers,
    createUser,
    deleteUserById,
    updateUserRole,
    updateUserProfile
};
