import { Router } from 'express';
import { createUser,  LoginUser, getCurrentUser, deleteUser } from '../controllers/userController.js';
//import { login } from '../controllers/loginController.js';
import { ValidateToken } from '../middlewares/validateToken.js';

const router = Router();

router.post('/create-account',  createUser);
router.post('/login',  LoginUser);
router.get('/current-user', ValidateToken, getCurrentUser);

//delete a user
router.delete('/delete/:id', ValidateToken, deleteUser)


export default router;
