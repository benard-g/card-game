import { UserAlreadyExistsError } from '../constants/errors/UserAlreadyExistsError';
import { User } from '../constants/types/User';
import { Models } from '../models';
import { isDupKeyError } from '../models/utils';
import { ServiceProvider } from '../services/ServiceProvider';

export type UserCreationPayload = Omit<User, 'cipheredPassword'> & {
  password: string;
};

export class UserCore {
  constructor(
    private readonly services: ServiceProvider,
    private readonly model: Models,
  ) {}

  public async createUser(userToCreate: UserCreationPayload): Promise<User> {
    const { password, ...data } = userToCreate;

    try {
      const cipheredPassword = await this.services.password.cipherPassword(
        password,
      );

      const user = { ...data, cipheredPassword };

      const createdUser = await this.model.users.createOne(user);

      return createdUser;
    } catch (error) {
      if (isDupKeyError(error)) {
        throw new UserAlreadyExistsError();
      }

      throw error;
    }
  }
}
