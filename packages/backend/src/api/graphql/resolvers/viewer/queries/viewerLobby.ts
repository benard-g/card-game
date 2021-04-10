import { LobbyCore } from '../../../../../core/lib/lobby';
import { ServiceLocator } from '../../../../../utils/ServiceLocator';
import { Context } from '../../../Context';
import { LobbyType } from '../../../entities/LobbyType';
import { formatLobbyType } from '../../../utils/formatters/formatLobbyType';
import { updateLobbyInContext } from '../../../utils/updateLobbyContext';

export async function viewerLobby(
  serviceLocator: ServiceLocator,
  context: Context,
): Promise<LobbyType | undefined> {
  const lobbyCore = serviceLocator.get(LobbyCore);
  const { user } = context;
  const { lobbyId } = user;

  if (!lobbyId) {
    return undefined;
  }

  const lobby = await lobbyCore.findLobbyById(lobbyId);
  if (!lobby) {
    await updateLobbyInContext(serviceLocator, context, undefined);
    return undefined;
  }

  return formatLobbyType(lobby);
}
