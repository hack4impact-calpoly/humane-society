/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require('express');
const request = require('supertest');
require('dotenv').config();

const app = express();
const { MongoClient } = require('mongodb');

// This set of tests check the endpoints that get users from the database
describe('get user endpoints', () => {
  let db;
  let connection;

  // Establishes a connection for the testing at the beginning
  beforeAll(async () => {
    connection = await MongoClient.connect(`mongodb+srv://${process.env.ADMIN_USERNAME}:${process.env.ADMIN_PASSWORD}@cluster0.szxqh.mongodb.net/Users?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
    });
    db = await connection.db('test');
  });

  // Closes the connection after the tests are all done
  afterAll(async () => {
    await connection.close();
  });

  // This test corresponds to the "/getAllUsers" endpoint
  it('get all users test', async () => {
    const users = db.collection('test');
    const expectedAllUsers = [{
      userId: 1,
      firstName: 'Sage',
      lastName: 'Meadows',
      userName: 'noximus',
      email: 'test@gmail.com',
      password: '1234',
    },
    {
      userId: 2,
      firstName: 'Cole',
      lastName: 'Morrison',
      userName: 'colem18',
      email: 'test2@gmail.com',
      password: 'password',
    }];

    const allUsers = await request(app).get('/getAllUsers');

    expect(allUsers).toBe(expectedAllUsers);

    done();
  });

  // This test corresponds to the "/getUserById/:userId" endpoint
  it('get user by userId test', async () => {
    const users = db.collection('test');
    const expectedUserId = 2;
    const expectedTestUser = {
      userId: 2,
      firstName: 'Cole',
      lastName: 'Morrison',
      userName: 'colem18',
      email: 'test2@gmail.com',
      password: 'password',
    };

    const testUser = await request(app).get(`/getUserById/${expectedUserId}`);

    expect(testUser.userID).toEqual(expectedTestUser.userId);
    expect(testUser.firstName).toEqual(expectedTestUser.firstName);
    expect(testUser.lastName).toEqual(expectedTestUser.lastName);
    expect(testUser.userName).toEqual(expectedTestUser.userName);
    expect(testUser.email).toEqual(expectedTestUser.email);
    expect(testUser.password).toEqual(expectedTestUser.password);

    done();
  });
});
