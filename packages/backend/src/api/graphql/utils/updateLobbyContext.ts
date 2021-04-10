import { CookieService } from '../../../services/CookieService';
import { JwtService } from '../../../services/JwtService';
import { ServiceLocator } from '../../../utils/ServiceLocator';
import { COOKIE_API_TOKEN } from '../../constants';
import { TokenPayload } from '../../types/TokenPayload';
import { Context } from '../Context';

export async function updateLobbyInContext(
  serviceLocator: ServiceLocator,
  context: Context,
  lobbyId: string | undefined,
): Promise<void> {
  const jwt = serviceLocator.get(JwtService);
  const cookieSetter = serviceLocator.get(CookieService);

  const { res, user } = context;
  user.lobbyId = lobbyId;
  const token = await jwt.createToken<TokenPayload>({
    user: {
      ...user,
      lobbyId,
    },
  });

  cookieSetter.setCookieInResponse(res, COOKIE_API_TOKEN, token);
}
