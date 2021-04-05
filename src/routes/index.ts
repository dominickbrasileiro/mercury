import { Router } from 'express';
import { AppError } from '../errors/app-error';

const routes = Router();

routes.use('/', (_req, _res) => {
  throw new AppError('App Error Message', 400);
});

export { routes };
