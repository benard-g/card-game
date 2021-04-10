import { registerEnumType } from 'type-graphql';

export enum LobbyMemberRoleType {
  ADMIN,
  INVITEE,
}

registerEnumType(LobbyMemberRoleType, { name: 'LobbyMemberRole' });
