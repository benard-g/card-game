import { loadConfig } from '../../src/config/Config';

describe('config/Config', () => {
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

  it('should return a default config', () => {
    const config = loadConfig();

    expect(config).toEqual({
      NODE_ENV: 'development',
      PORT: 8080,
      GRAPHQL_SCHEMA_OUTPUT: '../../schema.graphql',
    });
  });

  describe('NODE_ENV', () => {
    it('should return "test" when run by jest', () => {
      process.env = { NODE_ENV: envSave.NODE_ENV };

      const { NODE_ENV } = loadConfig();

      expect(NODE_ENV).toEqual('test');
    });

    it('should return "production" when running in "production" env', () => {
      process.env = { NODE_ENV: 'production' };

      const { NODE_ENV } = loadConfig();

      expect(NODE_ENV).toEqual('production');
    });

    it('should return "development" otherwise', () => {
      const { NODE_ENV } = loadConfig();

      expect(NODE_ENV).toEqual('development');
    });
  });
});
