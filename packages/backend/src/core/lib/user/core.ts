import { User } from '../../types/User';

import { generateNewUser } from './utils/generateNewUser';

export class UserCore {
  public async createUser(): Promise<User> {
    return generateNewUser();
  }
}
