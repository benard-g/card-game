import * as LobbyCreation from './lobbyCreation';
import * as LobbyJoin from './lobbyJoin';
import * as LobbyLeave from './lobbyLeave';

export type LobbyEvent =
  | LobbyCreation.LobbyEvent
  | LobbyJoin.LobbyEvent
  | LobbyLeave.LobbyEvent;
