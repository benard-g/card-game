import AsyncHandler from 'express-async-handler';

import { Jwt } from '../../utils/Jwt';
import { Logger } from '../../utils/Logger';
import { COOKIE_API_TOKEN, LOCAL_REQUESTING_USER_KEY } from '../constants';
import { TokenPayload } from '../types/TokenPayload';
import { getServiceLocator } from '../utils';

export const registerAuthGuardMiddleware = () =>
  AsyncHandler(async (req, res, next) => {
    const serviceLocator = getServiceLocator(res);
    const logger = serviceLocator.get(Logger);
    const jwt = serviceLocator.get(Jwt);

    const apiToken = req.cookies[COOKIE_API_TOKEN];
    if (!apiToken) {
      logger.info('[api] Authentication error: Missing token');
      res.status(401).send('Authentication required');
      return;
    }

    try {
      const { user } = await jwt.decodeToken<TokenPayload>(apiToken);

      // Add user info to request context
      res.locals[LOCAL_REQUESTING_USER_KEY] = user;

      // Add user info to Logger context
      const scopedLogger = logger.child({ uid: user.id });
      serviceLocator.set(Logger, scopedLogger);

      next();
    } catch (err) {
      logger.info('[api] Authentication error: Invalid token', { err });
      res.status(401).send('Authentication required');
    }
  });
