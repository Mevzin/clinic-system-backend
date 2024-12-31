import { authMiddleware } from '../middleware/authMiddleware';
import { ScheduleController } from '../Controllers/scheduleController';
import { Router } from 'express'

const scheduleRoutes = Router();

const scheduleController = new ScheduleController()

scheduleRoutes.post('/create', authMiddleware, scheduleController.create)

export { scheduleRoutes }