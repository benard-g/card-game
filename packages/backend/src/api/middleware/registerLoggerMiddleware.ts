import { RequestHandler } from 'express';

import { Logger } from '../../utils/Logger';
import { getRequestId, getServiceLocator } from '../utils';

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
