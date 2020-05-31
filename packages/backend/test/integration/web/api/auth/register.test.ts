import Mongodb, { ObjectId } from 'mongodb';
import request from 'supertest';

import { UserModel } from '../../../../../src/models/UserModel';

import { createWebProcess } from '../../../../__utils__/createWebProcess';
import { createMongoService } from '../../../../__utils__/mongo';
import usersFixtures from '../../../../__fixtures__/users.fixtures';

describe('web/api/auth/register', () => {
  const [app, webProcess] = createWebProcess();

  const mongoService = createMongoService();
  let userCollection: Mongodb.Collection;

  beforeAll(async () => {
    await mongoService.start();
    userCollection = mongoService.client.db().collection(UserModel.COLLECTION);

    await webProcess.start();
  });

  beforeEach(async () => {
    userCollection.deleteMany({});
  });

  afterAll(async () => {
    await mongoService.stop();
    await webProcess.stop();
  });

  it('should create a new User', async () => {
    const res = await request(app)
      .post('/api/auth/local/register')
      .send(usersFixtures.userCreationPayloads.anna);

    const userInDb = await userCollection.find({}).toArray();

    expect(res.status).toBe(201);
    expect(res.text).toEqual('User created');

    expect(userInDb).toEqual([
      {
        _id: expect.any(ObjectId),
        pseudo: 'Anna',
        cipheredPassword: expect.any(String),
      },
    ]);
  });

  it('should create several users without conflicts', async () => {
    const res1 = await request(app)
      .post('/api/auth/local/register')
      .send(usersFixtures.userCreationPayloads.anna);
    const res2 = await request(app)
      .post('/api/auth/local/register')
      .send(usersFixtures.userCreationPayloads.billy);

    const userInDb = await userCollection.find({}).toArray();

    expect(res1.status).toBe(201);
    expect(res1.text).toEqual('User created');
    expect(res2.status).toBe(201);
    expect(res2.text).toEqual('User created');

    expect(userInDb).toEqual([
      {
        _id: expect.any(ObjectId),
        pseudo: 'Anna',
        cipheredPassword: expect.any(String),
      },
      {
        _id: expect.any(ObjectId),
        pseudo: 'Billy',
        cipheredPassword: expect.any(String),
      },
    ]);
  });

  it('should not allow the creation if the user already exists', async () => {
    await userCollection.insertOne(usersFixtures.users.anna);

    const res = await request(app)
      .post('/api/auth/local/register')
      .send(usersFixtures.userCreationPayloads.anna);

    const userInDb = await userCollection.find({}).toArray();

    expect(res.status).toBe(409);

    expect(userInDb).toEqual([
      {
        _id: expect.any(ObjectId),
        pseudo: 'Anna',
        cipheredPassword: expect.any(String),
      },
    ]);
  });

  it('should return 400 when invalid request bodies are provided', async () => {
    // No body
    const res1 = await request(app).post('/api/auth/local/register');

    // Empty body
    const res2 = await request(app).post('/api/auth/local/register').send({});

    // Missing password
    const res3 = await request(app).post('/api/auth/local/register').send({
      pseudo: 'Anna',
    });

    // Missing pseudo
    const res4 = await request(app).post('/api/auth/local/register').send({
      password: '123PASSword',
    });

    // Pseudo too short
    const res5 = await request(app).post('/api/auth/local/register').send({
      pseudo: 'A',
      password: '123PASSword',
    });

    // Pseudo too long
    const res6 = await request(app).post('/api/auth/local/register').send({
      pseudo: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      password: '123PASSword',
    });

    // Password too short
    const res7 = await request(app).post('/api/auth/local/register').send({
      pseudo: 'Anna',
      password: 'lol',
    });

    const userInDb = await userCollection.find({}).toArray();

    expect(res1.status).toBe(400);
    expect(res2.status).toBe(400);
    expect(res3.status).toBe(400);
    expect(res4.status).toBe(400);
    expect(res5.status).toBe(400);
    expect(res6.status).toBe(400);
    expect(res7.status).toBe(400);

    expect(userInDb).toEqual([]);
  });

  it('should return 500 when other errors occur', async () => {
    await webProcess.stop();

    const res = await request(app)
      .post('/api/auth/local/register')
      .send(usersFixtures.userCreationPayloads.anna);

    const userInDb = await userCollection.find({}).toArray();

    expect(res.status).toBe(500);

    expect(userInDb).toEqual([]);
  });
});
