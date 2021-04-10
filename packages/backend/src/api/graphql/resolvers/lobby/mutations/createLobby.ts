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
export class CreateLobbyInput {
  @Field()
  userName!: string;
}

export async function createLobby(
  serviceLocator: ServiceLocator,
  context: Context,
  input: CreateLobbyInput,
): Promise<ViewerType> {
  const logger = serviceLocator.get(Logger);
  const lobbyCore = serviceLocator.get(LobbyCore);
  const { user } = context;
  const { userName } = input;

  logger.info('[graphql][LobbyResolver] #createLobby');

  try {
    const { creatingUser, createdLobby } = await lobbyCore.createLobby(
      user,
      userName,
    );

    await updateLobbyInContext(serviceLocator, context, createdLobby.id);

    return { id: creatingUser.id };
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
