import { Logger } from '../../src/utils/Logger';

export const loggerMock = {
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

export const logger = (loggerMock as unknown) as Logger;
