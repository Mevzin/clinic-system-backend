import { Router } from 'express';
import { userRoutes } from './user.routes';
import { patientRoutes } from './patient.routes';
import { scheduleRoutes } from './schedules.routes';

const routes = Router();

routes.use('/user', userRoutes);
routes.use('/patient', patientRoutes);
routes.use('/schedule', scheduleRoutes);

export { routes }