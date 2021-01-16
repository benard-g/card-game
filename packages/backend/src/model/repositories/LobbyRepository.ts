import { Connection, Repository } from 'typeorm';

import { Service } from '../../utils/ServiceLocator';
import { DB_DUPLICATE_KEY_ERROR } from '../constants';
import { LobbyEntity } from '../entities/LobbyEntity';

export class DuplicateLobbyError extends Error {
  constructor() {
    super('Attempting to create a Lobby with a code already in use');
  }
}

type CreateLobbyPayload = Omit<LobbyEntity, 'id'>;

@Service()
export class LobbyRepository {
  private readonly lobbyRepository: Repository<LobbyEntity>;

  constructor(conn: Connection) {
    this.lobbyRepository = conn.getRepository(LobbyEntity);
  }

  public async createLobby(lobby: CreateLobbyPayload): Promise<LobbyEntity> {
    try {
      const createdLobby = await this.lobbyRepository.save(lobby);
      return createdLobby;
    } catch (err) {
      if (err.code === DB_DUPLICATE_KEY_ERROR) {
        throw new DuplicateLobbyError();
      }
      throw err;
    }
  }

  public async getLobbyById(id: number): Promise<LobbyEntity | undefined> {
    return this.lobbyRepository.findOne(id);
  }

  public async removeLobbiesOlderThan(date: Date): Promise<number> {
    const {
      affected,
    } = await this.lobbyRepository
      .createQueryBuilder()
      .delete()
      .where('updatedAt < :date', { date })
      .execute();
    return affected || 0;
  }
}
