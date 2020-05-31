import { User } from '../../src/constants/types/User';
import { UserCreationPayload } from '../../src/core/UserCore';

const userCreationPayloads = {
  anna: ((): UserCreationPayload => ({
    pseudo: 'Anna',
    password: '123PASSword',
  }))(),
  billy: ((): UserCreationPayload => ({
    pseudo: 'Billy',
    password: '42PaSsWoRd42',
  }))(),
};

const users = {
  anna: ((): User => ({
    pseudo: 'Anna',
    cipheredPassword:
      '$2b$10$udlU8WzEfDkqJCqi/Z1Tm.tEVs/vbidCf.atmEBThUwLyVzDyrdKS',
  }))(),
  billy: ((): User => ({
    pseudo: 'Billy',
    cipheredPassword:
      '$2b$10$hpJAUjB3yzFVDeVU9iNDGuOfFDnGA4DoKR3nmf/ECZKl5c11SGNm6',
  }))(),
};

export default Object.freeze({
  users,
  userCreationPayloads,
});
