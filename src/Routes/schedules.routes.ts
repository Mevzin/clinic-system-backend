import { authMiddleware } from '../middleware/authMiddleware';
import { ScheduleController } from '../Controllers/scheduleController';
import { Router } from 'express'

const scheduleRoutes = Router();

const scheduleController = new ScheduleController()

scheduleRoutes.post('/create', authMiddleware, scheduleController.create)
scheduleRoutes.get('/getSchedulesByDoctorId/:doctorId', authMiddleware, scheduleController.getSchedulesByDoctor)

export { scheduleRoutes }