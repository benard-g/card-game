import { ApolloError } from 'apollo-server-express';
import { Ctx, Field, Mutation, ObjectType, Resolver } from 'type-graphql';

import { LobbyCore, UserAlreadyInLobbyError } from '../../../core/LobbyCore';
import { Jwt } from '../../../utils/Jwt';
import { Logger } from '../../../utils/Logger';
import { Service } from '../../../utils/ServiceLocator';
import { COOKIE_API_TOKEN } from '../../constants';
import { TokenPayload } from '../../types/TokenPayload';
import { setCookie } from '../../utils';
import { Context } from '../Context';
import { Lobby } from '../entities/Lobby';
import { ErrorCode } from '../ErrorCode';

@ObjectType()
class LeaveLobbyResponse {
  @Field({ nullable: true })
  code?: string;
}

@Service()
@Resolver()
export class LobbyResolver {
  constructor(
    private readonly jwt: Jwt,
    private readonly logger: Logger,
    private readonly lobbyCore: LobbyCore,
  ) {}

  @Mutation(() => Lobby)
  async createLobby(@Ctx() context: Context): Promise<Lobby> {
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
      setCookie(res, COOKIE_API_TOKEN, token);

      return lobby;
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

  @Mutation(() => LeaveLobbyResponse)
  async leaveLobby(@Ctx() context: Context): Promise<LeaveLobbyResponse> {
    const { res, user } = context;

    this.logger.info('[graphql][LobbyResolver] #leaveLobby');

    const { leftLobbyCode } = await this.lobbyCore.leaveLobby(user);
    this.logger.info('[graphql][LobbyResolver] #leaveLobby: Lobby left', {
      lobby: { code: leftLobbyCode || null },
    });

    const token = await this.jwt.createToken<TokenPayload>({
      user: { ...user, lobbyId: undefined },
    });
    setCookie(res, COOKIE_API_TOKEN, token);

    return { code: leftLobbyCode };
  }
}
