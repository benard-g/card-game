import { UserAlreadyInLobbyError } from '../../../errors/UserAlreadyInLobbyError';
import { Lobby, LobbyMember, LobbyMemberRole } from '../../../types/Lobby';
import { User } from '../../../types/User';
import { formatLobbyMember } from '../utils/formatLobbyMember';
import { incrementLobbyVersion } from '../utils/incrementLobbyVersion';

// Event definition
const EVENT_NAME = 'LOBBY_JOIN';

export interface LobbyEvent {
  id: number;
  name: typeof EVENT_NAME;
  payload: {
    joiningUser: LobbyMember;
  };
}

// Event implementation
interface JoinLobby {
  joiningUser: User;
  lobby: Lobby;
  lobbyJoinEvent: LobbyEvent;
}

export function createEvent(
  lobby: Lobby,
  user: User,
  userName: string,
): JoinLobby {
  const userIdx = lobby.members.findIndex((m) => m.id === user.id);
  if (userIdx >= 0) {
    throw new UserAlreadyInLobbyError(lobby.id);
  }

  const isFirstMember = lobby.members.length === 0;
  const role = isFirstMember ? LobbyMemberRole.ADMIN : LobbyMemberRole.INVITEE;
  const member = formatLobbyMember(user, { name: userName, role });
  lobby.members.push(member);

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
        joiningUser: member,
      },
    },
  };
}
