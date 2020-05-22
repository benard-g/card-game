import { getFromEnv } from '../utils';

export interface MongoConfig {
  DATABASE_URI: string;
}

export function load(): MongoConfig {
  return {
    DATABASE_URI: getFromEnv(
      'MONGODB_URI',
      'mongodb://localhost:27017/cardgame',
    ),
  };
}
