import {
  EnvironmentVariableError,
  getFromEnv,
  getNumberFromEnv,
} from '../../../src/config/utils';

describe('config/utils', () => {
  const OLD_END = process.env;

  beforeEach(() => {
    // Copy env
    process.env = { ...OLD_END };
  });

  afterEach(() => {
    // Restore env
    process.env = OLD_END;
  });

  describe('#getFromEnv', () => {
    const VARIABLE = 'var';

    it('should return the value from the environment', () => {
      process.env[VARIABLE] = 'value';

      const value = getFromEnv(VARIABLE);

      expect(value).toBe('value');
    });

    it('should return the default value when the variable is not in the environment', () => {
      const VARIABLE_NOT_IN_ENV = 'var_not_in_env';
      const DEFAULT_VALUE = 'default_value';

      const value = getFromEnv(VARIABLE_NOT_IN_ENV, DEFAULT_VALUE);

      expect(value).toBe(DEFAULT_VALUE);
    });

    it('should throw when the variable is not in the environment and no default value is provided', () => {
      const VARIABLE_NOT_IN_ENV = 'var_not_in_env';

      expect(() => getFromEnv(VARIABLE_NOT_IN_ENV)).toThrow(
        new EnvironmentVariableError(
          'missing environment variable "var_not_in_env"',
        ),
      );
    });
  });

  describe('#getNumberFromEnv', () => {
    const VARIABLE = 'var';

    it('should return the value from the environment', () => {
      process.env[VARIABLE] = '42';

      const value = getNumberFromEnv(VARIABLE);

      expect(value).toBe(42);
    });

    it('should throw when the value is not a number, even if a default value is provided', () => {
      process.env[VARIABLE] = 'NOT_A_NUMBER';

      expect(() => getNumberFromEnv(VARIABLE)).toThrow(
        new EnvironmentVariableError('value of "var" is not a number'),
      );
      expect(() => getNumberFromEnv(VARIABLE, 12345)).toThrow(
        new EnvironmentVariableError('value of "var" is not a number'),
      );
    });

    it('should return the default value when the variable is not in the environment', () => {
      const VARIABLE_NOT_IN_ENV = 'var_not_in_env';
      const DEFAULT_VALUE = 12345;

      const value = getNumberFromEnv(VARIABLE_NOT_IN_ENV, DEFAULT_VALUE);

      expect(value).toBe(DEFAULT_VALUE);
    });

    it('should throw when the variable is not in the environment and no default value is provided', () => {
      const VARIABLE_NOT_IN_ENV = 'var_not_in_env';

      expect(() => getNumberFromEnv(VARIABLE_NOT_IN_ENV)).toThrow(
        new EnvironmentVariableError(
          'missing environment variable "var_not_in_env"',
        ),
      );
    });
  });
});
