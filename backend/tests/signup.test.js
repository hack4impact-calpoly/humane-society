/* eslint-disable no-undef */
const express = require('express');
const request = require('supertest');

const app = express();
const { MongoClient } = require('mongodb');
require('dotenv').config();

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
      phone: '1523329876',
      email: 'test@gmail.com',
      password: '1234',
      isStudent: true,
      studentSchool: 'Cal Poly',
      isAdmin: false,
    };
    await request(app).post('/signup').send(mockUser);
    const insertedUser = await users.findOne({ userID: 1 });
    expect(insertedUser.email).toEqual(mockUser.email);
    expect(insertedUser.phone).toEqual(mockUser.phone);
    expect(insertedUser.firstName).toEqual(mockUser.firstName);
    expect(insertedUser.lastName).toEqual(mockUser.lastName);
    expect(insertedUser.isStudent).toBe(mockUser.isStudent);
    expect(insertedUser.studentSchool).toEqual(mockUser.studentSchool);
    expect(insertedUser.isAdmin).toBe(mockUser.isAdmin);

    // delete user in db here
  });
});
