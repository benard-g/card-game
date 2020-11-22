// Mock function "buildSchema" from type-graphql
const TypeGraphql = jest.requireActual('type-graphql');
const buildSchemaSpy = jest.fn().mockReturnValue({});
jest.mock('type-graphql', () => ({
  ...TypeGraphql,
  buildSchema: buildSchemaSpy,
}));

// Mock class "ApolloServer" from apollo-server
const ApolloServer = jest.requireActual('apollo-server');
const apolloServerListenSpy = jest
  .fn()
  .mockImplementation((port) => ({ port }));
const apolloServerSpy = jest.fn().mockReturnValue({
  listen: apolloServerListenSpy,
});
jest.mock('apollo-server', () => ({
  ...ApolloServer,
  ApolloServer: apolloServerSpy,
}));

import { Server } from '../../src/graphql/Server';

describe('graphql/Server', () => {
  it('should correctly create a server in "dev" mode', async () => {
    const server = new Server();

    await server.init({ devMode: true, emitSchemaFile: '/path/file.graphql' });
    const listenInfo = await server.start(4242);

    expect(buildSchemaSpy).toHaveBeenCalledWith({
      emitSchemaFile: '/path/file.graphql',
      resolvers: expect.any(Array),
    });

    expect(apolloServerSpy).toHaveBeenCalledWith({
      schema: expect.any(Object),
      introspection: true,
      playground: true,
      tracing: true,
    });

    expect(listenInfo).toEqual({ port: 4242 });
    expect(apolloServerListenSpy).toHaveBeenCalledWith(4242);
  });

  it('should correctly create a server in "non-dev" mode', async () => {
    const server = new Server();

    await server.init({ devMode: false });
    const listenInfo = await server.start(4242);

    expect(buildSchemaSpy).toHaveBeenCalledWith({
      emitSchemaFile: false,
      resolvers: expect.any(Array),
    });

    expect(apolloServerSpy).toHaveBeenCalledWith({
      schema: expect.any(Object),
      introspection: false,
      playground: false,
      tracing: false,
    });

    expect(listenInfo).toEqual({ port: 4242 });
    expect(apolloServerListenSpy).toHaveBeenCalledWith(4242);
  });

  it('should throw an Error if started without initialization', async () => {
    const server = new Server();

    const promise = server.start(4242);

    await expect(promise).rejects.toEqual(new Error('Server not initialized'));
  });

  it('should throw an Error if initialized twice', async () => {
    const server = new Server();

    await server.init({ devMode: false });
    const promise = server.init({ devMode: false });

    await expect(promise).rejects.toEqual(
      new Error('Server already initialized'),
    );
  });
});
