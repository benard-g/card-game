import { LobbyMember, LobbyMemberRole } from '../../../types/Lobby';
import { User } from '../../../types/User';

interface Options {
  role: LobbyMemberRole;
}

export function formatLobbyMember(user: User, options: Options): LobbyMember {
  const { id } = user;
  const { role } = options;

  return {
    userId: id,
    role,
  };
}
