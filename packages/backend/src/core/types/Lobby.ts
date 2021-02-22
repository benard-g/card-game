export enum LobbyMemberRole {
  ADMIN = 'admin',
  INVITEE = 'invitee',
}

export interface LobbyMember {
  id: string;
  name: string;
  role: LobbyMemberRole;
}

export interface Lobby {
  id: number;
  code: string;
  version: number;
  members: LobbyMember[];
}
