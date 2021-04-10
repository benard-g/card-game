// istanbul ignore file

import 'reflect-metadata';
import 'source-map-support/register';

import { Connection } from 'typeorm';

import { Server } from './api/Server';
import { loadConfig } from './config/Config';
import { createDatabaseConnection } from './model/database';
import { CookieService } from './services/CookieService';
import { JwtService } from './services/JwtService';
import { Logger } from './utils/Logger';
import { globalServiceLocator } from './utils/ServiceLocator';

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
  logger.info('[server] Database connection in progress...');
  const conn = await createDatabaseConnection({
    databaseUri: config.DATABASE_URI,
  });
  processServiceLocator.set(Connection, conn);
  logger.info('[server] Database connection success');

  // Init services
  processServiceLocator.set(JwtService, new JwtService(config.JWT_SECRET_KEY));
  processServiceLocator.set(CookieService, new CookieService(isDevMode));

  // Init server
  logger.info('[server] Server instance initializing...');
  const server = new Server(processServiceLocator);
  await server.init({
    isDevMode,
    emitSchemaFile: isDevMode ? config.GRAPHQL_SCHEMA_OUTPUT : false,
    serverOptions: {
      allowedCorsOrigin: config.SERVER_CORS_ALLOWED_ORIGIN || undefined,
    },
  });
  logger.info('[server] Server instance initialized');

  logger.info('[server] Server starting...');
  const { port } = await server.start({ port: config.PORT });
  logger.info('[server] Server started', { port });
}

if (require.main === module) {
  main().catch((err) => {
    logger.error(err);
    process.exit(1);
  });
}
