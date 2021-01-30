// istanbul ignore file

import 'reflect-metadata';
import 'source-map-support/register';

import { Connection } from 'typeorm';

import { loadConfig } from './config/Config';
import { createDatabaseConnection } from './model/database';
import { CookieSetter } from './utils/CookieSetter';
import { Jwt } from './utils/Jwt';
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
  const processServiceLocator = globalServiceLocator.child();

  // Init DB connection
  logger.info('[server] Connecting to database...');
  const conn = await createDatabaseConnection({
    databaseUri: config.DATABASE_URI,
  });
  processServiceLocator.set(Connection, conn);
  logger.info('[server] Connected to database');

  // Init services
  processServiceLocator.set(Jwt, new Jwt(config.JWT_SECRET_KEY));
  processServiceLocator.set(CookieSetter, new CookieSetter(isDevMode));

  // Init server
  logger.info('[server] Creating new Server instance...');
  const server = new Server(processServiceLocator);
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
