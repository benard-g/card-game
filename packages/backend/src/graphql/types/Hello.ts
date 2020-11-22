import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Hello {
  @Field(() => ID)
  id!: string;

  @Field()
  message!: string;
}
