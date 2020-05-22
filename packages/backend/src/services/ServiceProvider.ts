import { ServicesConfig } from '../config/ServicesConfig';
import { Logger } from '../utils/Logger';
import { IService } from './IService';
import { MongoService } from './MongoService';

const LOGGER_PREFIX = '[services]';

export class ServiceProvider {
  private readonly services: Map<string, IService>;

  constructor(config: ServicesConfig, private readonly logger: Logger) {
    this.services = new Map();
    this.services.set('mongodb', new MongoService(config.mongo));
  }

  public async start(): Promise<void> {
    this.logger.info(`${LOGGER_PREFIX} Services starting...`);
    for (const [name, service] of this.services) {
      this.logger.info(`${LOGGER_PREFIX} - starting ${name}...`);
      await service.start();
      this.logger.info(`${LOGGER_PREFIX} - started ${name}`);
    }
    this.logger.info(`${LOGGER_PREFIX} Services started`);
  }

  public async stop(): Promise<void> {
    this.logger.info(`${LOGGER_PREFIX} Services stopping...`);
    for (const [name, service] of this.services) {
      this.logger.info(`${LOGGER_PREFIX} - stopping ${name}...`);
      await service.stop();
      this.logger.info(`${LOGGER_PREFIX} - stopped ${name}`);
    }
    this.logger.info(`${LOGGER_PREFIX} Services stopped`);
  }

  public get mongo(): MongoService {
    return this.services.get('mongodb') as MongoService;
  }
}
