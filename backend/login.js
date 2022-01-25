const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const { Token, makeToken } = require("./token.js")
require('dotenv').config()

const User = require('./models/user.js');


router.post('/', async (req, res) => {
    const { user, email, password } = req.body

    let userObj = User;
    console.log("logging in...")

    userObj.findOne({ 'email': email }).then(function (result) {
        if (!result) {
            console.log("Invalid email")
            res.status(404).send("Invalid email")
        }
        else {

            if (bcrypt.compareSync(password, result.password)) // compare password
            {
                console.log("logged in")
                // prepare login data
                let { userID } = result
                console.log(userID)
                let data = {
                    email: email,
                    user: user,
                    userID: userID
                }
                // make login token
                let token = makeToken(data)
                result['token'] = token
                res.send({ result, token })
                res.status(200).send("valid")

            }
            else {
                res.status(404).send("Invalid email/password")
            }
        }
    })
});

module.exports = router;