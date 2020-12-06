// istanbul ignore file

import 'reflect-metadata';
import 'source-map-support/register';

import { loadConfig } from './config/Config';
import { Server } from './Server';

/**
 * The entry point of the program.
 */
async function main(): Promise<void> {
  const config = loadConfig();
  const isDevMode = config.NODE_ENV === 'development';

  const server = new Server();

  console.log('[Server] Creating new Server instance...');
  await server.init({
    devMode: isDevMode,
    emitSchemaFile: isDevMode ? config.GRAPHQL_SCHEMA_OUTPUT : false,
    serverOptions: {
      allowedCorsOrigin: config.SERVER_CORS_ALLOWED_ORIGIN || undefined,
    },
  });
  console.log('[Server] Server instance created');

  const port = config.PORT;
  console.log('[Server] Starting server...', { port });
  await server.start({ port });
  console.log('[Server] Server started');
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
