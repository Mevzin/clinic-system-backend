import { UserController } from '../Controllers/userController';
import { Router } from 'express'

const userRoutes = Router();

const userController = new UserController()

userRoutes.post('/user/login', userController.login)
userRoutes.post('/user/register', userController.register)

export { userRoutes }