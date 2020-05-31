import { Router } from 'express';

import { Core } from '../../../../core';
import { Logger } from '../../../../utils/Logger';

import { register } from './register';

export function loadRoutes(core: Core, logger: Logger): Router {
  const router = Router();

  router.post('/local/register', register(core, logger));

  return router;
}
