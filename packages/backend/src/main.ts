// istanbul ignore file
// istanbul ignore file

import 'reflect-metadata';
import 'source-map-support/register';

import { loadConfig } from './config/Config';
import { Server } from './graphql/Server';

/**
 * The entry point of the program.
 */
async function main(): Promise<void> {
  const config = loadConfig();

  const isDevMode = config.NODE_ENV === 'development';

  const server = new Server();
  await server.init({
    devMode: isDevMode,
    emitSchemaFile: isDevMode ? config.GRAPHQL_SCHEMA_OUTPUT : false,
  });

  const { port } = await server.start(config.PORT);
  console.log('Server started', { port });
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err);
  });
}
