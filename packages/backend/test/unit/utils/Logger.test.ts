import Winston from 'winston';

import { Logger } from '../../../src/utils/Logger';

describe('utils/Logger', () => {
  const loggerMock = {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  };

  jest
    .spyOn(Winston, 'createLogger')
    .mockReturnValue((loggerMock as unknown) as Winston.Logger);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should log a message with "info" level', () => {
    const logger = new Logger();

    logger.info('message', { key: 'value' });

    expect(loggerMock.info.mock.calls).toEqual([
      ['message', { data: { key: 'value' } }],
    ]);
    expect(loggerMock.warn.mock.calls).toEqual([]);
    expect(loggerMock.error.mock.calls).toEqual([]);
  });

  it('should log a message with "warn" level', () => {
    const logger = new Logger();

    logger.warn('message', { key: 'value' });

    expect(loggerMock.info.mock.calls).toEqual([]);
    expect(loggerMock.warn.mock.calls).toEqual([
      ['message', { data: { key: 'value' } }],
    ]);
    expect(loggerMock.error.mock.calls).toEqual([]);
  });

  it('should log a message with "error" level', () => {
    const logger = new Logger();

    logger.error('message 1', { error: new Error('error'), key: 'value' });
    logger.error('message 2', { error: new Error('error') });
    logger.error('message 3');

    expect(loggerMock.info.mock.calls).toEqual([]);
    expect(loggerMock.warn.mock.calls).toEqual([]);
    expect(loggerMock.error.mock.calls).toEqual([
      [
        'message 1',
        {
          error: { stack: expect.any(String), message: 'error' },
          data: { key: 'value' },
        },
      ],
      [
        'message 2',
        {
          error: { stack: expect.any(String), message: 'error' },
        },
      ],
      ['message 3'],
    ]);
  });
});
