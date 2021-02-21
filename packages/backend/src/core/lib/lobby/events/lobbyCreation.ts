import { UserAlreadyInLobbyError } from '../../../errors/UserAlreadyInLobbyError';
import { Lobby, LobbyMember, LobbyMemberRole } from '../../../types/Lobby';
import { User } from '../../../types/User';
import { formatLobbyMember } from '../utils/formatLobbyMember';
import { generateCode } from '../utils/generateCode';

// Event definition
const EVENT_NAME = 'LOBBY_CREATION';

export interface LobbyEvent {
  id: number;
  name: typeof EVENT_NAME;
  payload: {
    code: string;
    user: LobbyMember;
  };
}

// Event implementation
const LOBBY_CODE_LENGTH = 6;

interface CreateNewLobby {
  creator: User;
  lobby: Lobby;
  lobbyCreationEvent: LobbyEvent;
}

export function createEvent(creator: User): CreateNewLobby {
  if (creator.lobbyId) {
    throw new UserAlreadyInLobbyError(creator.lobbyId);
  }

  const lobbyMember = formatLobbyMember(creator, {
    role: LobbyMemberRole.ADMIN,
  });
  const lobby: Lobby = {
    id: 0,
    code: generateCode(LOBBY_CODE_LENGTH),
    version: 1,
    members: [lobbyMember],
  };

  return {
    creator: {
      ...creator,
      lobbyId: lobby.id,
    },
    lobby,
    lobbyCreationEvent: {
      id: lobby.version,
      name: EVENT_NAME,
      payload: {
        code: lobby.code,
        user: lobby.members[0],
      },
    },
  };
}
