import { Router } from 'express';

import { Core } from '../../../core';
import { Logger } from '../../../utils/Logger';

import * as AuthRouter from './auth';
import { heartbeat } from './heartbeat.controller';

export function loadRoutes(core: Core, logger: Logger): Router {
  const router = Router();

  router.get('/', heartbeat);

  router.use('/auth', AuthRouter.loadRoutes(core, logger));

  return router;
}
