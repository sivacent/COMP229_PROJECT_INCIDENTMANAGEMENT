import express from 'express';
import { createUser, listUsers, getUserById, updateUser, deleteUser } from '../controllers/user.controller.js';

const router = express.Router();

router.route('/')
  .get(listUsers)       // Get all users
  .post(createUser);     // Create a new user

router.route('/:userId')
  .get(getUserById)      // Get user by ID
  .put(updateUser)       // Update user by ID
  .delete(deleteUser);   // Delete user by ID

export default router;