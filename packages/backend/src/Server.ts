import Http from 'http';

import { ApolloServer } from 'apollo-server-express';
import CookieParser from 'cookie-parser';
import Cors from 'cors';
import Express from 'express';

import { Context } from './api/graphql/Context';
import { registerErrorHandler } from './api/graphql/plugins/registerErrorHandler';
import * as GraphqlSchema from './api/graphql/schema';
import { register404Handler } from './api/middleware/register404Handler';
import { register500Handler } from './api/middleware/register500Handler';
import { registerAuthGuardMiddleware } from './api/middleware/registerAuthGuardMiddleware';
import { registerLoggerMiddleware } from './api/middleware/registerLoggerMiddleware';
import { registerRequestIdMiddleware } from './api/middleware/registerRequestIdMiddleware';
import { registerServiceLocatorMiddleware } from './api/middleware/registerServiceLocatorMiddleware';
import * as ApiRest from './api/routes';
import { getRequestingUser, getServiceLocator } from './api/utils';
import { ServiceLocator } from './utils/ServiceLocator';

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
    this.app.use(CookieParser());

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
      context: ({ req, res }): Context => ({
        req,
        res,
        serviceLocator: getServiceLocator(res),
        user: getRequestingUser(res),
      }),
    });

    this.app.use('/api/graphql', registerAuthGuardMiddleware());
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
