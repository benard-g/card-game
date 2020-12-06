// Mock function "createServer" from http
const Http = jest.requireActual('http');
const httpServerListenSpy = jest.fn();
const httpCreateServerSpy = jest.fn().mockReturnValue({
  listen: httpServerListenSpy.mockImplementation((_, resolve) => resolve()),
});
jest.mock('http', () => ({
  ...Http,
  createServer: httpCreateServerSpy,
}));

// Mock class "ApolloServer" from apollo-server-express
const ApolloServerExpress = jest.requireActual('apollo-server-express');
const apolloServerMock = {
  applyMiddleware: jest.fn(),
};
const apolloServerSpy = jest.fn().mockReturnValue(apolloServerMock);
jest.mock('apollo-server-express', () => ({
  ...ApolloServerExpress,
  ApolloServer: apolloServerSpy,
}));

import * as GraphqlSchema from '../src/graphql/schema';
import { Server } from '../src/Server';

describe('graphql/Server', () => {
  const buildSchemaSpy = jest.spyOn(GraphqlSchema, 'buildSchema');
  const expressApp = expect.any(Function);

  describe('initialization', () => {
    it('should correctly create a server in "dev" mode', async () => {
      const server = new Server();

      await server.init({ devMode: true });

      expect(buildSchemaSpy).toHaveBeenCalledWith({
        emitSchemaFile: false,
      });
      expect(apolloServerSpy).toHaveBeenCalledWith({
        schema: expect.any(Object),
        introspection: true,
        playground: true,
        tracing: true,
      });
      expect(apolloServerMock.applyMiddleware).toHaveBeenCalledWith({
        app: expressApp,
        path: '/api/graphql',
      });

      await server.start({ port: 4242 });

      expect(httpCreateServerSpy).toHaveBeenCalledWith(expressApp);
      expect(httpServerListenSpy).toHaveBeenCalledWith(
        4242,
        expect.any(Function),
      );
    });

    it('should correctly create a server in "non-dev" mode', async () => {
      const server = new Server();

      await server.init({ devMode: false });

      expect(buildSchemaSpy).toHaveBeenCalledWith({
        emitSchemaFile: false,
      });
      expect(apolloServerSpy).toHaveBeenCalledWith({
        schema: expect.any(Object),
        introspection: false,
        playground: false,
        tracing: false,
      });
      expect(apolloServerMock.applyMiddleware).toHaveBeenCalledWith({
        app: expressApp,
        path: '/api/graphql',
      });

      await server.start({ port: 4242 });

      expect(httpCreateServerSpy).toHaveBeenCalledWith(expressApp);
      expect(httpServerListenSpy).toHaveBeenCalledWith(
        4242,
        expect.any(Function),
      );
    });

    it('should throw an Error if started without initialization', async () => {
      const server = new Server();

      const promise = server.start({ port: 4242 });

      await expect(promise).rejects.toEqual(
        new Error('Server not initialized'),
      );
    });

    it('should throw an Error if initialized twice', async () => {
      const server = new Server();

      await server.init({ devMode: false });
      await server.start({ port: 4242 });
      const promise = server.start({ port: 4242 });

      await expect(promise).rejects.toEqual(
        new Error('Server already running'),
      );
    });
  });

  describe('#getApp', () => {
    it('should return the app instance', async () => {
      const server = new Server();

      await server.init({ devMode: false });

      const app = server.getApp();

      expect(app).toEqual(expressApp);
    });

    it('should throw an Error if not initialized', () => {
      const server = new Server();

      expect(() => server.getApp()).toThrow(
        new Error('Server not initialized'),
      );
    });
  });
});
