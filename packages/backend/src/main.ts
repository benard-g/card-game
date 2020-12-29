// istanbul ignore file

import 'reflect-metadata';
import 'source-map-support/register';

import { loadConfig } from './config/Config';
import { Logger } from './utils/Logger';
import { globalServiceLocator } from './utils/ServiceLocator';
import { Server } from './Server';

const config = loadConfig();

const logger = new Logger({
  enabled: config.NODE_ENV !== 'test',
  prettyPrint: config.NODE_ENV === 'development',
});
globalServiceLocator.set(Logger, logger);

/**
 * The entry point of the program.
 */
async function main(): Promise<void> {
  const isDevMode = config.NODE_ENV === 'development';

  const server = new Server(globalServiceLocator);

  logger.info('[server] Creating new Server instance...');
  await server.init({
    isDevMode,
    emitSchemaFile: isDevMode ? config.GRAPHQL_SCHEMA_OUTPUT : false,
    serverOptions: {
      allowedCorsOrigin: config.SERVER_CORS_ALLOWED_ORIGIN || undefined,
    },
  });
  logger.info('[server] Server instance created');

  const port = config.PORT;
  logger.info('[server] Starting server...', { port });
  await server.start({ port });
  logger.info('[server] Server started');
}

if (require.main === module) {
  main().catch((err) => {
    logger.error(err);
    process.exit(1);
  });
}
