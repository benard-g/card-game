import { ArgsType, Field } from 'type-graphql';

import { LobbyCore } from '../../../../../core/lib/lobby';
import { Logger } from '../../../../../utils/Logger';
import { ServiceLocator } from '../../../../../utils/ServiceLocator';
import { LobbyPreviewType } from '../../../entities/LobbyPreviewType';

@ArgsType()
export class FindLobbyArgs {
  @Field()
  lobbyId!: string;
}

export async function findLobby(
  serviceLocator: ServiceLocator,
  args: FindLobbyArgs,
): Promise<LobbyPreviewType | undefined> {
  const logger = serviceLocator.get(Logger);
  const lobbyCore = serviceLocator.get(LobbyCore);
  const { lobbyId: lobbyCode } = args;

  logger.info('[graphql][LobbyResolver] #findLobby');

  const lobby = await lobbyCore.findLobbyByCode(lobbyCode);
  if (!lobby) {
    logger.info('[graphql][LobbyResolver] #findLobby: Lobby not found', {
      lobbyCode,
    });
    return undefined;
  }

  return {
    id: lobby.code,
    nbMembers: lobby.members.length,
  };
}
