import express from 'express';
import { signin, signout, signup } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signin', signin); // POST /auth/signin
router.get('/signout', signout); // GET /auth/signout
router.post('/signup', signup); // POST /auth/signup (optional)

export default router; // Make sure this is the default export