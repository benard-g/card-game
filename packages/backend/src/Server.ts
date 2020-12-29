import Http from 'http';

import { ApolloServer } from 'apollo-server-express';
import Cors from 'cors';
import Express from 'express';

import { LOCAL_SERVICE_LOCATOR_KEY } from './constants/api';
import { registerErrorHandler } from './graphql/plugins/registerErrorHandler';
import * as GraphqlSchema from './graphql/schema';
import { register404Handler } from './middleware/register404Handler';
import { register500Handler } from './middleware/register500Handler';
import { registerLoggerMiddleware } from './middleware/registerLoggerMiddleware';
import { registerRequestIdMiddleware } from './middleware/registerRequestIdMiddleware';
import { registerServiceLocatorMiddleware } from './middleware/registerServiceLocatorMiddleware';
import { ServiceLocator } from './utils/ServiceLocator';
import * as ApiRest from './api';

interface InitOptions {
  isDevMode: boolean;
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

  constructor(private readonly serviceLocator: ServiceLocator) {
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
    const { isDevMode, emitSchemaFile, serverOptions } = options;

    this.app = Express();

    // Register middleware
    this.app.use(Cors({ origin: serverOptions?.allowedCorsOrigin }));

    this.app.use(registerRequestIdMiddleware());
    this.app.use(registerServiceLocatorMiddleware(this.serviceLocator));
    this.app.use(registerLoggerMiddleware());

    // Register REST resources
    this.app.use('/api', ApiRest.registerRoutes());

    // Register graphql resources
    const graphqlSchema = await GraphqlSchema.buildSchema({
      emitSchemaFile: emitSchemaFile || false,
    });
    const graphqlServer = new ApolloServer({
      schema: graphqlSchema,
      introspection: isDevMode,
      playground: isDevMode,
      tracing: isDevMode,
      plugins: [registerErrorHandler()],
      context: ({ res }) => ({
        serviceLocator: res.locals[LOCAL_SERVICE_LOCATOR_KEY],
      }),
    });
    graphqlServer.applyMiddleware({ app: this.app, path: '/api/graphql' });

    this.app.use(register404Handler());
    this.app.use(register500Handler());
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
