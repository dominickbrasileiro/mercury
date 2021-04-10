import { Router } from 'express';
import { RefreshAccessTokenController } from '../app/accounts/use-cases/refresh-access-token/refresh-access-token-controller';
import { RefreshAccessTokenValidation } from '../app/accounts/use-cases/refresh-access-token/refresh-access-token-validation';

const authRoutes = Router();

const refreshAccessTokenController = new RefreshAccessTokenController();
const refreshAccessTokenValidation = new RefreshAccessTokenValidation();

authRoutes.post(
  '/refresh',
  refreshAccessTokenValidation.validate,
  refreshAccessTokenController.handle,
);

export { authRoutes };
