import Express from 'express';

import { Logger } from './utils/Logger';

import * as Config from './config/Config';
import { Core } from './core';
import { Models } from './models';
import { ServiceProvider } from './services/ServiceProvider';
import { WebServer } from './web/WebServer';

const LOGGER_PREFIX = '[app]';

export interface WebProcess {
  init(): Promise<void>;
  start(): Promise<void>;
  stop(): Promise<void>;
}

function createWebProcess(
  logger: Logger,
  app: Express.Application,
): WebProcess {
  const config = Config.load();
  const services = new ServiceProvider(config.services, logger);
  let webServer: WebServer | undefined;

  return {
    init: async (): Promise<void> => {
      if (webServer) {
        throw new Error('Server already initialized');
      }

      await services.start();
      const models = new Models(services.mongo);
      const core = new Core(services, models);
      webServer = new WebServer(config.server, logger, app, core);
      webServer.setup();
    },
    start: async (): Promise<void> => {
      if (!webServer) {
        throw new Error('Server not initialized');
      }

      await webServer.start();
    },
    stop: async (): Promise<void> => {
      if (!webServer) {
        throw new Error('Server already stopped');
      }

      await services.stop();
      await webServer.stop();
      webServer = undefined;
    },
  };
}

async function main(): Promise<void> {
  const logger = new Logger();
  const app = Express();

  try {
    const webProcess = createWebProcess(logger, app);

    logger.info(`${LOGGER_PREFIX} Initializing...`);
    await webProcess.init();
    logger.info(`${LOGGER_PREFIX} Starting...`);
    await webProcess.start();
    logger.info(`${LOGGER_PREFIX} Started`);
  } catch (error) {
    logger.error(`${LOGGER_PREFIX} An error occurred while starting the app`, {
      error,
    });
  }
}

if (!module.parent) {
  main().catch(() => {
    process.exit(1);
  });
}

export const __TEST__ = {
  createWebProcess,
};
