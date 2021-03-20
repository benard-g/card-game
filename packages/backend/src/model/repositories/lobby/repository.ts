import { Connection } from 'typeorm';

import { LobbyEvent } from '../../../core/lib/lobby/events';
import { Lobby } from '../../../core/types/Lobby';
import { Service } from '../../../utils/ServiceLocator';
import { LobbyEntity } from '../../entities/LobbyEntity';
import { LobbyEventEntity } from '../../entities/LobbyEventEntity';

@Service()
export class LobbyRepository {
  constructor(private readonly conn: Connection) {}

  public async createLobby(
    lobby: Lobby,
    lobbyCreationEvent: LobbyEvent,
  ): Promise<LobbyEntity> {
    return this.conn.transaction(async (entityManager) => {
      const lobbyTable = entityManager.getRepository(LobbyEntity);
      const lobbyEventTable = entityManager.getRepository(LobbyEventEntity);

      const lobbyEntity = await lobbyTable.save({
        id: lobby.id,
        version: lobby.version,
        cache: lobby,
      });
      lobby.id = lobbyEntity.id;
      await lobbyEventTable.save({
        lobbyId: lobbyEntity.id,
        id: lobbyCreationEvent.id,
        eventName: lobbyCreationEvent.name,
        eventPayload: lobbyCreationEvent.payload,
      });

      return lobbyEntity;
    });
  }

  public async saveLobbyEvent(
    lobby: Lobby,
    lobbyEvent: LobbyEvent,
  ): Promise<LobbyEntity> {
    return this.conn.transaction(async (entityManager) => {
      const lobbyTable = entityManager.getRepository(LobbyEntity);
      const lobbyEventTable = entityManager.getRepository(LobbyEventEntity);

      await lobbyEventTable.save({
        lobbyId: lobby.id,
        id: lobbyEvent.id,
        eventName: lobbyEvent.name,
        eventPayload: lobbyEvent.payload,
      });

      return lobbyTable.save({
        id: lobby.id,
        version: lobby.version,
        cache: lobby,
      });
    });
  }

  public async getLobbyById(id: string): Promise<LobbyEntity | undefined> {
    const lobbyTable = this.conn.getRepository(LobbyEntity);
    return lobbyTable.findOne({ id });
  }
}
