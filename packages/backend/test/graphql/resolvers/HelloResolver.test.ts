import { gql } from 'apollo-server-express';

import { createGraphqlClient, GraphqlClient } from '../../__utils__/graphql';

describe('graphql/resolvers/HelloResolver', () => {
  let graphqlClient: GraphqlClient;

  beforeEach(async () => {
    graphqlClient = await createGraphqlClient();
  });

  describe('#hello', () => {
    it('should return the hello object', async () => {
      const { status, body } = await graphqlClient.query(gql`
        {
          hello {
            id
            message
          }
        }
      `);

      expect({ status, body }).toEqual({
        status: 200,
        body: {
          data: {
            hello: {
              id: '42',
              message: 'Hello world !',
            },
          },
        },
      });
    });
  });
});
