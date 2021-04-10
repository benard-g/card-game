import { Field, ID, ObjectType } from 'type-graphql';

import { LobbyMemberRoleType } from './LobbyMemberRoleType';

@ObjectType('LobbyMember')
export class LobbyMemberType {
  @Field(() => ID)
  public id!: string;

  @Field()
  public name!: string;

  @Field(() => LobbyMemberRoleType)
  public role!: LobbyMemberRoleType;
}
