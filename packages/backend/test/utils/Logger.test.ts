const pinoMock = {
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};
const pinoSpy = jest.fn().mockReturnValue(pinoMock);
jest.mock('pino', () => pinoSpy);

import { Logger } from '../../src/utils/Logger';

describe('utils/Logger', () => {
  describe('logging', () => {
    it('should correctly log messages with "info" level', () => {
      const logger = new Logger({
        enabled: false,
        prettyPrint: false,
      });

      logger.info('My message');
      logger.info('My message with data', { key: 'value' });

      expect(pinoSpy).toHaveBeenCalledWith({
        enabled: false,
        prettyPrint: false,
        base: undefined,
        timestamp: true,
      });

      expect(pinoMock.info.mock.calls).toEqual([
        ['My message'],
        [{ key: 'value' }, 'My message with data'],
      ]);
      expect(pinoMock.warn.mock.calls).toEqual([]);
      expect(pinoMock.error.mock.calls).toEqual([]);
    });

    it('should correctly log messages with "warn" level', () => {
      const logger = new Logger({
        enabled: false,
        prettyPrint: false,
      });

      logger.warn('My message');
      logger.warn('My message with data', { key: 'value' });

      expect(pinoSpy).toHaveBeenCalledWith({
        enabled: false,
        prettyPrint: false,
        base: undefined,
        timestamp: true,
      });

      expect(pinoMock.info.mock.calls).toEqual([]);
      expect(pinoMock.warn.mock.calls).toEqual([
        ['My message'],
        [{ key: 'value' }, 'My message with data'],
      ]);
      expect(pinoMock.error.mock.calls).toEqual([]);
    });

    it('should correctly log messages with "error" level', () => {
      const logger = new Logger({
        enabled: false,
        prettyPrint: false,
      });

      logger.error('My message');
      logger.error('My message with data', { key: 'value' });

      expect(pinoSpy).toHaveBeenCalledWith({
        enabled: false,
        prettyPrint: false,
        base: undefined,
        timestamp: true,
      });

      expect(pinoMock.info.mock.calls).toEqual([]);
      expect(pinoMock.warn.mock.calls).toEqual([]);
      expect(pinoMock.error.mock.calls).toEqual([
        ['My message'],
        [{ key: 'value' }, 'My message with data'],
      ]);
    });
  });

  describe('child', () => {
    it('should correctly scope child data', () => {
      const logger1 = new Logger({
        enabled: false,
        prettyPrint: false,
      });
      const logger2 = logger1.child({ childOf: 'logger1', key: 'value' });
      logger2.child({ childOf: 'logger2' });

      expect(pinoSpy.mock.calls).toEqual([
        [
          {
            enabled: false,
            prettyPrint: false,
            base: undefined,
            timestamp: true,
          },
        ],
        [
          {
            enabled: false,
            prettyPrint: false,
            base: { childOf: 'logger1', key: 'value' },
            timestamp: true,
          },
        ],
        [
          {
            enabled: false,
            prettyPrint: false,
            base: { childOf: 'logger2', key: 'value' },
            timestamp: true,
          },
        ],
      ]);
    });
  });
});
