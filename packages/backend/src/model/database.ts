import { Connection, createConnection } from 'typeorm';

import { LobbyEntity } from './entities/LobbyEntity';
import { LobbyEventEntity } from './entities/LobbyEventEntity';

interface Options {
  databaseUri: string;
}

export async function createDatabaseConnection(
  options: Options,
): Promise<Connection> {
  const { databaseUri } = options;
  return createConnection({
    type: 'postgres',
    url: databaseUri,
    synchronize: false,
    logging: false,
    entities: [LobbyEntity, LobbyEventEntity],
  });
}
