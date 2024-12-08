import User from '../models/User.mjs';

export const createUser = async (name, email, password) => {
    const user = new User({ name, email, password });
    await user.save();
    return user;
};