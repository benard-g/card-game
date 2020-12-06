import { Router } from 'express';

import { ApiController } from './controller';

export function registerRoutes(): Router {
  const router = Router();

  // Register scope routes
  const apiController = new ApiController();
  router.all('/', apiController.endpoint);

  return router;
}
