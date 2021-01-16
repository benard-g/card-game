import { LobbyEntity } from '../model/entities/LobbyEntity';
import { LobbyRepository } from '../model/repositories/LobbyRepository';
import * as DateUtils from '../utils/dateUtils';
import { Service } from '../utils/ServiceLocator';

import { CoreError } from './errors/CoreError';
import { User } from './types/User';

const LOBBY_CODE_LENGTH = 6;
const LOBBY_DELETE_AFTER_TIME = 1 * 3600 * 1000; // 1 hour

interface CreateLobbyPayload {
  lobby: LobbyEntity;
}

interface LeaveLobbyPayload {
  leftLobbyCode?: string;
}

export class UserAlreadyInLobbyError extends CoreError {
  constructor(public readonly lobby: LobbyEntity) {
    super('User already part of a lobby');
  }
}

@Service()
export class LobbyCore {
  constructor(private readonly lobbyRepository: LobbyRepository) {}

  public async createLobby(user: User): Promise<CreateLobbyPayload> {
    if (user.lobbyId) {
      const existingLobby = await this.lobbyRepository.getLobbyById(
        user.lobbyId,
      );
      if (existingLobby) {
        throw new UserAlreadyInLobbyError(existingLobby);
      }
    }

    const lobby = await this.lobbyRepository.createLobby({
      code: generateCode(LOBBY_CODE_LENGTH),
    });

    return {
      lobby,
    };
  }

  public async leaveLobby(user: User): Promise<LeaveLobbyPayload> {
    let lobby: LobbyEntity | undefined;

    if (user.lobbyId) {
      lobby = await this.lobbyRepository.getLobbyById(user.lobbyId);
    }

    return {
      leftLobbyCode: lobby ? lobby.code : undefined,
    };
  }

  public async deleteOldLobbies(): Promise<number> {
    const date = new Date(DateUtils.now().valueOf() - LOBBY_DELETE_AFTER_TIME);
    return this.lobbyRepository.removeLobbiesOlderThan(date);
  }
}

function generateCode(length: number): string {
  const CODE_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const random = () => Math.floor(Math.random() * CODE_LETTERS.length);

  let code = '';
  for (let i = 0; i < length; ++i) {
    code += CODE_LETTERS[random()];
  }

  return code;
}
