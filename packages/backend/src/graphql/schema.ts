import * as TypeGraphql from 'type-graphql';

import { HelloResolver } from './resolvers/HelloResolver';

interface Options {
  emitSchemaFile: string | false;
}

export async function buildSchema(options: Options) {
  return TypeGraphql.buildSchema({
    emitSchemaFile: options.emitSchemaFile,
    resolvers: [HelloResolver],
    container: ({ context }) => context.serviceLocator,
  });
}
