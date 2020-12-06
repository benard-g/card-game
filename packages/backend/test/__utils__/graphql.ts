import { gql } from 'apollo-server-express';
import { print } from 'graphql';

import { createRequestClient } from './apiRest';

type DocumentNode = ReturnType<typeof gql>;

export async function createGraphqlClient() {
  const request = await createRequestClient();

  return {
    query: async (queryBody: DocumentNode) => {
      const queryString = print(queryBody);

      return request
        .post('/api/graphql')
        .accept('application/json')
        .send({ query: queryString });
    },
  };
}

type PromiseResolvedType<T> = T extends (...args: any[]) => Promise<infer R>
  ? R
  : never;
export type GraphqlClient = PromiseResolvedType<typeof createGraphqlClient>;
