import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Lobby {
  @Field(() => ID)
  public id!: string;
}
