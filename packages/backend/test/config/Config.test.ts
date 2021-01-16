import { __TEST__, loadConfig } from '../../src/config/Config';

describe('config/Config', () => {
  let envSave: NodeJS.ProcessEnv;

  beforeEach(() => {
    // Save original process.env before overriding it
    envSave = process.env;
    process.env = {
      ...envSave,
    };
  });

  afterEach(() => {
    // Restore original process.env
    process.env = envSave;
  });

  it('should return a default config', () => {
    const config = loadConfig();

    expect(config).toEqual({
      NODE_ENV: 'test',
      PORT: 8080,
      DATABASE_URI: 'postgres://postgres:password@localhost:2345/postgres',
      JWT_SECRET_KEY: 'secret',
      GRAPHQL_SCHEMA_OUTPUT: '../../schema.graphql',
      SERVER_CORS_ALLOWED_ORIGIN: null,
    });
  });

  describe('#getNodeEnv', () => {
    it('should return "test" when run by jest', () => {
      process.env = { NODE_ENV: envSave.NODE_ENV };

      const nodeEnv = __TEST__.getNodeEnv();

      expect(nodeEnv).toEqual('test');
    });

    it('should return "production" when running in "production" env', () => {
      process.env = { NODE_ENV: 'production' };

      const nodeEnv = __TEST__.getNodeEnv();

      expect(nodeEnv).toEqual('production');
    });

    it('should return "development" otherwise', () => {
      process.env = {};

      const nodeEnv = __TEST__.getNodeEnv();

      expect(nodeEnv).toEqual('development');
    });
  });

  describe('#getDatabaseUri', () => {
    it('should default to the "dev" database', () => {
      const databaseUri = __TEST__.getDatabaseUri('development');

      expect(databaseUri).toEqual(
        'postgres://postgres:password@localhost:5432/postgres',
      );
    });

    it('should default to the "test" database', () => {
      const databaseUri = __TEST__.getDatabaseUri('test');

      expect(databaseUri).toEqual(
        'postgres://postgres:password@localhost:2345/postgres',
      );
    });

    it('should use the value from "DATABASE_URI"', () => {
      process.env = { DATABASE_URI: 'database_uri_from_env' };

      const databaseUri = __TEST__.getDatabaseUri('production');

      expect(databaseUri).toEqual('database_uri_from_env');
    });

    it('should throw if undefined in "production" mode', () => {
      process.env = {};

      expect(() => {
        __TEST__.getDatabaseUri('production');
      }).toThrow(
        new Error(
          'EnvironmentVariableError: Missing environment variable "DATABASE_URI"',
        ),
      );
    });
  });

  describe('#getJwtSecret', () => {
    it('should use the default value', () => {
      const jwtSecret = __TEST__.getJwtSecret('development');

      expect(jwtSecret).toEqual('secret');
    });

    it('should use the value from "JWT_SECRET_KEY"', () => {
      process.env = { JWT_SECRET_KEY: 'jwt_secret_from_env' };

      const jwtSecret = __TEST__.getJwtSecret('production');

      expect(jwtSecret).toEqual('jwt_secret_from_env');
    });

    it('should throw if undefined in "production" mode', () => {
      expect(() => {
        __TEST__.getJwtSecret('production');
      }).toThrow(
        new Error(
          'EnvironmentVariableError: Missing environment variable "JWT_SECRET_KEY"',
        ),
      );
    });
  });
});
