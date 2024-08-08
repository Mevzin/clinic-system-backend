import { UserController } from '../Controllers/userController';
import { Router } from 'express'

const userRoutes = Router();

const userController = new UserController()

userRoutes.post('/login', userController.login)
userRoutes.post('/register', userController.register)

export { userRoutes }