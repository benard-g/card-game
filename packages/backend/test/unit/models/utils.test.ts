import Mongodb from 'mongodb';

import { UserModel } from '../../../src/models/UserModel';
import * as Utils from '../../../src/models/utils';

import UserFixtures from '../../__fixtures__/users.fixtures';
import { createMongoService } from '../../__utils__/mongo';

describe('models/utils', () => {
  describe('isDupKeyError', () => {
    const mongoService = createMongoService();
    let collection: Mongodb.Collection;

    beforeAll(async () => {
      await mongoService.start();
      collection = mongoService.client.db().collection(UserModel.COLLECTION);
    });

    beforeEach(async () => {
      collection.deleteMany({});
    });

    afterAll(async () => {
      await mongoService.stop();
    });

    it('should recognize a Mongodb "DUP_KEY" error', async () => {
      let assertionResult: boolean | undefined;

      await collection.insertOne(UserFixtures.users.anna);

      try {
        // Inserting "anna" again will throw because of the unique constraint
        await collection.insertOne(UserFixtures.users.anna);
      } catch (error) {
        assertionResult = Utils.isDupKeyError(error);
      }

      expect(assertionResult).toBe(true);
    });

    it('should reject other types of error', () => {
      const error = new Error('error');

      const assertion = Utils.isDupKeyError(error);

      expect(assertion).toBe(false);
    });
  });
});
