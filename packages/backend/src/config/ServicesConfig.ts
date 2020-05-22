import { load as loadMongo, MongoConfig } from './services/MongoConfig';

export interface ServicesConfig {
  mongo: MongoConfig;
}

export function load(): ServicesConfig {
  return {
    mongo: loadMongo(),
  };
}
