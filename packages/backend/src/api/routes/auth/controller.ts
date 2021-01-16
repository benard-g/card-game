import { Request, Response } from 'express';

import { UserCore } from '../../../core/UserCore';
import { Jwt } from '../../../utils/Jwt';
import { Logger } from '../../../utils/Logger';
import { COOKIE_API_TOKEN } from '../../constants';
import { TokenPayload } from '../../types/TokenPayload';
import { getServiceLocator } from '../../utils';

export class AuthenticationController {
  public authenticateUser = async (_req: Request, res: Response) => {
    const serviceLocator = getServiceLocator(res);
    const logger = serviceLocator.get(Logger);
    const jwt = serviceLocator.get(Jwt);

    logger.info('[api][AuthenticationController] #authenticateUser');

    const userCore = serviceLocator.get(UserCore);
    const user = await userCore.createUser();

    const token = await jwt.createToken<TokenPayload>({ user });

    res.status(200).cookie(COOKIE_API_TOKEN, token).send('User created');
  };
}
