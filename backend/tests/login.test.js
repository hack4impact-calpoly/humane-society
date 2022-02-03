/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const request = require('supertest');
const express = require('express');
require('dotenv').config();

const app = express();
const { MongoClient } = require('mongodb');

describe('insert', () => {
  let connection;
  let db;
  beforeAll(async () => {
    connection = await MongoClient.connect(`mongodb+srv://${process.env.ADMIN_USERNAME}:${process.env.ADMIN_PASSWORD}@cluster0.szxqh.mongodb.net/Test?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
    });
    db = await connection.db('Test');
  });
  afterAll(async () => {
    await connection.close();
  });
  it('should insert a doc into collection', async () => {
    const users = db.collection('test');
    const mockUser = {
      userID: 1,
      firstName: 'Sage',
      lastName: 'Meadows',
      userName: 'noximus',
      email: 'test@gmail.com',
      password: '1234',
    };
    await users.insertOne(mockUser);
    const insertedUser = request(app).get('/login').send({ userName: 'noximus', email: 'test@gmail.com', password: '1234' });
    expect(insertedUser._data.password).toEqual(mockUser.password);
  });
});
