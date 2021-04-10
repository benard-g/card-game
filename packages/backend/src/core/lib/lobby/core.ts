import { LobbyRepository } from '../../../model/repositories/lobby';
import { Service } from '../../../utils/ServiceLocator';
import { Lobby } from '../../types/Lobby';
import { User } from '../../types/User';

import * as LobbyCreationEvent from './events/lobbyCreation';
import * as LobbyJoinEvent from './events/lobbyJoin';
import * as LobbyLeaveEvent from './events/lobbyLeave';

@Service()
export class LobbyCore {
  constructor(private readonly lobbyRepository: LobbyRepository) {}

  public async createLobby(user: User, userName: string) {
    const {
      creatingUser,
      lobbyCreationEvent,
      createdLobby,
    } = LobbyCreationEvent.executeEvent(user, userName);
    await this.lobbyRepository.createLobby(createdLobby, lobbyCreationEvent);
    return { creatingUser, lobbyCreationEvent, createdLobby };
  }

  public async findLobbyById(lobbyId: string): Promise<Lobby | undefined> {
    const lobbyEntity = await this.lobbyRepository.getLobbyById(lobbyId);
    if (!lobbyEntity) {
      return undefined;
    }
    return lobbyEntity.cache;
  }

  public async joinLobby(lobby: Lobby, user: User, userName: string) {
    const {
      joiningUser,
      lobbyJoinEvent,
      updatedLobby,
    } = LobbyJoinEvent.executeEvent(lobby, user, userName);
    await this.lobbyRepository.saveLobbyEvent(lobby, lobbyJoinEvent);
    return { joiningUser, lobbyJoinEvent, updatedLobby };
  }

  public async leaveLobby(lobby: Lobby, user: User) {
    const {
      leavingUser,
      updatedLobby,
      lobbyLeaveEvent,
    } = LobbyLeaveEvent.executeEvent(lobby, user);
    await this.lobbyRepository.saveLobbyEvent(updatedLobby, lobbyLeaveEvent);
    return { leavingUser, lobbyLeaveEvent, updatedLobby };
  }
}
