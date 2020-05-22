import Express from 'express';

import { ServerConfig } from '../config/ServerConfig';
import { Models } from '../models';
import { ServiceProvider } from '../services/ServiceProvider';
import { Logger } from '../utils/Logger';

import { AbstractWebServer } from './AbstractWebServer';
import * as Controllers from './api/controllers';

export class WebServer extends AbstractWebServer {
  constructor(
    config: ServerConfig,
    logger: Logger,
    app: Express.Application,
    private readonly services: ServiceProvider,
    private readonly models: Models,
  ) {
    super(config, logger, app);
  }

  protected setupRoutes(app: Express.Application): void {
    const routes = Controllers.loadRoutes(this.services, this.models);
    app.use('/api', routes);
  }
}
