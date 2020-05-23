import { getNumberFromEnv } from './utils';

export interface ServerConfig {
  port: number;
}

export function load(): ServerConfig {
  return {
    port: getNumberFromEnv('PORT', 8080),
  };
}
