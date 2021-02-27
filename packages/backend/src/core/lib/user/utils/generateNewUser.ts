import { v4 as uuid } from 'uuid';

import { User } from '../../../types/User';

export function generateNewUser(): User {
  const uid = uuid();

  return {
    id: uid,
    lobbyId: undefined,
  };
}
