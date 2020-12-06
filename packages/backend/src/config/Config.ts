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

export function loadConfig() {
  return {
    NODE_ENV: getNodeEnv(),
    PORT: getNumberFromEnv('PORT', 8080),
    GRAPHQL_SCHEMA_OUTPUT: getFromEnv(
      'GRAPHQL_SCHEMA_OUTPUT',
      '../../schema.graphql',
    ),
    SERVER_CORS_ALLOWED_ORIGIN: getFromEnv('SERVER_CORS_ALLOWED_ORIGIN', null),
  };
}

export type Config = ReturnType<typeof loadConfig>;
