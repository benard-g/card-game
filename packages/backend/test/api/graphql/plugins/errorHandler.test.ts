import { ApolloServer, gql } from 'apollo-server-express';
import Express from 'express';
import { DocumentNode, GraphQLError, print } from 'graphql';
import SuperTest from 'supertest';
import { buildSchema, Field, ObjectType, Query, Resolver } from 'type-graphql';

import { LOCAL_SERVICE_LOCATOR_KEY } from '../../../../src/api/constants';
import { registerErrorHandler } from '../../../../src/api/graphql/plugins/registerErrorHandler';
import { registerServiceLocatorMiddleware } from '../../../../src/api/middleware/registerServiceLocatorMiddleware';
import { Logger } from '../../../../src/utils/Logger';
import { globalServiceLocator } from '../../../../src/utils/ServiceLocator';
import { loggerMock } from '../../../__utils__/loggerMock';

@ObjectType()
class Entity {
  @Field(() => String)
  name!: string;
}

@Resolver()
class ErrorTestResolver {
  @Query(() => Entity)
  async errorQuery() {
    throw new Error('Some error');
  }

  @Query(() => Entity)
  async graphqlErrorQuery() {
    throw new GraphQLError('Some graphql error');
  }
}

describe('graphql/plugins/errorHandler', () => {
  let graphqlClient: (queryBody: DocumentNode) => SuperTest.Test;

  beforeEach(async () => {
    const serviceLocator = globalServiceLocator.child();
    serviceLocator.set(Logger, loggerMock);

    const app = Express();
    app.use(registerServiceLocatorMiddleware(serviceLocator));

    const schema = await buildSchema({
      resolvers: [ErrorTestResolver],
      container: ({ context }) => context.serviceLocator,
    });
    const graphqlServer = new ApolloServer({
      schema,
      introspection: false,
      tracing: false,

      plugins: [registerErrorHandler()],
      context: ({ res }) => ({
        serviceLocator: res.locals[LOCAL_SERVICE_LOCATOR_KEY],
      }),
    });
    graphqlServer.applyMiddleware({ app, path: '/api/graphql' });

    const request = SuperTest(app);
    graphqlClient = (queryBody: DocumentNode) =>
      request
        .post('/api/graphql')
        .accept('application/json')
        .send({ query: print(queryBody) });
  });

  it('should return an error response', async () => {
    const { status, body } = await graphqlClient(gql`
      query TestQuery {
        errorQuery {
          name
        }
      }
    `);

    expect(loggerMock.info).not.toHaveBeenCalled();
    expect(loggerMock.warn).not.toHaveBeenCalled();
    expect(loggerMock.error).toHaveBeenCalledWith(
      '[graphql] Unexpected error',
      { err: new Error('Some error') },
    );

    expect({ status, body }).toEqual({
      status: 200,
      body: {
        data: null,
        errors: [
          expect.objectContaining({
            extensions: {
              code: 'INTERNAL_SERVER_ERROR',
            },
            message: 'Some error',
          }),
        ],
      },
    });
  });

  it('should return a graphql error response', async () => {
    const { status, body } = await graphqlClient(gql`
      query TestQuery {
        graphqlErrorQuery {
          name
        }
      }
    `);

    expect(loggerMock.info).toHaveBeenCalledWith(
      '[graphql] Responding with error',
      {
        err: new GraphQLError('Some graphql error'),
      },
    );
    expect(loggerMock.warn).not.toHaveBeenCalled();
    expect(loggerMock.error).not.toHaveBeenCalled();

    expect({ status, body }).toEqual({
      status: 200,
      body: {
        data: null,
        errors: [
          expect.objectContaining({
            extensions: {
              code: 'INTERNAL_SERVER_ERROR',
              exception: { message: 'Some graphql error' },
            },
            message: 'Some graphql error',
          }),
        ],
      },
    });
  });
});
