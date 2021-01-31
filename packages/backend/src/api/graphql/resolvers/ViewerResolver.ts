import { Ctx, FieldResolver, Query, Resolver } from 'type-graphql';

import { LobbyRepository } from '../../../model/repositories/LobbyRepository';
import { Logger } from '../../../utils/Logger';
import { Service } from '../../../utils/ServiceLocator';
import { Context } from '../Context';
import { Lobby } from '../entities/Lobby';
import { Viewer } from '../entities/Viewer';

@Service()
@Resolver(() => Viewer)
export class ViewerResolver {
  constructor(
    private readonly logger: Logger,
    private readonly lobbyRepository: LobbyRepository,
  ) {}

  @Query(() => Viewer)
  async viewer(@Ctx() context: Context): Promise<Viewer> {
    const { user } = context;

    this.logger.info('[graphql][ViewerResolver] #viewer');

    return {
      id: user.id,
    };
  }

  @FieldResolver(() => Lobby)
  async lobby(@Ctx() context: Context): Promise<Lobby | undefined> {
    const {
      user: { lobbyId },
    } = context;

    this.logger.info('[graphql][ViewerResolver] #lobby');

    if (!lobbyId) {
      this.logger.info('[graphql][ViewerResolver] #lobby: No lobby in token');
      return undefined;
    }

    const lobby = await this.lobbyRepository.getLobbyById(lobbyId);
    if (!lobby) {
      this.logger.info('[graphql][ViewerResolver] #lobby: No lobby in DB');
      return undefined;
    }

    return {
      ...lobby,
      id: lobby.code,
    };
  }
}
