import { Query, Resolver } from 'type-graphql';

import { Logger } from '../../utils/Logger';
import { Service } from '../../utils/ServiceLocator';
import { Hello } from '../types/Hello';

@Service()
@Resolver()
export class HelloResolver {
  constructor(private readonly logger: Logger) {}

  @Query(() => Hello)
  async hello(): Promise<Hello> {
    this.logger.info('[graphql][HelloResolver] #hello');

    return {
      id: '42',
      message: 'Hello world !',
    };
  }
}
