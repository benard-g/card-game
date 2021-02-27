import { Lobby } from '../../../types/Lobby';

export function incrementLobbyVersion(lobby: Lobby): Lobby {
  lobby.version += 1;
  return lobby;
}
