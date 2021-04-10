import { LobbyMember } from '../../../../types/LobbyMember';
import { LobbyMemberRole } from '../../../../types/LobbyMemberRole';
import { User } from '../../../../types/User';

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
