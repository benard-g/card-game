import { LobbyMember } from './LobbyMember';

export interface Lobby {
  id: string;
  version: number;
  members: LobbyMember[];
}
