import { CoreError } from './base/CoreError';

export class UserAlreadyInLobbyError extends CoreError {
  constructor(public readonly lobbyId: number) {
    super('User already part of a lobby');
  }
}
