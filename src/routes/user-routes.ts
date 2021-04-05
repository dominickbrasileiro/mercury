import { Router } from 'express';
import { AuthenticateUserController } from '../app/users/use-cases/authenticate-user/authenticate-user-controller';
import { AuthenticateUserValidation } from '../app/users/use-cases/authenticate-user/authenticate-user-validation';
import { CreateUserController } from '../app/users/use-cases/create-user/create-user-controller';
import { CreateUserValidation } from '../app/users/use-cases/create-user/create-user-validation';

const userRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const authenticateUserValidation = new AuthenticateUserValidation();
const createUserController = new CreateUserController();
const createUserValidation = new CreateUserValidation();

userRoutes.post(
  '/',
  createUserValidation.validate,
  createUserController.handle,
);
userRoutes.post(
  '/login',
  authenticateUserValidation.validate,
  authenticateUserController.handle,
);

export { userRoutes };
