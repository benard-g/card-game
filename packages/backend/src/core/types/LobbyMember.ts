import { LobbyMemberRole } from './LobbyMemberRole';

export interface LobbyMember {
  id: string;
  name: string;
  role: LobbyMemberRole;
}
