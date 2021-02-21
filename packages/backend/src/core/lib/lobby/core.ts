import { LobbyRepository } from '../../../model/repositories/lobby';
import { Service } from '../../../utils/ServiceLocator';
import { Lobby } from '../../types/Lobby';
import { User } from '../../types/User';

import * as LobbyEventCreation from './events/lobbyCreation';
import * as LobbyEventJoin from './events/lobbyJoin';
import * as LobbyEventLeave from './events/lobbyLeave';

@Service()
export class LobbyCore {
  constructor(private readonly lobbyRepository: LobbyRepository) {}

  public async createLobby(user: User) {
    const {
      creator,
      lobby,
      lobbyCreationEvent,
    } = LobbyEventCreation.createEvent(user);
    await this.lobbyRepository.createLobby(lobby, lobbyCreationEvent);
    return { creator, lobby };
  }

  public async findLobbyById(lobbyId: number): Promise<Lobby | undefined> {
    const lobbyEntity = await this.lobbyRepository.getLobbyById(lobbyId);
    if (!lobbyEntity) {
      return undefined;
    }
    // The cache id may be invalid after the first insert so we manually
    // ensure its consistency
    lobbyEntity.cache.id = lobbyEntity.id;
    return lobbyEntity.cache;
  }

  public async findLobbyByCode(lobbyCode: string): Promise<Lobby | undefined> {
    const lobbyEntity = await this.lobbyRepository.getLobbyByCode(lobbyCode);
    if (!lobbyEntity) {
      return undefined;
    }
    // The cache id may be invalid after the first insert so we manually
    // ensure its consistency
    lobbyEntity.cache.id = lobbyEntity.id;
    return lobbyEntity.cache;
  }

  public async joinLobby(lobby: Lobby, user: User) {
    const {
      joiningUser,
      lobby: updatedLobby,
      lobbyJoinEvent,
    } = LobbyEventJoin.createEvent(lobby, user);
    await this.lobbyRepository.saveLobbyEvent(lobby, lobbyJoinEvent);
    return { joiningUser, lobby: updatedLobby };
  }

  public async leaveLobby(lobby: Lobby, user: User) {
    const {
      leavingUser,
      lobby: updatedLobby,
      lobbyLeaveEvent,
    } = LobbyEventLeave.createEvent(lobby, user);
    await this.lobbyRepository.saveLobbyEvent(updatedLobby, lobbyLeaveEvent);
    return { leavingUser, lobby: updatedLobby };
  }
}
