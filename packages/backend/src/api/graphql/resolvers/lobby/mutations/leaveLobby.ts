import { LobbyCore } from '../../../../../core/lib/lobby';
import { Logger } from '../../../../../utils/Logger';
import { ServiceLocator } from '../../../../../utils/ServiceLocator';
import { Context } from '../../../Context';
import { ViewerType } from '../../../entities/ViewerType';
import { updateLobbyInContext } from '../../../utils/updateLobbyContext';

export async function leaveLobby(
  serviceLocator: ServiceLocator,
  context: Context,
): Promise<ViewerType> {
  const logger = serviceLocator.get(Logger);
  const lobbyCore = serviceLocator.get(LobbyCore);
  const { user } = context;
  const { lobbyId } = user;

  logger.info('[graphql][LobbyResolver] #leaveLobby');

  if (!lobbyId) {
    logger.info('[graphql][LobbyResolver] #leaveLobby: Not part of a lobby');
    return { id: user.id };
  }

  const lobby = await lobbyCore.findLobbyById(lobbyId);
  if (!lobby) {
    logger.info(
      '[graphql][LobbyResolver] #leaveLobby: Associated lobby not in DB',
      { lobbyId },
    );
    await updateLobbyInContext(serviceLocator, context, undefined);
    return { id: user.id };
  }

  const { leavingUser } = await lobbyCore.leaveLobby(lobby, user);

  await updateLobbyInContext(serviceLocator, context, undefined);
  // TODO publish event

  return { id: leavingUser.id };
}
