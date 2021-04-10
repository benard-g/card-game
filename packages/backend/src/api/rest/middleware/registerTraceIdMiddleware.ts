import { RequestHandler } from 'express';

import { LOCAL_TRACE_ID_KEY } from '../../constants';
import { getServiceLocator } from '../../utils';
import { createTraceId } from '../../utils/createTraceId';
import { registerScopedLogger } from '../../utils/registerScopedLogger';

export const registerTraceIdMiddleware = (): RequestHandler => (
  _req,
  res,
  next,
) => {
  const traceId = createTraceId();

  // Add traceId to request context
  res.locals[LOCAL_TRACE_ID_KEY] = traceId;
  // Add traceId to Logger context
  const serviceLocator = getServiceLocator(res);
  registerScopedLogger(serviceLocator, { traceId });

  next();
};
