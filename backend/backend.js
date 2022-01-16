const mongoose = require('mongoose');
require('dotenv').config()

function makeNewConnection(uri) {
    const db = mongoose.createConnection(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    db.on('error', function (error) {
        console.log(`MongoDB :: connection ${this.name} ${JSON.stringify(error)}`);
        db.close().catch(() => console.log(`MongoDB :: failed to close connection ${this.name}`));
    });

    db.on('connected', function () {
        console.log(`MongoDB :: connected ${this.name}`);
    });

    db.on('disconnected', function () {
        console.log(`MongoDB :: disconnected ${this.name}`);
    });

    return db;
}
const userURL = `mongodb+srv://h4iadmin:WoodsSociety@cluster0.szxqh.mongodb.net/Users?retryWrites=true&w=majority`;
const userConnection = makeNewConnection(userURL);


module.exports = {
    userConnection,
};