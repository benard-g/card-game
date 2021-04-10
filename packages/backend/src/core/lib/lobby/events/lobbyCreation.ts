import { UserAlreadyInLobbyError } from '../../../errors/UserAlreadyInLobbyError';
import { Lobby } from '../../../types/Lobby';
import { LobbyMember } from '../../../types/LobbyMember';
import { LobbyMemberRole } from '../../../types/LobbyMemberRole';
import { User } from '../../../types/User';
import { formatLobbyMember } from '../utils/formatters/formatLobbyMember';
import { generateLobbyCode } from '../utils/generateLobbyCode';

const EVENT_NAME = 'LOBBY_CREATION';

export interface LobbyEvent {
  id: number;
  name: typeof EVENT_NAME;
  payload: {
    creatingUser: LobbyMember;
  };
}

interface Response {
  creatingUser: User;
  createdLobby: Lobby;
  lobbyCreationEvent: LobbyEvent;
}

export function executeEvent(creator: User, name: string): Response {
  if (creator.lobbyId) {
    throw new UserAlreadyInLobbyError(creator.lobbyId);
  }

  const lobbyMember = formatLobbyMember(creator, {
    name,
    role: LobbyMemberRole.ADMIN,
  });
  const createdLobby: Lobby = {
    id: generateLobbyCode(),
    version: 1,
    members: [lobbyMember],
  };

  return {
    creatingUser: {
      ...creator,
      lobbyId: createdLobby.id,
    },
    createdLobby,
    lobbyCreationEvent: {
      id: createdLobby.version,
      name: EVENT_NAME,
      payload: {
        creatingUser: lobbyMember,
      },
    },
  };
}
