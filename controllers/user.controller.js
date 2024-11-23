import User from '../models/user.model.js';

// Middleware to fetch a user by ID
export const userByID = async (req, res, next, id) => {
    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ error: "User not found" });
        req.profile = user; // Attach user to req.profile
        next();
    } catch (error) {
        return res.status(400).json({ error: "Could not retrieve user" });
    }
};

// Create user
export const createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// List users
export const listUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update user by ID
export const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            req.body,
            { new: true, runValidators: true } // Returns updated document
        );
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a user by ID
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId);
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json({ message: 'User deleted successfully', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get user by ID
export const getUserById = async (req, res) => {
    try {
        const user = req.profile;
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};