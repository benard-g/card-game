import { PluginDefinition } from 'apollo-server-core';
import { GraphQLError } from 'graphql';

import { Logger } from '../../utils/Logger';
import { ServiceLocator } from '../../utils/ServiceLocator';

export function registerErrorHandler(): PluginDefinition {
  return {
    requestDidStart: () => ({
      didEncounterErrors: ({ context, errors }) => {
        const serviceLocator = context.serviceLocator as ServiceLocator;
        const logger = serviceLocator.get(Logger);

        for (const error of errors) {
          // istanbul ignore next
          const err = error.originalError || error;
          if (err instanceof GraphQLError) {
            logger.info('[graphql] Error', { err });
          } else {
            logger.error('[graphql] Unexpected error', { err });
          }
        }
      },
    }),
  };
}
