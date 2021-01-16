import { ErrorRequestHandler } from 'express';

import { Logger } from '../../utils/Logger';
import { getServiceLocator } from '../utils';

export const register500Handler = (): ErrorRequestHandler => (
  err,
  _req,
  res,
  next,
) => {
  const serviceLocator = getServiceLocator(res);
  const logger = serviceLocator.get(Logger);

  logger.error('[api] Unexpected error', { err });

  res.status(500).send('Internal Server Error');

  next();
};
