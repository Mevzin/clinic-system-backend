import { authMiddleware } from '../middleware/authMiddleware';
import { UserController } from '../Controllers/userController';
import { Router } from 'express'

const userRoutes = Router();

const userController = new UserController()

userRoutes.post('/login', userController.login)
userRoutes.post('/register', userController.register)
userRoutes.patch('/updateUser/:userId', authMiddleware, userController.updateUser)

export { userRoutes }