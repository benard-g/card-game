import { Request, Response } from 'express';

import { UserCore } from '../../../core/lib/user';
import { CookieSetter } from '../../../utils/CookieSetter';
import { Jwt } from '../../../utils/Jwt';
import { Logger } from '../../../utils/Logger';
import { COOKIE_API_TOKEN } from '../../constants';
import { TokenPayload } from '../../types/TokenPayload';
import { getServiceLocator } from '../../utils';

export class AuthenticationController {
  public authenticateUser = async (req: Request, res: Response) => {
    const serviceLocator = getServiceLocator(res);
    const logger = serviceLocator.get(Logger);
    const jwt = serviceLocator.get(Jwt);
    const cookieSetter = serviceLocator.get(CookieSetter);

    logger.info('[api][AuthenticationController] #authenticateUser');

    try {
      const token = req.cookies[COOKIE_API_TOKEN] as string | undefined;
      if (token) {
        const payload = await jwt.decodeToken<TokenPayload>(token);
        logger.info(
          '[api][AuthenticationController] #authenticateUser: User already authenticated',
          { uid: payload.user.id },
        );
        res.status(200).send('User already authenticated');
        return;
      }
    } catch (err) {
      logger.info(
        '[api][AuthenticationController] #authenticateUser: Invalid existing token, generating a new one...',
      );
    }

    const userCore = serviceLocator.get(UserCore);
    const user = await userCore.createUser();

    const newToken = await jwt.createToken<TokenPayload>({
      user,
    });
    cookieSetter.setCookie(res, COOKIE_API_TOKEN, newToken);

    logger.info(
      '[api][AuthenticationController] #authenticateUser: New authentication',
      { uid: user.id },
    );
    res.status(200).send('User authenticated');
  };
}
