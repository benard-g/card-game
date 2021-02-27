import { CoreError } from './base/CoreError';

export class LobbyEventUnknown extends CoreError {
  constructor(public readonly eventName: string) {
    super('LobbyEvent name not supported');
  }
}
