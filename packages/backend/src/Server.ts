import Http from 'http';

import { ApolloServer } from 'apollo-server-express';
import Cors from 'cors';
import Express from 'express';

import * as GraphqlSchema from './graphql/schema';
import * as ApiRest from './api';

interface InitOptions {
  devMode: boolean;
  emitSchemaFile?: string | false;
  serverOptions?: {
    allowedCorsOrigin?: string;
  };
}

interface StartOptions {
  port: number;
}

export class Server {
  private app: Express.Application | undefined;
  private server: Http.Server | undefined;

  constructor() {
    this.app = undefined;
    this.server = undefined;
  }

  public getApp(): Express.Application {
    if (!this.app) {
      throw new Error('Server not initialized');
    }

    return this.app;
  }

  public async init(options: InitOptions): Promise<void> {
    const { emitSchemaFile, serverOptions } = options;

    this.app = Express();

    // Register middleware
    this.app.use(Cors({ origin: serverOptions?.allowedCorsOrigin }));

    // Register REST resources
    this.app.use('/api', ApiRest.registerRoutes());

    // Register graphql resources
    const graphqlSchema = await GraphqlSchema.buildSchema({
      emitSchemaFile: emitSchemaFile || false,
    });
    const graphqlServer = new ApolloServer({
      schema: graphqlSchema,
      introspection: options.devMode,
      playground: options.devMode,
      tracing: options.devMode,
    });
    graphqlServer.applyMiddleware({ app: this.app, path: '/api/graphql' });
  }

  public async start(options: StartOptions): Promise<void> {
    return new Promise((resolve) => {
      if (!this.app) {
        throw new Error('Server not initialized');
      }
      if (this.server) {
        throw new Error('Server already running');
      }

      const { port } = options;

      this.server = Http.createServer(this.app);
      this.server.listen(port, resolve);
    });
  }
}
