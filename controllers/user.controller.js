import User from '../models/user.model.js';

// Create user
export const createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(400).json({ error: 'Error creating user' });
    }
};

// List users
export const listUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(400).json({ error: 'Error fetching users' });
    }
  
};

// Update user by ID
export const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            req.body,
            { new: true, runValidators: true }  // Returns the updated document
        );
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(400).json({ error: errorHandler.getErrorMessage(error) });
    }
};

// Delete a user by ID
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId);
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json({ message: 'User deleted successfully', user });
    } catch (error) {
        res.status(400).json({ error: errorHandler.getErrorMessage(error) });
    }
};

// List user by ID
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: errorHandler.getErrorMessage(error) });
    }
};