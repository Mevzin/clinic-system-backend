import { Router } from 'express';
import { userRoutes } from './user.routes';
import { patientRoutes } from './patient.routes';

const routes = Router();

routes.use('/user', userRoutes);
routes.use('/patient', patientRoutes);

export { routes }