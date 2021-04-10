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

function handleError(logger: Logger, err: Error): never {
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
  const { lobbyId, userName } = input;

  logger.info('[graphql][LobbyResolver] #joinLobby');

  const lobby = await lobbyCore.findLobbyById(lobbyId);
  if (!lobby) {
    logger.info('[graphql][LobbyResolver] #joinLobby: Lobby not found', {
      lobbyId,
    });
    throw new ApolloError('Lobby not found', ErrorCode.LOBBY_NOT_FOUND);
  }

  try {
    const { updatedLobby } = await lobbyCore.joinLobby(lobby, user, userName);

    await updateLobbyInContext(serviceLocator, context, updatedLobby.id);
    // TODO publish event

    return { id: user.id };
  } catch (err) {
    handleError(logger, err);
  }
}
