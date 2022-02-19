/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require('express');
const request = require('supertest');
require('dotenv').config();

const app = express();
const { MongoClient } = require('mongodb');
// const { doesNotMatch } = require('assert');
// const { deleteOne } = require('../models/user');

// This set of tests check the endpoints that get users from the database
describe('get user endpoints', () => {
  let db;
  let connection;

  // Establishes a connection for the testing at the beginning
  beforeAll(async () => {
    connection = await MongoClient.connect(`mongodb+srv://${process.env.ADMIN_USERNAME}:${process.env.ADMIN_PASSWORD}@cluster0.szxqh.mongodb.net/Users?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
    });
    db = await connection.db('Test');
  });

  // Closes the connection after the tests are all done
  afterAll(async () => {
    await connection.close();
  });

  // This test corresponds to the "/getAllUsers" endpoint
  it('get all users test', async () => {
    const users = db.collection('users');
    const expectedAllUsers = [{
      userId: '1',
      firstName: 'Namey',
      lastName: 'McNamerson',
      userName: 'MrName',
      email: 'test1@gmail.com',
      password: '12345',
    },
    {
      userId: '2',
      firstName: 'Cole',
      lastName: 'Morrison',
      userName: 'colem18',
      email: 'test2@gmail.com',
      password: 'password',
    }];
    // add both users
    await users.insertOne({
      userId: '1',
      firstName: 'Namey',
      lastName: 'McNamerson',
      userName: 'MrName',
      email: 'test1@gmail.com',
      password: '12345',
    });

    await users.insertOne({
      userId: '2',
      firstName: 'Cole',
      lastName: 'Morrison',
      userName: 'colem18',
      email: 'test2@gmail.com',
      password: 'password',
    });

    const allUsers = await (await request(app).get('/getUsers/getAllUsers')).send();
    console.log(allUsers);
    //   // expect(allUsers.length).toEqual(expectedAllUsers.length);

    //   expect(allUsers[0].userID).toEqual(expectedAllUsers[0].userId);
    //   expect(allUsers[0].firstName).toEqual(expectedAllUsers[0].firstName);
    //   expect(allUsers[0].lastName).toEqual(expectedAllUsers[0].lastName);
    //   expect(allUsers[0].userName).toEqual(expectedAllUsers[0].userName);
    //   expect(allUsers[0].email).toEqual(expectedAllUsers[0].email);
    //   expect(allUsers[0].password).toEqual(expectedAllUsers[0].password);

    //   expect(allUsers[1].userID).toEqual(expectedAllUsers[1].userId);
    //   expect(allUsers[1].firstName).toEqual(expectedAllUsers[0].firstName);
    //   expect(allUsers[1].lastName).toEqual(expectedAllUsers[0].lastName);
    //   expect(allUsers[1].userName).toEqual(expectedAllUsers[0].userName);
    //   expect(allUsers[1].email).toEqual(expectedAllUsers[0].email);
    //   expect(allUsers[1].password).toEqual(expectedAllUsers[0].password);
  });

  // This test corresponds to the "/getUserById/:userId" endpoint
  it('get user by userId test', async () => {
    const expectedTestUser = {
      userId: '1',
      firstName: 'Namey',
      lastName: 'McNamerson',
      userName: 'MrName',
      email: 'test1@gmail.com',
      password: '12345',
    };
    const insertedUser = await request(app).get('/getUsers/getUserById').send({ id: '1' });
    console.log(insertedUser);
    expect(insertedUser._data.userID).toEqual(expectedTestUser.userId);
    expect(insertedUser._data.firstName).toEqual(expectedTestUser.firstName);
    expect(insertedUser._data.lastName).toEqual(expectedTestUser.lastName);
    expect(insertedUser._data.userName).toEqual(expectedTestUser.userName);
    expect(insertedUser._data.email).toEqual(expectedTestUser.email);
    expect(insertedUser._data.password).toEqual(expectedTestUser.password);

    done();
  });
});
