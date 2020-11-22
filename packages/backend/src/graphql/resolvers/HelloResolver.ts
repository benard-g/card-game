import { Query, Resolver } from 'type-graphql';

import { Hello } from '../types/Hello';

@Resolver()
export class HelloResolver {
  @Query(() => Hello)
  async hello(): Promise<Hello> {
    return {
      id: '42',
      message: 'Hello world !',
    };
  }
}
