import { MongoService } from '../services/MongoService';

import { UserModel } from './UserModel';

export class Models {
  public readonly users: UserModel;

  constructor(mongoService: MongoService) {
    this.users = new UserModel(mongoService);
  }
}
