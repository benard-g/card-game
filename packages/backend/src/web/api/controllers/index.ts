import { Router } from 'express';

import { ServiceProvider } from '../../../services/ServiceProvider';
import { Models } from '../../../models';

import { heartbeat } from './heartbeat.controller';

export function loadRoutes(
  _services: ServiceProvider,
  _models: Models,
): Router {
  const router = Router();

  router.get('/', heartbeat);

  return router;
}
