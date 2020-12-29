import Express from 'express';
import SuperTest from 'supertest';

import { register500Handler } from '../../src/middleware/register500Handler';
import { registerServiceLocatorMiddleware } from '../../src/middleware/registerServiceLocatorMiddleware';
import { Logger } from '../../src/utils/Logger';
import { globalServiceLocator } from '../../src/utils/ServiceLocator';
import { RequestClient } from '../__utils__/apiRest';
import { loggerMock } from '../__utils__/loggerMock';

describe('middleware/500Handler', () => {
  let request: RequestClient;

  beforeEach(async () => {
    const serviceLocator = globalServiceLocator.child();
    serviceLocator.set(Logger, loggerMock);

    const app = Express();
    app.use(registerServiceLocatorMiddleware(serviceLocator));

    // Register a failing route
    app.get('/error', () => {
      throw new Error('A very unfortunate error');
    });

    app.use(register500Handler());

    request = SuperTest(app);
  });

  it('should return a 500 response', async () => {
    const { status, text } = await request.get('/error');

    expect({ status, text }).toEqual({
      status: 500,
      text: 'Internal Server Error',
    });
  });
});
