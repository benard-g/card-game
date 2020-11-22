import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';

import { HelloResolver } from './resolvers/HelloResolver';

interface InitConfig {
  devMode: boolean;
  emitSchemaFile?: string | false;
}

export class Server {
  private server: ApolloServer | undefined;

  public async init(config: InitConfig): Promise<void> {
    if (this.server) {
      throw new Error('Server already initialized');
    }

    const schema = await buildSchema({
      emitSchemaFile: config.emitSchemaFile || false,
      resolvers: [HelloResolver],
    });

    this.server = new ApolloServer({
      schema,
      introspection: config.devMode,
      playground: config.devMode,
      tracing: config.devMode,
    });
  }

  public async start(port: number) {
    if (!this.server) {
      throw new Error('Server not initialized');
    }

    return this.server.listen(port);
  }
}
