import { RequestHandler } from 'express';

import { ServiceLocator } from '../../../utils/ServiceLocator';
import { LOCAL_SERVICE_LOCATOR_KEY } from '../../constants';
import { createScopedServiceLocator } from '../../utils/createScopedServiceLocator';

export const registerServiceLocatorMiddleware = (
  initialServiceLocator: ServiceLocator,
): RequestHandler => (_req, res, next) => {
  res.locals[LOCAL_SERVICE_LOCATOR_KEY] = createScopedServiceLocator(
    initialServiceLocator,
  );

  next();
};
