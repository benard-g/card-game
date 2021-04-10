import { ArgsType, Field } from 'type-graphql';

import { LobbyCore } from '../../../../../core/lib/lobby';
import { Logger } from '../../../../../utils/Logger';
import { ServiceLocator } from '../../../../../utils/ServiceLocator';
import { LobbyPreviewType } from '../../../entities/LobbyPreviewType';
import { formatLobbyPreviewType } from '../../../utils/formatters/formatLobbyPreviewType';

@ArgsType()
export class FindLobbyByIdArgs {
  @Field()
  lobbyId!: string;
}

export async function findLobbyById(
  serviceLocator: ServiceLocator,
  args: FindLobbyByIdArgs,
): Promise<LobbyPreviewType | undefined> {
  const logger = serviceLocator.get(Logger);
  const lobbyCore = serviceLocator.get(LobbyCore);
  const { lobbyId } = args;

  logger.info('[graphql][LobbyResolver] #findLobbyById');

  const lobby = await lobbyCore.findLobbyById(lobbyId);
  if (!lobby) {
    logger.info('[graphql][LobbyResolver] #findLobbyById: Lobby not found', {
      lobbyId,
    });
    return undefined;
  }

  return formatLobbyPreviewType(lobby);
}
