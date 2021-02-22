import { Lobby, LobbyMemberRole } from '../../../types/Lobby';
import { User } from '../../../types/User';
import { incrementLobbyVersion } from '../utils/incrementLobbyVersion';

// Event definition
const EVENT_NAME = 'LOBBY_LEAVE';

export interface LobbyEvent {
  id: number;
  name: typeof EVENT_NAME;
  payload: {
    leavingUser: { id: string };
    newAdmin?: { id: string };
  };
}

// Event implementation
interface LeaveLobby {
  leavingUser: User;
  lobby: Lobby;
  lobbyLeaveEvent: LobbyEvent;
}

export function createEvent(lobby: Lobby, user: User): LeaveLobby {
  const userIdx = lobby.members.findIndex((m) => m.id === user.id);
  let newAdminIdx: number | undefined = undefined;

  if (
    lobby.members[userIdx].role === LobbyMemberRole.ADMIN &&
    lobby.members.length > 1
  ) {
    newAdminIdx = userIdx === 0 ? 1 : 0;
    lobby.members[newAdminIdx].role = LobbyMemberRole.ADMIN;
  }

  const newAdmin = newAdminIdx
    ? { id: lobby.members[newAdminIdx].id }
    : undefined;
  const updatedLobby = incrementLobbyVersion(lobby);
  lobby.members.splice(userIdx, 1);

  return {
    leavingUser: {
      ...user,
      lobbyId: undefined,
    },
    lobby: updatedLobby,
    lobbyLeaveEvent: {
      id: updatedLobby.version,
      name: EVENT_NAME,
      payload: {
        leavingUser: { id: user.id },
        newAdmin,
      },
    },
  };
}
