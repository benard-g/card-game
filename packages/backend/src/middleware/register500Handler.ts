import { ErrorRequestHandler } from 'express';

import { getServiceLocator } from '../api/utils';
import { Logger } from '../utils/Logger';

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
