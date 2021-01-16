import { Router } from 'express';

import { registerRoutes as registerAuthRoutes } from './auth';
import { ApiController } from './controller';

export function registerRoutes(): Router {
  const router = Router();

  // Register scope routes
  const apiController = new ApiController();
  router.all('/', apiController.endpoint);

  router.use('/auth', registerAuthRoutes());

  return router;
}
