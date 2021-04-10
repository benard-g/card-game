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

import * as GraphqlSchema from '../../src/api/graphql/schema';
import { Server } from '../../src/api/Server';
import { globalServiceLocator } from '../../src/utils/ServiceLocator';

describe('api/Server', () => {
  const buildSchemaSpy = jest.spyOn(GraphqlSchema, 'buildSchema');
  const expressApp = expect.any(Function);

  const createServer = () => {
    return new Server(globalServiceLocator.child());
  };

  describe('initialization', () => {
    it('should correctly create a server in "dev" mode', async () => {
      const server = createServer();

      await server.init({
        isDevMode: true,
        serverOptions: { allowedCorsOrigin: 'https://allowed-origin.net' },
      });

      expect(buildSchemaSpy).toHaveBeenCalledWith({
        emitSchemaFile: false,
      });
      expect(apolloServerSpy).toHaveBeenCalledWith({
        introspection: true,
        playground: true,
        tracing: true,
        context: expect.any(Function),
        schema: expect.any(Object),
        plugins: expect.any(Array),
      });
      expect(apolloServerMock.applyMiddleware).toHaveBeenCalledWith({
        app: expressApp,
        path: '/api/graphql',
        cors: {
          credentials: true,
          origin: 'https://allowed-origin.net',
          optionsSuccessStatus: 200,
        },
      });

      await server.start({ port: 4242 });

      expect(httpCreateServerSpy).toHaveBeenCalledWith(expressApp);
      expect(httpServerListenSpy).toHaveBeenCalledWith(
        4242,
        expect.any(Function),
      );
    });

    it('should correctly create a server in "non-dev" mode', async () => {
      const server = createServer();

      await server.init({
        isDevMode: false,
        serverOptions: { allowedCorsOrigin: 'https://allowed-origin.net' },
      });

      expect(buildSchemaSpy).toHaveBeenCalledWith({
        emitSchemaFile: false,
      });
      expect(apolloServerSpy).toHaveBeenCalledWith({
        introspection: false,
        playground: false,
        tracing: false,
        context: expect.any(Function),
        schema: expect.any(Object),
        plugins: expect.any(Array),
      });
      expect(apolloServerMock.applyMiddleware).toHaveBeenCalledWith({
        app: expressApp,
        path: '/api/graphql',
        cors: {
          credentials: true,
          origin: 'https://allowed-origin.net',
          optionsSuccessStatus: 200,
        },
      });

      await server.start({ port: 4242 });

      expect(httpCreateServerSpy).toHaveBeenCalledWith(expressApp);
      expect(httpServerListenSpy).toHaveBeenCalledWith(
        4242,
        expect.any(Function),
      );
    });

    it('should throw an Error if started without initialization', async () => {
      const server = createServer();

      const promise = server.start({ port: 4242 });

      await expect(promise).rejects.toEqual(
        new Error('Server not initialized'),
      );
    });

    it('should throw an Error if initialized twice', async () => {
      const server = createServer();

      await server.init({ isDevMode: false });
      await server.start({ port: 4242 });
      const promise = server.start({ port: 4242 });

      await expect(promise).rejects.toEqual(
        new Error('Server already running'),
      );
    });
  });

  describe('#getApp', () => {
    it('should return the app instance', async () => {
      const server = createServer();

      await server.init({ isDevMode: false });

      const app = server.getApp();

      expect(app).toEqual(expressApp);
    });

    it('should throw an Error if not initialized', () => {
      const server = createServer();

      expect(() => server.getApp()).toThrow(
        new Error('Server not initialized'),
      );
    });
  });
});
