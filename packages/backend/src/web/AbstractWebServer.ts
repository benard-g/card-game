import Express, { NextFunction, Request, Response } from 'express';
import { Server } from 'http';

import { ServerConfig } from '../config/ServerConfig';
import { Logger } from '../utils/Logger';

import { loggerMiddleware } from './api/middleware/loggerMiddleware';

const LOGGER_PREFIX = '[web]';

export abstract class AbstractWebServer {
  private server: Server | undefined;

  constructor(
    private readonly config: ServerConfig,
    private readonly logger: Logger,
    private readonly app: Express.Application,
  ) {}

  public setup(): void {
    this.setupMiddleware();
    this.setupRoutes(this.app, this.logger);
    this.setupErrorHandlers();
  }

  public async start(): Promise<number> {
    return new Promise((resolve) => {
      if (this.server) {
        this.logger.warn(
          `${LOGGER_PREFIX} Attempting to start the server when it is already running`,
        );
        resolve(-1);
      } else {
        const { port } = this.config;
        this.logger.info(`${LOGGER_PREFIX} Server starting...`);
        this.server = this.app.listen(port, () => {
          this.logger.info(`${LOGGER_PREFIX} Server started`, { port });
          resolve(port);
        });
      }
    });
  }

  public async stop(): Promise<boolean> {
    return new Promise((resolve) => {
      if (!this.server) {
        this.logger.warn(
          `${LOGGER_PREFIX} Attempting to stop the server when it is not running`,
        );
        resolve(false);
      } else {
        this.logger.info(`${LOGGER_PREFIX} Server stopping...`);
        this.server.close(() => {
          this.logger.info(`${LOGGER_PREFIX} Server stopped`);
          this.server = undefined;
          resolve(true);
        });
      }
    });
  }

  protected abstract setupRoutes(
    app: Express.Application,
    logger: Logger,
  ): void;

  private setupMiddleware(): void {
    this.app.use(Express.json());
    this.app.use(loggerMiddleware(this.logger));
  }

  private setupErrorHandlers(): void {
    // Register default 404
    this.app.use((_req, res) => {
      res.status(404).send('Route or resource not found');
    });

    // Register default 500
    this.app.use(
      (error: Error, _req: Request, res: Response, _next: NextFunction) => {
        this.logger.error(`${LOGGER_PREFIX} Internal server error`, { error });
        res.status(500).send('Internal server error');
      },
    );
  }
}
