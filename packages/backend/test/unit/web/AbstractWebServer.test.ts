import Express from 'express';
import request from 'supertest';

import { ServerConfig } from '../../../src/config/ServerConfig';
import { Logger } from '../../../src/utils/Logger';
import { AbstractWebServer } from '../../../src/web/AbstractWebServer';

import configFixtures from '../../__fixtures__/config.fixtures';
import { logger, loggerMock } from '../../__utils__/loggerMock';

describe('web/AbstractWebServer', () => {
  class TestWebServer extends AbstractWebServer {
    constructor(
      config: ServerConfig,
      logger: Logger,
      app: Express.Application,
    ) {
      super(config, logger, app);
    }

    protected setupRoutes(app: Express.Application): void {
      app.get('/ok', (_req, res) => {
        res.status(200).send('OK');
      });

      app.get('/error', () => {
        throw new Error('error in route');
      });
    }
  }

  describe('express wrapper', () => {
    const serverMock = {
      close: jest.fn((cb) => cb()),
    };
    const appMock = {
      get: jest.fn(),
      listen: jest.fn((port, cb) => {
        if (cb) {
          cb(port);
        }
        return serverMock;
      }),
      use: jest.fn(),
    };
    const app = (appMock as unknown) as Express.Application;

    it('should create a working server', async () => {
      const webServer = new TestWebServer(
        configFixtures.config.server,
        logger,
        app,
      );

      const port = await webServer.start();
      const closeStatus = await webServer.stop();

      expect(port).toBe(8080);
      expect(closeStatus).toBe(true);

      expect(appMock.listen.mock.calls).toEqual([[8080, expect.any(Function)]]);
      expect(serverMock.close.mock.calls).toEqual([[expect.any(Function)]]);

      expect(loggerMock.info.mock.calls).toEqual([
        ['[web] Server starting...'],
        ['[web] Server started', { port: 8080 }],
        ['[web] Server stopping...'],
        ['[web] Server stopped'],
      ]);
      expect(loggerMock.warn.mock.calls).toEqual([]);
      expect(loggerMock.error.mock.calls).toEqual([]);
    });

    it('should log a warning if trying to close before starting', async () => {
      const webServer = new TestWebServer(
        configFixtures.config.server,
        logger,
        app,
      );

      const closeStatus = await webServer.stop();

      expect(closeStatus).toBe(false);

      expect(loggerMock.info.mock.calls).toEqual([]);
      expect(loggerMock.warn.mock.calls).toEqual([
        ['[web] Attempting to stop the server when it is not running'],
      ]);
      expect(loggerMock.error.mock.calls).toEqual([]);
    });

    it('should log a warning if trying to close twice', async () => {
      const webServer = new TestWebServer(
        configFixtures.config.server,
        logger,
        app,
      );

      await webServer.start();
      const closeStatus1 = await webServer.stop();
      const closeStatus2 = await webServer.stop();

      expect(closeStatus1).toBe(true);
      expect(closeStatus2).toBe(false);

      expect(loggerMock.info.mock.calls).toEqual([
        ['[web] Server starting...'],
        ['[web] Server started', { port: 8080 }],
        ['[web] Server stopping...'],
        ['[web] Server stopped'],
      ]);
      expect(loggerMock.warn.mock.calls).toEqual([
        ['[web] Attempting to stop the server when it is not running'],
      ]);
      expect(loggerMock.error.mock.calls).toEqual([]);
    });

    it('should log a warning if trying to start twice', async () => {
      const webServer = new TestWebServer(
        configFixtures.config.server,
        logger,
        app,
      );

      const port1 = await webServer.start();
      const port2 = await webServer.start();

      expect(port1).toBe(8080);
      expect(port2).toBe(-1);

      expect(loggerMock.info.mock.calls).toEqual([
        ['[web] Server starting...'],
        ['[web] Server started', { port: 8080 }],
      ]);
      expect(loggerMock.warn.mock.calls).toEqual([
        ['[web] Attempting to start the server when it is already running'],
      ]);
      expect(loggerMock.error.mock.calls).toEqual([]);
    });
  });

  describe('routing', () => {
    it('should correctly map routes', async () => {
      const app = Express();
      const webServer = new TestWebServer(
        configFixtures.config.server,
        logger,
        app,
      );
      webServer.setup();

      const res = await request(app).get('/ok');

      expect(res.text).toEqual('OK');

      expect(loggerMock.info.mock.calls).toEqual([
        [
          '[web][middleware][logger] Request',
          {
            duration: expect.any(Number),
            req: {
              method: 'GET',
              path: '/ok',
            },
            res: {
              code: 200,
              message: 'OK',
            },
          },
        ],
      ]);
      expect(loggerMock.warn.mock.calls).toEqual([]);
      expect(loggerMock.error.mock.calls).toEqual([]);
    });

    it('should create a default 404 route', async () => {
      const app = Express();
      const webServer = new TestWebServer(
        configFixtures.config.server,
        logger,
        app,
      );
      webServer.setup();

      const res = await request(app).get('/not-found');

      expect(res.status).toBe(404);
      expect(res.text).toEqual('Route or resource not found');

      expect(loggerMock.info.mock.calls).toEqual([
        [
          '[web][middleware][logger] Request',
          {
            duration: expect.any(Number),
            req: {
              method: 'GET',
              path: '/not-found',
            },
            res: {
              code: 404,
              message: 'Not Found',
            },
          },
        ],
      ]);
      expect(loggerMock.warn.mock.calls).toEqual([]);
      expect(loggerMock.error.mock.calls).toEqual([]);
    });

    it('should create a default 500 route', async () => {
      const app = Express();
      const webServer = new TestWebServer(
        configFixtures.config.server,
        logger,
        app,
      );
      webServer.setup();

      const res = await request(app).get('/error');

      expect(res.status).toBe(500);
      expect(res.text).toEqual('Internal server error');

      expect(loggerMock.info.mock.calls).toEqual([
        [
          '[web][middleware][logger] Request',
          {
            duration: expect.any(Number),
            req: {
              method: 'GET',
              path: '/error',
            },
            res: {
              code: 500,
              message: 'Internal Server Error',
            },
          },
        ],
      ]);
      expect(loggerMock.warn.mock.calls).toEqual([]);
      expect(loggerMock.error.mock.calls).toEqual([
        ['[web] Internal server error', { error: new Error('error in route') }],
      ]);
    });
  });
});
