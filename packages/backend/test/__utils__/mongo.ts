import * as MongoConfig from '../../src/config/services/MongoConfig';
import { MongoService } from '../../src/services/MongoService';

export function createMongoService(): MongoService {
  const mongoConfig = MongoConfig.load();
  return new MongoService(mongoConfig);
}
