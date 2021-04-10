import { Request, Response, Router } from 'express';

import * as DateUtils from '../../utils/dateUtils';
import { Logger } from '../../utils/Logger';
import { getServiceLocator } from '../utils';

import { authenticateUser } from './controllers/auth';

export function heartbeat(_req: Request, res: Response) {
  const serviceLocator = getServiceLocator(res);
  const logger = serviceLocator.get(Logger);

  const now = DateUtils.now();
  const timestamp = new Date(now).toISOString();

  logger.info('[api] #heartbeat', { timestamp });

  res.status(200).json({
    title: 'Card game API',
    status: 'UP',
    timestamp,
  });
}

export function getRoutes() {
  const router = Router();

  router.all('/', heartbeat);

  router.post('/auth/authenticate', authenticateUser);

  return router;
}
