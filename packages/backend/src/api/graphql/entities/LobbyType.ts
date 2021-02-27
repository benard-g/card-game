import { Field, ID, ObjectType } from 'type-graphql';

import { LobbyMemberType } from './LobbyMemberType';

@ObjectType('Lobby')
export class LobbyType {
  @Field(() => ID)
  public id!: string;

  @Field(() => [LobbyMemberType])
  public members!: LobbyMemberType[];
}
