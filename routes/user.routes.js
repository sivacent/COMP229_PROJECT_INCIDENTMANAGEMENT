import express from 'express';
import { createUser, listUsers, getUserById, updateUser, deleteUser } from '../controllers/user.controller.js';

// const router = express.Router();

// router.route('/')
//   .get(listUsers)       // Get all users
//   .post(createUser);     // Create a new user

// router.route('/:userId')
//   .get(getUserById)      // Get user by ID
//   .put(updateUser)       // Update user by ID
//   .delete(deleteUser);   // Delete user by ID


  import authCtrl from '../controllers/auth.controller.js'

  const router = express.Router()
  router.route('/api/users').post(userCtrl.create)
  router.route('/api/users').get(userCtrl.list)
  router.route('/api/users/:userId')
 .get(authCtrl.requireSignin, userCtrl.read)
 .put(authCtrl.requireSignin, authCtrl.hasAuthorization, 
 userCtrl.update)
 .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, 
 userCtrl.remove)
 router.param('userId', userCtrl.userByID)
  router.route('/api/users/:userId').get(userCtrl.read)
  router.route('/api/users/:userId').put(userCtrl.update)
  router.route('/api/users/:userId').delete(userCtrl.remove)
  
  export default router
 



  export default router;