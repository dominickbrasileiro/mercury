import { Router } from 'express';
import { CreateUserController } from '../app/users/use-cases/create-user/create-user-controller';
import { CreateUserValidation } from '../app/users/use-cases/create-user/create-user-validation';

const userRoutes = Router();

const createUserController = new CreateUserController();
const createUserValidation = new CreateUserValidation();

userRoutes.post(
  '/',
  createUserValidation.validate,
  createUserController.handle,
);

export { userRoutes };
