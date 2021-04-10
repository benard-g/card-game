import { Lobby } from '../../../../core/types/Lobby';
import { LobbyPreviewType } from '../../entities/LobbyPreviewType';

export function formatLobbyPreviewType(lobby: Lobby): LobbyPreviewType {
  return {
    id: lobby.id,
    nbMembers: lobby.members.length,
  };
}
