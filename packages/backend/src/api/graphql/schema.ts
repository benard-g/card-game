import * as TypeGraphql from 'type-graphql';

import { LobbyResolver, ViewerResolver } from './resolvers';

interface Options {
  emitSchemaFile: string | false;
}

export async function buildSchema(options: Options) {
  return TypeGraphql.buildSchema({
    emitSchemaFile: options.emitSchemaFile,
    container: ({ context }) => context.serviceLocator,
    resolvers: [LobbyResolver, ViewerResolver],
  });
}
