import { UserCore } from '../../../src/core/UserCore';
import { Models } from '../../../src/models';
import * as ModelUtils from '../../../src/models/utils';
import { ServiceProvider } from '../../../src/services/ServiceProvider';

import usersFixtures from '../../__fixtures__/users.fixtures';
import { UserAlreadyExistsError } from '../../../src/constants/errors/UserAlreadyExistsError';

describe('core/UserCore', () => {
  const servicesMock = {
    password: {
      cipherPassword: jest.fn().mockReturnValue('ciphered_password'),
    },
  };
  const services = (servicesMock as unknown) as ServiceProvider;

  const modelsMock = {
    users: {
      createOne: jest.fn(),
    },
  };
  const models = (modelsMock as unknown) as Models;

  const isDupKeyErrorSpy = jest
    .spyOn(ModelUtils, 'isDupKeyError')
    .mockReturnValue(false);

  describe('#createUser', () => {
    it('should create the new User correctly', async () => {
      const userCore = new UserCore(services, models);
      modelsMock.users.createOne.mockResolvedValueOnce(
        usersFixtures.users.anna,
      );

      const promise = userCore.createUser(
        usersFixtures.userCreationPayloads.anna,
      );

      await expect(promise).resolves.toEqual({
        pseudo: 'Anna',
        cipheredPassword:
          '$2b$10$udlU8WzEfDkqJCqi/Z1Tm.tEVs/vbidCf.atmEBThUwLyVzDyrdKS',
      });

      expect(servicesMock.password.cipherPassword.mock.calls).toEqual([
        ['123PASSword'],
      ]);
      expect(modelsMock.users.createOne.mock.calls).toEqual([
        [
          {
            pseudo: 'Anna',
            cipheredPassword: 'ciphered_password',
          },
        ],
      ]);
      expect(isDupKeyErrorSpy).not.toHaveBeenCalled();
    });

    it('should throw a custom error in case of duplicates', async () => {
      const userCore = new UserCore(services, models);
      modelsMock.users.createOne.mockRejectedValueOnce(new Error('error'));
      isDupKeyErrorSpy.mockReturnValueOnce(true);

      const promise = userCore.createUser(
        usersFixtures.userCreationPayloads.anna,
      );

      await expect(promise).rejects.toEqual(new UserAlreadyExistsError());

      expect(servicesMock.password.cipherPassword.mock.calls).toEqual([
        ['123PASSword'],
      ]);
      expect(modelsMock.users.createOne.mock.calls).toEqual([
        [
          {
            pseudo: 'Anna',
            cipheredPassword: 'ciphered_password',
          },
        ],
      ]);
      expect(isDupKeyErrorSpy).toHaveBeenCalled();
    });

    it('should throw a standard error in other cases', async () => {
      const userCore = new UserCore(services, models);
      modelsMock.users.createOne.mockRejectedValueOnce(new Error('error'));
      isDupKeyErrorSpy.mockReturnValueOnce(false);

      const promise = userCore.createUser(
        usersFixtures.userCreationPayloads.anna,
      );

      await expect(promise).rejects.toEqual(new Error('error'));

      expect(servicesMock.password.cipherPassword.mock.calls).toEqual([
        ['123PASSword'],
      ]);
      expect(modelsMock.users.createOne.mock.calls).toEqual([
        [
          {
            pseudo: 'Anna',
            cipheredPassword: 'ciphered_password',
          },
        ],
      ]);
      expect(isDupKeyErrorSpy).toHaveBeenCalled();
    });
  });
});
