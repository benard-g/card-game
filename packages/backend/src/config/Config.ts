import { getFromEnv, getNumberFromEnv } from '../utils/envUtils';

function getNodeEnv() {
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

export interface Config {
  NODE_ENV: ReturnType<typeof getNodeEnv>;
  PORT: number;
  GRAPHQL_SCHEMA_OUTPUT: string;
}

export function loadConfig(): Config {
  return {
    NODE_ENV: getNodeEnv(),
    PORT: getNumberFromEnv('PORT', 8080),
    GRAPHQL_SCHEMA_OUTPUT: getFromEnv(
      'GRAPHQL_SCHEMA_OUTPUT',
      '../../schema.graphql',
    ),
  };
}
