import { RequestHandler } from 'express';

import { LOCAL_SERVICE_LOCATOR_KEY } from '../constants/api';
import { ServiceLocator } from '../utils/ServiceLocator';

export const registerServiceLocatorMiddleware = (
  initialServiceLocator: ServiceLocator,
): RequestHandler => (_req, res, next) => {
  const scopedServiceLocator = initialServiceLocator.child();

  res.locals[LOCAL_SERVICE_LOCATOR_KEY] = scopedServiceLocator;

  next();
};
