import { RequestHandler } from 'express';

import { getServiceLocator } from '../api/utils';
import { Logger } from '../utils/Logger';

export const register404Handler = (): RequestHandler => (req, res, next) => {
  const serviceLocator = getServiceLocator(res);
  const logger = serviceLocator.get(Logger);

  const { method, url } = req;

  logger.info('[api] Route or resource not found', { method, url });

  res.status(404).send('Route or Resource not found');

  next();
};
