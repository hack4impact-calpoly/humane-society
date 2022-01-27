const request = require('supertest');
const express = require('express');
require('dotenv').config();

const app = express();
const { MongoClient } = require('mongodb');

describe('insert', () => {
  let connection;
  let db;
  beforeAll(async () => {
    connection = await MongoClient.connect(`mongodb+srv://${process.env.ADMIN_USERNAME}:${process.env.ADMIN_PASSWORD}@cluster0.szxqh.mongodb.net/Users?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
    });
    db = await connection.db('Users');
  });
  
});