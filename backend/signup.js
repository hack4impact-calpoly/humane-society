const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
require('dotenv').config()

const User = require('./models/user.js');

router.post('/email-taken', async (req, res) => {
    const { email } = req.body
    let user = User;

    user.findOne({ 'email': email }).then(function (result) {
        if (result) {
            console.log("email in use")
            res.status(404).send("email in use")
        }
        else {
            res.status(200).send("valid")
        }
    });
});

router.post('/', async (req, res) => {
    const { firstName, lastName, email } = req.body
    const password = bcrypt.hashSync(req.body.password, 9); // creates password hash

    let user = User;
    console.log(user)

    user.findOne({ 'email': email }).then(function (result) {
        if (result) {
            console.log("email already in use")
            res.status(404).send("email already in use")
        }
        else {
            var doc;
            var userID = '_' + Math.random().toString(36).substr(2, 9); // random ID
            doc = new userType({
                userID, firstName, lastName, email, password
            })

            doc.save()
            console.log("user added")
            res.status(200).send("success")
        }
    }).catch(err => {
        console.log(err)
        res.send(500).send("error")
    })
});

module.exports = router;