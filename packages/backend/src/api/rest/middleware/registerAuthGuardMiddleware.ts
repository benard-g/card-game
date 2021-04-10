import AsyncHandler from 'express-async-handler';

import { JwtService } from '../../../services/JwtService';
import { Logger } from '../../../utils/Logger';
import { COOKIE_API_TOKEN, LOCAL_REQUESTING_USER_KEY } from '../../constants';
import { TokenPayload } from '../../types/TokenPayload';
import { getServiceLocator } from '../../utils';
import { registerScopedLogger } from '../../utils/registerScopedLogger';

export const registerAuthGuardMiddleware = () =>
  AsyncHandler(async (req, res, next) => {
    const serviceLocator = getServiceLocator(res);
    const logger = serviceLocator.get(Logger);
    const jwtService = serviceLocator.get(JwtService);

    const apiToken = req.cookies[COOKIE_API_TOKEN];
    if (!apiToken) {
      logger.info('[api] Authentication error: Missing token');
      res.status(401).send('Authentication required');
      return;
    }

    try {
      const { user } = await jwtService.decodeToken<TokenPayload>(apiToken);

      // Add user info to request context
      res.locals[LOCAL_REQUESTING_USER_KEY] = user;
      // Add user info to Logger context
      registerScopedLogger(serviceLocator, { uid: user.id });

      next();
    } catch (err) {
      logger.info('[api] Authentication error: Invalid token', { err });
      res.status(401).send('Authentication required');
    }
  });
