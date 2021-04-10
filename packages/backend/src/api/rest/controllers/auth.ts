import { Request, Response } from 'express';
import AsyncHandler from 'express-async-handler';

import { UserCore } from '../../../core/lib/user';
import { CookieService } from '../../../services/CookieService';
import { JwtService } from '../../../services/JwtService';
import { Logger } from '../../../utils/Logger';
import { COOKIE_API_TOKEN } from '../../constants';
import { TokenPayload } from '../../types/TokenPayload';
import { getServiceLocator } from '../../utils';

export const authenticateUser = AsyncHandler(
  async (req: Request, res: Response) => {
    const serviceLocator = getServiceLocator(res);
    const logger = serviceLocator.get(Logger);
    const jwtService = serviceLocator.get(JwtService);
    const cookieService = serviceLocator.get(CookieService);

    logger.info('[api][auth] #authenticateUser');

    try {
      const token = req.cookies[COOKIE_API_TOKEN] as string | undefined;
      if (token) {
        const payload = await jwtService.decodeToken<TokenPayload>(token);
        logger.info(
          '[api][auth] #authenticateUser: User already authenticated',
          { uid: payload.user.id },
        );
        res.status(200).send('User already authenticated');
        return;
      }
    } catch (err) {
      logger.info(
        '[api][auth] #authenticateUser: Invalid existing token, generating a new one...',
        { err },
      );
    }

    const userCore = serviceLocator.get(UserCore);
    const user = await userCore.createUser();

    const newToken = await jwtService.createToken<TokenPayload>({
      user,
    });
    cookieService.setCookieInResponse(res, COOKIE_API_TOKEN, newToken);

    logger.info('[api][auth] #authenticateUser: New authentication', {
      uid: user.id,
    });
    res.status(200).send('User authenticated');
  },
);
