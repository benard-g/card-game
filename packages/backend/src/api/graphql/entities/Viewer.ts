import { Field, ID, ObjectType } from 'type-graphql';

import { Lobby } from './Lobby';

@ObjectType()
export class Viewer {
  @Field(() => ID)
  id!: string;

  @Field({ nullable: true })
  lobby?: Lobby;
}
