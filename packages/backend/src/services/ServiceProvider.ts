import { ServicesConfig } from '../config/ServicesConfig';
import { Logger } from '../utils/Logger';
import { ResourcefulService, Service } from './Service';
import { MongoService } from './MongoService';
import { PasswordService } from './PasswordService';

const LOGGER_PREFIX = '[services]';

export class ServiceProvider {
  private readonly services: Map<string, Service>;
  private readonly resourcefulServices: Map<string, ResourcefulService>;

  constructor(config: ServicesConfig, private readonly logger: Logger) {
    this.services = new Map();
    this.services.set(PasswordService.NAME, new PasswordService());

    this.resourcefulServices = new Map();
    this.resourcefulServices.set(
      MongoService.NAME,
      new MongoService(config.mongo),
    );
  }

  public async start(): Promise<void> {
    this.logger.info(`${LOGGER_PREFIX} Services starting...`);
    for (const [name, service] of this.resourcefulServices) {
      this.logger.info(`${LOGGER_PREFIX} - starting "${name}"...`);
      await service.start();
      this.logger.info(`${LOGGER_PREFIX} - started "${name}"`);
    }
    this.logger.info(`${LOGGER_PREFIX} Services started`);
  }

  public async stop(): Promise<void> {
    this.logger.info(`${LOGGER_PREFIX} Services stopping...`);
    for (const [name, service] of this.resourcefulServices) {
      this.logger.info(`${LOGGER_PREFIX} - stopping "${name}"...`);
      await service.stop();
      this.logger.info(`${LOGGER_PREFIX} - stopped "${name}"`);
    }
    this.logger.info(`${LOGGER_PREFIX} Services stopped`);
  }

  public get mongo(): MongoService {
    return this.resourcefulServices.get(MongoService.NAME) as MongoService;
  }

  public get password(): PasswordService {
    return this.services.get(PasswordService.NAME) as PasswordService;
  }
}
