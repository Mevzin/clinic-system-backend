import { UserController } from '../Controllers/userController';
import { Router } from 'express'

const userRoutes = Router();

const userController = new UserController()

userRoutes.get('/user/login', userController.login)
userRoutes.get('/user/register', userController.register)

export { userRoutes }