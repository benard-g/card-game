import { CookieSetter } from '../../../utils/CookieSetter';
import { Jwt } from '../../../utils/Jwt';
import { ServiceLocator } from '../../../utils/ServiceLocator';
import { COOKIE_API_TOKEN } from '../../constants';
import { TokenPayload } from '../../types/TokenPayload';
import { Context } from '../Context';

export async function updateLobbyInContext(
  serviceLocator: ServiceLocator,
  context: Context,
  lobbyId: number | undefined,
): Promise<void> {
  const jwt = serviceLocator.get(Jwt);
  const cookieSetter = serviceLocator.get(CookieSetter);

  const { res, user } = context;

  user.lobbyId = lobbyId;
  const token = await jwt.createToken<TokenPayload>({
    user: {
      ...user,
      lobbyId,
    },
  });
  cookieSetter.setCookie(res, COOKIE_API_TOKEN, token);
}
