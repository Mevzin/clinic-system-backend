import { Router } from 'express';
import { userRoutes } from './user.routes';
import { patientRoutes } from './patient.routes';

const routes = Router();

routes.use('/api/v1/user', userRoutes);
routes.use('/api/v1/patient', patientRoutes);

export { routes }