import { v4 as uuid } from 'uuid';

export function generateLobbyCode(): string {
  return uuid();
}
