import { Collection } from 'mongodb';

import { MongoService } from '../services/MongoService';
import { User } from '../constants/types/User';

export class UserModel {
  public static readonly COLLECTION = 'users';

  private readonly collection: Collection<User>;

  constructor(mongoService: MongoService) {
    this.collection = mongoService.client
      .db()
      .collection<User>(UserModel.COLLECTION);
  }

  public async createOne(user: User): Promise<User> {
    await this.collection.insertOne(user);
    return user;
  }
}
