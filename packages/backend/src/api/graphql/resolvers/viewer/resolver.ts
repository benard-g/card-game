import { Ctx, FieldResolver, Query, Resolver } from 'type-graphql';

import { Service, ServiceLocator } from '../../../../utils/ServiceLocator';
import { Context } from '../../Context';
import { LobbyType } from '../../entities/LobbyType';
import { ViewerType } from '../../entities/ViewerType';

import { viewer } from './queries/viewer';
import { viewerLobby } from './queries/viewerLobby';

@Service()
@Resolver(() => ViewerType)
export class ViewerResolver {
  constructor(private readonly serviceLocator: ServiceLocator) {}

  @Query(() => ViewerType)
  async viewer(@Ctx() context: Context): Promise<ViewerType> {
    return viewer(context);
  }

  @FieldResolver(() => LobbyType, { nullable: true })
  async lobby(@Ctx() context: Context): Promise<LobbyType | undefined> {
    return viewerLobby(this.serviceLocator, context);
  }
}
