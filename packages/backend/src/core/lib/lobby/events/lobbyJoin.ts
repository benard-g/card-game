import { UserAlreadyInLobbyError } from '../../../errors/UserAlreadyInLobbyError';
import { Lobby, LobbyMemberRole } from '../../../types/Lobby';
import { User } from '../../../types/User';
import { incrementLobbyVersion } from '../utils/incrementLobbyVersion';

// Event definition
const EVENT_NAME = 'LOBBY_JOIN';

export interface LobbyEvent {
  id: number;
  name: typeof EVENT_NAME;
  payload: {
    joiningUser: { id: string; role: LobbyMemberRole };
  };
}

// Event implementation
interface JoinLobby {
  joiningUser: User;
  lobby: Lobby;
  lobbyJoinEvent: LobbyEvent;
}

export function createEvent(lobby: Lobby, user: User): JoinLobby {
  const userIdx = lobby.members.findIndex((m) => m.userId === user.id);
  if (userIdx >= 0) {
    throw new UserAlreadyInLobbyError(lobby.id);
  }

  const isFirstMember = lobby.members.length === 0;
  const role = isFirstMember ? LobbyMemberRole.ADMIN : LobbyMemberRole.INVITEE;
  lobby.members.push({
    userId: user.id,
    role,
  });

  const updatedLobby = incrementLobbyVersion(lobby);
  return {
    joiningUser: {
      ...user,
      lobbyId: updatedLobby.id,
    },
    lobby: updatedLobby,
    lobbyJoinEvent: {
      id: updatedLobby.version,
      name: EVENT_NAME,
      payload: {
        joiningUser: {
          id: user.id,
          role,
        },
      },
    },
  };
}
