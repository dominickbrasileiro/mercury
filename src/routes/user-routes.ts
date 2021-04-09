import { Router } from 'express';
import { AuthenticateUserController } from '../app/accounts/use-cases/authenticate-user/authenticate-user-controller';
import { AuthenticateUserValidation } from '../app/accounts/use-cases/authenticate-user/authenticate-user-validation';
import { CreateUserController } from '../app/accounts/use-cases/create-user/create-user-controller';
import { CreateUserValidation } from '../app/accounts/use-cases/create-user/create-user-validation';

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
