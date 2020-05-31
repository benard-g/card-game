import Express from 'express';

import { ServerConfig } from '../config/ServerConfig';
import { Core } from '../core';
import { Logger } from '../utils/Logger';

import { AbstractWebServer } from './AbstractWebServer';
import * as Controllers from './api/controllers';

export class WebServer extends AbstractWebServer {
  constructor(
    config: ServerConfig,
    logger: Logger,
    app: Express.Application,
    private readonly core: Core,
  ) {
    super(config, logger, app);
  }

  protected setupRoutes(app: Express.Application, logger: Logger): void {
    const routes = Controllers.loadRoutes(this.core, logger);
    app.use('/api', routes);
  }
}
