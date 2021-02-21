import { ErrorCode } from '@packages/lib-shared';
import { ApolloError } from 'apollo-server-express';

import { UserAlreadyInLobbyError } from '../../../../../core/errors/UserAlreadyInLobbyError';
import { LobbyCore } from '../../../../../core/lib/lobby';
import { Logger } from '../../../../../utils/Logger';
import { ServiceLocator } from '../../../../../utils/ServiceLocator';
import { Context } from '../../../Context';
import { ViewerType } from '../../../entities/ViewerType';
import { updateLobbyInContext } from '../utils/updateLobbyContext';

export async function createLobby(
  serviceLocator: ServiceLocator,
  context: Context,
): Promise<ViewerType> {
  const logger = serviceLocator.get(Logger);
  const lobbyCore = serviceLocator.get(LobbyCore);
  const { user } = context;

  logger.info('[graphql][LobbyResolver] #createLobby');

  try {
    const { lobby } = await lobbyCore.createLobby(user);

    logger.info('[graphql][LobbyResolver] #createLobby: Lobby created', {
      lobbyId: lobby.id,
    });

    await updateLobbyInContext(serviceLocator, context, lobby.id);

    return { id: user.id };
  } catch (err) {
    if (err instanceof UserAlreadyInLobbyError) {
      const { lobbyId } = err;
      logger.info(
        '[graphql][LobbyResolver] #createLobby: User is already part of a lobby',
        { lobbyId },
      );
      throw new ApolloError(
        'Lobby creation failed',
        ErrorCode.USER_ALREADY_IN_LOBBY,
      );
    }
    throw err;
  }
}
