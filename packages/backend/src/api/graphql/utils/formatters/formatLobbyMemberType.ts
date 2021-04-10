import { LobbyMember } from '../../../../core/types/LobbyMember';
import { LobbyMemberType } from '../../entities/LobbyMemberType';

import { formatLobbyMemberRoleType } from './formatLobbyMemberRoleType';

export function formatLobbyMemberType(
  lobbyMember: LobbyMember,
): LobbyMemberType {
  return {
    id: lobbyMember.id,
    name: lobbyMember.name,
    role: formatLobbyMemberRoleType(lobbyMember.role),
  };
}
