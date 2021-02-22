import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';

import { Service, ServiceLocator } from '../../../../utils/ServiceLocator';
import { Context } from '../../Context';
import { LobbyType } from '../../entities/LobbyType';
import { ViewerType } from '../../entities/ViewerType';

import { createLobby, CreateLobbyInput } from './mutations/createLobby';
import { joinLobby, JoinLobbyInput } from './mutations/joinLobby';
import { leaveLobby } from './mutations/leaveLobby';

@Service()
@Resolver(() => LobbyType)
export class LobbyResolver {
  constructor(private readonly serviceLocator: ServiceLocator) {}

  @Mutation(() => ViewerType)
  public async createLobby(
    @Ctx() context: Context,
    @Arg('input') input: CreateLobbyInput,
  ): Promise<ViewerType> {
    return createLobby(this.serviceLocator, context, input);
  }

  @Mutation(() => ViewerType)
  public async leaveLobby(@Ctx() context: Context): Promise<ViewerType> {
    return leaveLobby(this.serviceLocator, context);
  }

  @Mutation(() => ViewerType)
  public async joinLobby(
    @Ctx() context: Context,
    @Arg('input') input: JoinLobbyInput,
  ): Promise<ViewerType> {
    return joinLobby(this.serviceLocator, context, input);
  }
}
