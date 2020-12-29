import { RequestHandler } from 'express';

import { getRequestId, getServiceLocator } from '../api/utils';
import { Logger } from '../utils/Logger';

export const registerLoggerMiddleware = (): RequestHandler => (
  _req,
  res,
  next,
) => {
  const serviceLocator = getServiceLocator(res);
  const requestId = getRequestId(res);

  const initialLogger = serviceLocator.get(Logger);
  const scopedLogger = initialLogger.child({ requestId });
  serviceLocator.set(Logger, scopedLogger);

  next();
};
