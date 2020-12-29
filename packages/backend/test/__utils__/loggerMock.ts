import { Logger } from '../../src/utils/Logger';

class LoggerMock {
  info = jest.fn().mockName('Logger.info');
  warn = jest.fn().mockName('Logger.warn');
  error = jest.fn().mockName('Logger.error');

  child = () => this;
}

export const loggerMock = (new LoggerMock() as unknown) as Logger;
