import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType('Viewer')
export class ViewerType {
  @Field(() => ID)
  public id!: string;
}
