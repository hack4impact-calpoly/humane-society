var request = require('supertest');
const express = require('express');
const app = express();

const { MongoClient } = require('mongodb');

describe('insert', () => {
    let connection;
    let db;
    beforeAll(async () => {
        connection = await MongoClient.connect(`mongodb+srv://h4iadmin:WoodsSociety@cluster0.szxqh.mongodb.net/Users?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
        });
        db = await connection.db(`Users`);
    });
    afterAll(async () => {
        await connection.close();
    });
    it('should insert a doc into collection', async () => {
        const users = db.collection('users');
        const mockUser = {
            "userID": 1,
            "firstName": "Sage",
            "lastName": "Meadows",
            "userName": "noximus",
            "email": "test@gmail.com",
            "password": "1234"
        };
        await users.insertOne(mockUser);
        const insertedUser = request(app).get('/login').send({ userName: "noximus", email: "test@gmail.com", password: "1234" })
        expect(insertedUser._data.password).toEqual(mockUser.password)
    });
});