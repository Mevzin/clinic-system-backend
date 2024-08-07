import { Router } from 'express';
import { userRoutes } from './user.routes';

const routes = Router();
routes.use('/api/v1', userRoutes);

export { routes }