import * as TypeGraphql from 'type-graphql';

import { LobbyResolver } from './resolvers/lobby';
import { ViewerResolver } from './resolvers/viewer';

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
