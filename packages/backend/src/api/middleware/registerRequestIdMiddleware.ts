import { RequestHandler } from 'express';
import { v4 as uuid } from 'uuid';

import { LOCAL_REQUEST_ID_KEY } from '../constants';

export const registerRequestIdMiddleware = (): RequestHandler => (
  _req,
  res,
  next,
) => {
  res.locals[LOCAL_REQUEST_ID_KEY] = uuid();
  next();
};
