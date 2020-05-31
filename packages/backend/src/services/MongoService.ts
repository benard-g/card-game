import Mongodb from 'mongodb';

import { MongoConfig } from '../config/services/MongoConfig';

import { ResourcefulService } from './Service';

export class MongoService extends ResourcefulService {
  public static NAME = 'mongodb';

  private mongoClient: Mongodb.MongoClient | undefined;

  constructor(private readonly config: MongoConfig) {
    super();
    this.mongoClient = undefined;
  }

  public async start(): Promise<boolean> {
    if (this.mongoClient) {
      return false;
    }

    this.mongoClient = await Mongodb.connect(this.config.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    return true;
  }

  public async stop(): Promise<boolean> {
    if (!this.mongoClient) {
      return false;
    }

    await this.mongoClient.close(true);
    this.mongoClient = undefined;

    return true;
  }

  public get client(): Mongodb.MongoClient {
    if (!this.mongoClient) {
      throw new Error('The client is not started');
    }
    return this.mongoClient;
  }
}
