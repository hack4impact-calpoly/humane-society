/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require('express');
const request = require('supertest');
require('dotenv').config();

const app = express();
const { MongoClient } = require('mongodb');
const { deleteOne } = require('../models/user');
const { doesNotMatch } = require('assert');

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
      firstName: 'Namey',
      lastName: 'McNamerson',
      userName: 'MrName',
      email: 'test1@gmail.com',
      password: '12345',
    },
    {
      userId: 2,
      firstName: 'Cole',
      lastName: 'Morrison',
      userName: 'colem18',
      email: 'test2@gmail.com',
      password: 'password',
    }];
    
    const allUsers = await request(app).get('/getUsers/getAllUsers');

    expect(allUsers.length).toEqual(expectedAllUsers.length);

    expect(allUsers[0].userID).toEqual(expectedAllUsers[0].userId);
    expect(allUsers[0].firstName).toEqual(expectedAllUsers[0].firstName);
    expect(allUsers[0].lastName).toEqual(expectedAllUsers[0].lastName);
    expect(allUsers[0].userName).toEqual(expectedAllUsers[0].userName);
    expect(allUsers[0].email).toEqual(expectedAllUsers[0].email);
    expect(allUsers[0].password).toEqual(expectedAllUsers[0].password);

    expect(allUsers[1].userID).toEqual(expectedAllUsers[1].userId);
    expect(allUsers[1].firstName).toEqual(expectedAllUsers[0].firstName);
    expect(allUsers[1].lastName).toEqual(expectedAllUsers[0].lastName);
    expect(allUsers[1].userName).toEqual(expectedAllUsers[0].userName);
    expect(allUsers[1].email).toEqual(expectedAllUsers[0].email);
    expect(allUsers[1].password).toEqual(expectedAllUsers[0].password);

    done();
  });

  // This test corresponds to the "/getUserById/:userId" endpoint
  /*it('get user by userId test', async () => {
    const users = db.collection('test');
    const expectedUserId = 2;
    const expectedTestUser = {
      userId: 2,
      firstName: 'Namey',
      lastName: 'McNamerson',
      userName: 'MrName',
      email: 'test1@gmail.com',
      password: '12345',
    };

    const res = await request(app).get(`/getUsers/getUserById?=${expectedUserId}`);
    const testUser = res.json;

    expect(testUser.userID).toEqual(expectedTestUser.userId);
    expect(testUser.firstName).toEqual(expectedTestUser.firstName);
    expect(testUser.lastName).toEqual(expectedTestUser.lastName);
    expect(testUser.userName).toEqual(expectedTestUser.userName);
    expect(testUser.email).toEqual(expectedTestUser.email);
    expect(testUser.password).toEqual(expectedTestUser.password);

    done();
  });*/
});
