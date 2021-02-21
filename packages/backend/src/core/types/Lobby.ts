export enum LobbyMemberRole {
  ADMIN = 'admin',
  INVITEE = 'invitee',
}

export interface LobbyMember {
  userId: string;
  role: LobbyMemberRole;
}

export interface Lobby {
  id: number;
  code: string;
  version: number;
  members: LobbyMember[];
}
