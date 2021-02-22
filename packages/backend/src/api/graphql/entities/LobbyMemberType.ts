import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType('LobbyMember')
export class LobbyMemberType {
  @Field(() => ID)
  public id!: string;

  @Field()
  public name!: string;

  @Field()
  public role!: string;
}
