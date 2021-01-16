import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Lobby {
  @Field()
  public code!: string;
}
