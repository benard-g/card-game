import { Field, ID, Int, ObjectType } from 'type-graphql';

@ObjectType('LobbyPreview')
export class LobbyPreviewType {
  @Field(() => ID)
  public id!: string;

  @Field(() => Int)
  public nbMembers!: number;
}
