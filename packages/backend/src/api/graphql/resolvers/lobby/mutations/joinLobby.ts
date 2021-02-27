import { ErrorCode } from '@packages/lib-shared';
import { ApolloError } from 'apollo-server-express';
import { Field, InputType } from 'type-graphql';

import { UserAlreadyInLobbyError } from '../../../../../core/errors/UserAlreadyInLobbyError';
import { LobbyCore } from '../../../../../core/lib/lobby';
import { Logger } from '../../../../../utils/Logger';
import { ServiceLocator } from '../../../../../utils/ServiceLocator';
import { Context } from '../../../Context';
import { ViewerType } from '../../../entities/ViewerType';
import { updateLobbyInContext } from '../../../utils/updateLobbyContext';

@InputType()
export class JoinLobbyInput {
  @Field()
  lobbyId!: string;

  @Field()
  userName!: string;
}

export async function joinLobby(
  serviceLocator: ServiceLocator,
  context: Context,
  input: JoinLobbyInput,
): Promise<ViewerType> {
  const logger = serviceLocator.get(Logger);
  const lobbyCore = serviceLocator.get(LobbyCore);
  const { user } = context;
  const { lobbyId: lobbyCode, userName } = input;

  logger.info('[graphql][LobbyResolver] #joinLobby');

  const lobby = await lobbyCore.findLobbyByCode(lobbyCode);
  if (!lobby) {
    logger.info('[graphql][LobbyResolver] #joinLobby: Lobby not found', {
      lobbyCode,
    });
    throw new ApolloError('Lobby not found', ErrorCode.LOBBY_NOT_FOUND);
  }

  try {
    const { joiningUser } = await lobbyCore.joinLobby(lobby, user, userName);
    await updateLobbyInContext(serviceLocator, context, joiningUser.lobbyId);

    return { id: user.id };
  } catch (err) {
    if (err instanceof UserAlreadyInLobbyError) {
      const { lobbyId } = err;
      logger.info(
        '[graphql][LobbyResolver] #joinLobby: User is already part of a lobby',
        { lobbyId },
      );
      throw new ApolloError(
        'Could not join Lobby',
        ErrorCode.USER_ALREADY_IN_LOBBY,
      );
    }
    throw err;
  }
}
