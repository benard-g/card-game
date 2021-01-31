import { ErrorCode } from '@packages/lib-shared';
import { ApolloError } from 'apollo-server-express';
import { Ctx, Mutation, Resolver } from 'type-graphql';

import { LobbyCore, UserAlreadyInLobbyError } from '../../../core/LobbyCore';
import { CookieSetter } from '../../../utils/CookieSetter';
import { Jwt } from '../../../utils/Jwt';
import { Logger } from '../../../utils/Logger';
import { Service } from '../../../utils/ServiceLocator';
import { COOKIE_API_TOKEN } from '../../constants';
import { TokenPayload } from '../../types/TokenPayload';
import { Context } from '../Context';
import { Viewer } from '../entities/Viewer';

@Service()
@Resolver()
export class LobbyResolver {
  constructor(
    private readonly cookieSetter: CookieSetter,
    private readonly jwt: Jwt,
    private readonly logger: Logger,
    private readonly lobbyCore: LobbyCore,
  ) {}

  @Mutation(() => Viewer)
  async createLobby(@Ctx() context: Context): Promise<Viewer> {
    const { res, user } = context;

    this.logger.info('[graphql][LobbyResolver] #createLobby');

    try {
      const nbDeleted = await this.lobbyCore.deleteOldLobbies();
      this.logger.info(
        '[graphql][LobbyResolver] #createLobby: Clean old lobbies',
        { nbDeleted },
      );

      const { lobby } = await this.lobbyCore.createLobby(user);
      this.logger.info('[graphql][LobbyResolver] #createLobby: Lobby created', {
        lobby: { id: lobby.id, code: lobby.code },
      });

      const token = await this.jwt.createToken<TokenPayload>({
        user: {
          ...user,
          lobbyId: lobby.id,
        },
      });
      this.cookieSetter.setCookie(res, COOKIE_API_TOKEN, token);
      context.user.lobbyId = lobby.id;

      return { id: user.id };
    } catch (err) {
      if (err instanceof UserAlreadyInLobbyError) {
        const { id, code } = err.lobby;
        this.logger.info(
          '[graphql][LobbyResolver] User is already part of a lobby',
          { lobby: { id, code } },
        );
        throw new ApolloError(
          'Lobby creation failed',
          ErrorCode.USER_ALREADY_IN_LOBBY,
        );
      }
      throw err;
    }
  }

  @Mutation(() => Viewer)
  async leaveLobby(@Ctx() context: Context): Promise<Viewer> {
    const { res, user } = context;

    this.logger.info('[graphql][LobbyResolver] #leaveLobby');

    const { leftLobbyCode } = await this.lobbyCore.leaveLobby(user);
    this.logger.info('[graphql][LobbyResolver] #leaveLobby: Lobby left', {
      lobby: { code: leftLobbyCode || null },
    });

    const token = await this.jwt.createToken<TokenPayload>({
      user: { ...user, lobbyId: undefined },
    });
    this.cookieSetter.setCookie(res, COOKIE_API_TOKEN, token);
    context.user.lobbyId = undefined;

    return { id: user.id };
  }
}
