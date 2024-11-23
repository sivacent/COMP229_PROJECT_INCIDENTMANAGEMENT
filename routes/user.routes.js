import express from 'express';
import { createUser, listUsers, getUserById, updateUser, deleteUser, userByID } from '../controllers/user.controller.js';
import { requireSignin, hasAuthorization } from '../controllers/auth.controller.js';

const router = express.Router();

// Define user routes
router.route('/')
    .get(listUsers)
    .post(createUser);

router.route('/:userId')
    .get(requireSignin, getUserById)
    .put(requireSignin, hasAuthorization, updateUser)
    .delete(requireSignin, hasAuthorization, deleteUser);

// Middleware to handle `userId` parameter
router.param('userId', userByID);

export default router; // Ensure this is the default export