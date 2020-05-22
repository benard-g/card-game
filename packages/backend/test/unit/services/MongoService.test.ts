import Mongodb from 'mongodb';

import { MongoService } from '../../../src/services/MongoService';

import configFixtures from '../../__fixtures__/config.fixtures';

describe('MongoService', () => {
  const mongoCloseMock = jest.fn().mockResolvedValue(undefined);
  const mongoConnectMock = jest
    .spyOn(Mongodb, 'connect')
    .mockImplementation(async () => ({
      close: mongoCloseMock,
    }));

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should start and close properly', async () => {
    const mongoService = new MongoService(configFixtures.config.services.mongo);

    const startStatus = await mongoService.start();
    mongoService.client; // should not throw
    const stopStatus = await mongoService.stop();

    expect(startStatus).toBe(true);
    expect(stopStatus).toBe(true);

    expect(mongoConnectMock.mock.calls).toEqual([
      [
        'mongodb://localhost:27017/cardgame',
        { useNewUrlParser: true, useUnifiedTopology: true },
      ],
    ]);
    expect(mongoCloseMock.mock.calls).toEqual([[true]]);
  });

  it('should throw if trying to access the client before starting', () => {
    const mongoService = new MongoService(configFixtures.config.services.mongo);

    expect(() => {
      mongoService.client;
    }).toThrowError(new Error('The client is not started'));
  });

  it('should warn if trying to stop without starting', async () => {
    const mongoService = new MongoService(configFixtures.config.services.mongo);

    const stopStatus = await mongoService.stop();

    expect(stopStatus).toBe(false);
  });

  it('should warn if trying to stop two times', async () => {
    const mongoService = new MongoService(configFixtures.config.services.mongo);

    const startStatus = await mongoService.start();
    const stopStatus1 = await mongoService.stop();
    const stopStatus2 = await mongoService.stop();

    expect(startStatus).toBe(true);
    expect(stopStatus1).toBe(true);
    expect(stopStatus2).toBe(false);
  });

  it('should warn if trying to start two times', async () => {
    const mongoService = new MongoService(configFixtures.config.services.mongo);

    const startStatus1 = await mongoService.start();
    const startStatus2 = await mongoService.start();
    const stopStatus = await mongoService.stop();

    expect(startStatus1).toBe(true);
    expect(startStatus2).toBe(false);
    expect(stopStatus).toBe(true);
  });
});
