import { ServiceProvider } from '../../../src/services/ServiceProvider';

import configFixtures from '../../__fixtures__/config.fixtures';
import { loggerMock, logger } from '../../__utils__/loggerMock';

describe('services/ServiceProvider', () => {
  it('should create a ServiceProvider', async () => {
    const serviceProvider = new ServiceProvider(
      configFixtures.config.services,
      logger,
    );

    await serviceProvider.start();

    const mongo = serviceProvider.mongo;

    await serviceProvider.stop();

    expect(mongo).not.toBeUndefined();

    expect(loggerMock.info.mock.calls).toEqual([
      // Start
      ['[services] Services starting...'],
      ['[services] - starting mongodb...'],
      ['[services] - started mongodb'],
      ['[services] Services started'],
      // Stop
      ['[services] Services stopping...'],
      ['[services] - stopping mongodb...'],
      ['[services] - stopped mongodb'],
      ['[services] Services stopped'],
    ]);
    expect(loggerMock.warn.mock.calls).toEqual([]);
    expect(loggerMock.error.mock.calls).toEqual([]);
  });
});
