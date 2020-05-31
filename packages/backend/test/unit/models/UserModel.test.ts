import Mongodb, { ObjectId } from 'mongodb';

import { UserModel } from '../../../src/models/UserModel';

import UserFixtures from '../../__fixtures__/users.fixtures';
import { createMongoService } from '../../__utils__/mongo';

describe('models/UserModel', () => {
  const mongoService = createMongoService();
  let userCollection: Mongodb.Collection;

  beforeAll(async () => {
    await mongoService.start();
    userCollection = mongoService.client.db().collection(UserModel.COLLECTION);
  });

  beforeEach(async () => {
    userCollection.deleteMany({});
  });

  afterAll(async () => {
    await mongoService.stop();
  });

  describe('createOne', () => {
    it('should insert the User in the database', async () => {
      const userModel = new UserModel(mongoService);

      const result = await userModel.createOne(UserFixtures.users.anna);

      const usersInDb = await userCollection.find({}).toArray();

      expect(result).toEqual({
        _id: expect.any(ObjectId),
        pseudo: 'Anna',
        cipheredPassword:
          '$2b$10$udlU8WzEfDkqJCqi/Z1Tm.tEVs/vbidCf.atmEBThUwLyVzDyrdKS',
      });
      expect(usersInDb).toEqual([
        {
          _id: expect.any(ObjectId),
          pseudo: 'Anna',
          cipheredPassword:
            '$2b$10$udlU8WzEfDkqJCqi/Z1Tm.tEVs/vbidCf.atmEBThUwLyVzDyrdKS',
        },
      ]);
    });
  });
});
