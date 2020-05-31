import { Models } from '../models/index';
import { ServiceProvider } from '../services/ServiceProvider';

import { UserCore } from './UserCore';

export class Core {
  public readonly user: UserCore;

  constructor(services: ServiceProvider, models: Models) {
    this.user = new UserCore(services, models);
  }
}
