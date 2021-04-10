import { LobbyMemberRole } from '../../../../core/types/LobbyMemberRole';
import { LobbyMemberRoleType } from '../../entities/LobbyMemberRoleType';

export function formatLobbyMemberRoleType(
  role: LobbyMemberRole,
): LobbyMemberRoleType {
  if (role === LobbyMemberRole.ADMIN) return LobbyMemberRoleType.ADMIN;
  if (role === LobbyMemberRole.INVITEE) return LobbyMemberRoleType.INVITEE;

  throw new Error(`No mapping found for ${role}`);
}
