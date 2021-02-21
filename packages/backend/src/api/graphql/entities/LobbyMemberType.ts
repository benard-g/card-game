import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType('LobbyMember')
export class LobbyMemberType {
  @Field(() => ID)
  public userId!: string;

  @Field()
  public role!: string;
}
