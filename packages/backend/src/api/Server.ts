import Http from 'http';

import { ApolloServer } from 'apollo-server-express';
import CookieParser from 'cookie-parser';
import Cors from 'cors';
import Express from 'express';

import { ServiceLocator } from '../utils/ServiceLocator';

import { Context } from './graphql/Context';
import { registerErrorHandler } from './graphql/plugins/registerErrorHandler';
import * as GraphqlSchema from './graphql/schema';
import { register404Handler } from './rest/middleware/register404Handler';
import { register500Handler } from './rest/middleware/register500Handler';
import { registerAuthGuardMiddleware } from './rest/middleware/registerAuthGuardMiddleware';
import { registerServiceLocatorMiddleware } from './rest/middleware/registerServiceLocatorMiddleware';
import { registerTraceIdMiddleware } from './rest/middleware/registerTraceIdMiddleware';
import * as ApiRest from './rest/registerRoutes';
import { getRequestingUser, getServiceLocator } from './utils';

const API_PATH = '/api' as const;
const GRAPHQL_PATH = `${API_PATH}/graphql` as const;

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

interface StartResult {
  port: number;
}

export class Server {
  private app: Express.Application | undefined;
  private server: Http.Server | undefined;
  private isRunning: boolean;

  constructor(private readonly serviceLocator: ServiceLocator) {
    this.app = undefined;
    this.server = undefined;
    this.isRunning = false;
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

    // Register Express middleware
    this.app.use(
      Cors({
        credentials: true,
        origin: serverOptions?.allowedCorsOrigin,
      }),
    );
    this.app.use(CookieParser());

    // Register REST middleware
    this.app.use(registerServiceLocatorMiddleware(this.serviceLocator));
    this.app.use(registerTraceIdMiddleware());
    // Register REST routes
    this.app.use(API_PATH, ApiRest.getRoutes());

    // Register GraphQL resources
    this.app.use(GRAPHQL_PATH, registerAuthGuardMiddleware());
    const graphqlSchema = await GraphqlSchema.buildSchema({
      emitSchemaFile: emitSchemaFile || false,
    });
    const graphqlServer = new ApolloServer({
      schema: graphqlSchema,
      introspection: isDevMode,
      playground: isDevMode,
      tracing: isDevMode,
      plugins: [registerErrorHandler()],
      context: ({ req, res, connection }) => {
        if (connection) {
          return connection.context;
        } else {
          const context: Context = {
            req,
            res,
            serviceLocator: getServiceLocator(res),
            user: getRequestingUser(res),
          };
          return context;
        }
      },
    });
    graphqlServer.applyMiddleware({
      app: this.app,
      path: GRAPHQL_PATH,
      cors: {
        origin: serverOptions?.allowedCorsOrigin,
        credentials: true,
        optionsSuccessStatus: 200,
      },
    });

    // Register Error handlers
    this.app.use(register404Handler());
    this.app.use(register500Handler());

    // Create server instance
    this.server = Http.createServer(this.app);
  }

  public async start(options: StartOptions): Promise<StartResult> {
    return new Promise((resolve) => {
      if (!this.app || !this.server) {
        throw new Error('Server not initialized');
      }
      if (this.isRunning) {
        throw new Error('Server already running');
      }

      const { port } = options;

      this.server.listen(port, () => {
        this.isRunning = true;
        resolve({ port });
      });
    });
  }
}
