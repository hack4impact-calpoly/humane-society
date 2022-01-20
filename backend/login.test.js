const signup = require('./login');

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
        // await db.close();
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
        await users.insertOne(mockUser); // find one
        const insertedUser = await users.findOne({ email: "test@gmail.com" }); // use login here
        expect(insertedUser.password).toEqual(mockUser.password)
    });
});