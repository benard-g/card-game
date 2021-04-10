import { UserAlreadyInLobbyError } from '../../../errors/UserAlreadyInLobbyError';
import { Lobby } from '../../../types/Lobby';
import { LobbyMember } from '../../../types/LobbyMember';
import { LobbyMemberRole } from '../../../types/LobbyMemberRole';
import { User } from '../../../types/User';
import { formatLobbyMember } from '../utils/formatters/formatLobbyMember';
import { incrementLobbyVersion } from '../utils/incrementLobbyVersion';

const EVENT_NAME = 'LOBBY_JOIN';

export interface LobbyEvent {
  id: number;
  name: typeof EVENT_NAME;
  payload: {
    joiningUser: LobbyMember;
  };
}

interface JoinLobby {
  joiningUser: User;
  updatedLobby: Lobby;
  lobbyJoinEvent: LobbyEvent;
}

export function executeEvent(
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
    updatedLobby: updatedLobby,
    lobbyJoinEvent: {
      id: updatedLobby.version,
      name: EVENT_NAME,
      payload: {
        joiningUser: member,
      },
    },
  };
}
