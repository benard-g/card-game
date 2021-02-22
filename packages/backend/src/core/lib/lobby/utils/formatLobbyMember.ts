import { LobbyMember, LobbyMemberRole } from '../../../types/Lobby';
import { User } from '../../../types/User';

interface Options {
  name: string;
  role: LobbyMemberRole;
}

export function formatLobbyMember(user: User, options: Options): LobbyMember {
  const { id } = user;
  const { name, role } = options;

  return {
    id,
    name,
    role,
  };
}
