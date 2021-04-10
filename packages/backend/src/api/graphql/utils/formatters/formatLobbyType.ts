import { Lobby } from '../../../../core/types/Lobby';
import { LobbyType } from '../../entities/LobbyType';

import { formatLobbyMemberType } from './formatLobbyMemberType';

export function formatLobbyType(lobby: Lobby): LobbyType {
  return {
    id: lobby.id,
    members: lobby.members.map(formatLobbyMemberType),
  };
}
