import { Router } from 'express';
import AsyncHandler from 'express-async-handler';

import { AuthenticationController } from './controller';

export function registerRoutes(): Router {
  const router = Router();

  // Register scope routes
  const authenticationController = new AuthenticationController();
  router.post(
    '/authenticate',
    AsyncHandler(authenticationController.authenticateUser),
  );

  return router;
}
