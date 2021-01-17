import { getFromEnv, getNumberFromEnv } from '../utils/envUtils';

function getNodeEnv(): 'production' | 'development' | 'test' {
  const nodeEnv = getFromEnv('NODE_ENV', null);

  switch (nodeEnv) {
    case 'production':
      return 'production';
    case 'test':
      return 'test';
    default:
      return 'development';
  }
}

type NodeEnv = ReturnType<typeof getNodeEnv>;

function getCorsAllowedOrigin(nodeEnv: NodeEnv): string {
  const varName = 'SERVER_CORS_ALLOWED_ORIGIN';

  const DEFAULT_ORIGIN = 'http://localhost:3000';

  switch (nodeEnv) {
    case 'production':
      return getFromEnv(varName);
    default:
      return getFromEnv(varName, DEFAULT_ORIGIN);
  }
}

function getDatabaseUri(nodeEnv: NodeEnv): string {
  const varName = 'DATABASE_URL';

  const DEV_DB = 'postgres://postgres:password@localhost:5432/postgres';
  const TEST_DB = 'postgres://postgres:password@localhost:2345/postgres';

  switch (nodeEnv) {
    case 'development':
      return getFromEnv(varName, DEV_DB);
    case 'test':
      return getFromEnv(varName, TEST_DB);
    default:
      return getFromEnv(varName);
  }
}

function getJwtSecret(nodeEnv: NodeEnv): string {
  const varName = 'JWT_SECRET_KEY';

  const DEFAULT_SECRET_KEY = 'secret';

  switch (nodeEnv) {
    case 'production':
      return getFromEnv(varName);
    default:
      return getFromEnv(varName, DEFAULT_SECRET_KEY);
  }
}

export function loadConfig() {
  const nodeEnv = getNodeEnv();

  return {
    NODE_ENV: nodeEnv,
    PORT: getNumberFromEnv('PORT', 8080),
    DATABASE_URI: getDatabaseUri(nodeEnv),
    JWT_SECRET_KEY: getJwtSecret(nodeEnv),
    GRAPHQL_SCHEMA_OUTPUT: getFromEnv(
      'GRAPHQL_SCHEMA_OUTPUT',
      '../../schema.graphql',
    ),
    SERVER_CORS_ALLOWED_ORIGIN: getCorsAllowedOrigin(nodeEnv),
  };
}

export type Config = ReturnType<typeof loadConfig>;

export const __TEST__ = {
  getCorsAllowedOrigin,
  getDatabaseUri,
  getJwtSecret,
  getNodeEnv,
};
