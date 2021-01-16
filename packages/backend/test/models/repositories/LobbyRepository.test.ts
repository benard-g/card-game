import { LobbyEntity } from '../../../src/model/entities/LobbyEntity';
import {
  DuplicateLobbyError,
  LobbyRepository,
} from '../../../src/model/repositories/LobbyRepository';
import { conn } from '../../__utils__/dbConnection';

let lobbyRepository: LobbyRepository;

beforeEach(async () => {
  lobbyRepository = new LobbyRepository(conn);
  await conn.getRepository(LobbyEntity).clear();
});

describe('#createLobby', () => {
  it('should correctly create a Lobby', async () => {
    const createdLobby = await lobbyRepository.createLobby({
      code: 'ABCDEF',
    });

    const lobbiesInDb = await conn.getRepository(LobbyEntity).find({});

    expect(createdLobby).toEqual({
      id: expect.any(Number),
      code: 'ABCDEF',
      updatedAt: expect.any(Date),
    });
    expect(lobbiesInDb).toEqual([
      {
        id: expect.any(Number),
        code: 'ABCDEF',
        updatedAt: expect.any(Date),
      },
    ]);
  });

  it('should throw a DuplicateLobbyError if the code already exists', async () => {
    await lobbyRepository.createLobby({
      code: 'ABCDEF',
    });

    const promise = lobbyRepository.createLobby({
      code: 'ABCDEF',
    });

    await expect(promise).rejects.toThrowError(new DuplicateLobbyError());

    const lobbiesInDb = await conn.getRepository(LobbyEntity).find({});
    expect(lobbiesInDb).toEqual([
      {
        id: expect.any(Number),
        code: 'ABCDEF',
        updatedAt: expect.any(Date),
      },
    ]);
  });

  it('should not throw a DuplicateLobbyError if the error is elsewhere', async () => {
    // Forcing 'null' to violate NON_NULL constraint
    const promise = lobbyRepository.createLobby(({
      code: null,
    } as unknown) as LobbyEntity);

    await expect(promise).rejects.not.toThrowError(new DuplicateLobbyError());

    const lobbiesInDb = await conn.getRepository(LobbyEntity).find({});
    expect(lobbiesInDb).toEqual([]);
  });
});

describe('#getLobbyById', () => {
  let insertedId: number;

  beforeEach(async () => {
    const lobby = await conn.getRepository(LobbyEntity).save({
      code: 'ABCDEF',
    });
    insertedId = lobby.id;
  });

  it('should return the lobby with the provided "id"', async () => {
    const lobby = await lobbyRepository.getLobbyById(insertedId);

    expect(lobby).toEqual({
      id: insertedId,
      code: 'ABCDEF',
      updatedAt: expect.any(Date),
    });
  });

  it('should return nothing when there are no matches', async () => {
    const lobby = await lobbyRepository.getLobbyById(insertedId + 1000);

    expect(lobby).toBeUndefined();
  });
});
