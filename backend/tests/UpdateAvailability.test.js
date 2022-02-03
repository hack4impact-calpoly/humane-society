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
        const availabilities = db.collection('avail');
        const mockAvailability = {
            day: "2020-03-09T22:18:26.625Z",
            times: [],
            userID: 20
            
        };
        console.log("about to call")

        await request(app).post('/availability/newAvailability').send(mockAvailability);
        const insertedUser = await availabilities.findOne({ userID: 20 });
        expect(insertedUser.day).toEqual(mockAvailability.day);
        expect(insertedUser.times).toEqual(mockAvailability.times);
        expect(insertedUser.userID).toEqual(mockAvailability.userID);

        // delete availability in db here
    });
});
