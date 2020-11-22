import { getFromEnv, getNumberFromEnv } from '../../src/utils/envUtils';

describe('utils/envUtils', () => {
  let envSave: NodeJS.ProcessEnv;

  beforeEach(() => {
    // Save original process.env before overriding it
    envSave = process.env;
    process.env = {};
  });

  afterEach(() => {
    // Restore original process.env
    process.env = envSave;
  });

  describe('#getFromEnv', () => {
    it('should retrieve the variable from the environment', () => {
      process.env.SOME_VARIABLE = 'some_value';

      const envValue = getFromEnv('SOME_VARIABLE');
      const envValueGivenNull = getFromEnv('SOME_VARIABLE', null);
      const envValueGivenDefault = getFromEnv('SOME_VARIABLE', 'some_default');

      expect(envValue).toBe('some_value');
      expect(envValueGivenNull).toBe('some_value');
      expect(envValueGivenDefault).toBe('some_value');
    });

    it('should return `null` if the variable does not exist and `null` is provided', () => {
      const envValue = getFromEnv('SOME_VARIABLE', null);

      expect(envValue).toBe(null);
    });

    it('should return `defaultValue` if the variable does not exist and `defaultValue` is provided', () => {
      const envValue = getFromEnv('SOME_VARIABLE', 'some_default');

      expect(envValue).toBe('some_default');
    });

    it('should throw if the variable does not exist', () => {
      expect(() => {
        getFromEnv('SOME_VARIABLE');
      }).toThrowError(
        'EnvironmentVariableError: Missing environment variable "SOME_VARIABLE"',
      );
    });
  });

  describe('#getNumberFromEnv', () => {
    it('should retrieve the number from the environment', () => {
      process.env.SOME_VARIABLE = '42';

      const envValue = getNumberFromEnv('SOME_VARIABLE');
      const envValueGivenNull = getNumberFromEnv('SOME_VARIABLE', null);
      const envValueGivenDefault = getNumberFromEnv('SOME_VARIABLE', 100);

      expect(envValue).toBe(42);
      expect(envValueGivenNull).toBe(42);
      expect(envValueGivenDefault).toBe(42);
    });

    it('should return `null` if the variable does not exist and `null` is provided', () => {
      const envValue = getNumberFromEnv('SOME_VARIABLE', null);

      expect(envValue).toBe(null);
    });

    it('should return `defaultValue` if the variable does not exist and `defaultValue` is provided', () => {
      const envValue = getNumberFromEnv('SOME_VARIABLE', 100);

      expect(envValue).toBe(100);
    });

    it('should throw if the variable does not exist', () => {
      expect(() => {
        getNumberFromEnv('SOME_VARIABLE');
      }).toThrowError(
        'EnvironmentVariableError: Missing environment variable "SOME_VARIABLE"',
      );
    });

    it('should throw if the variable exists but is not a number', () => {
      process.env.SOME_VARIABLE = 'not_a_number';

      expect(() => {
        getNumberFromEnv('SOME_VARIABLE');
      }).toThrowError(
        'EnvironmentVariableError: Expected "SOME_VARIABLE" to be of type number, got "not_a_number"',
      );
    });
  });
});
