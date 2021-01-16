import { v4 as uuid } from 'uuid';

import { Service } from '../utils/ServiceLocator';

import { User } from './types/User';

@Service()
export class UserCore {
  public async createUser(): Promise<User> {
    const uid = uuid();
    const user: User = {
      id: uid,
      lobbyId: undefined,
    };

    return user;
  }
}
