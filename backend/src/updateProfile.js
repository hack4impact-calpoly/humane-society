const express = require('express');
const { emit } = require('process');

const router = express.Router();
require('dotenv').config();

const User = require('../models/user');

router.post('/', async (req, res) => {
    const { userID, phone, firstName, lastName, email }  = req.body;

    const user = User;
    console.log('Updating profile...');
    console.log(userID)
    console.log(firstName)
    user.findOneAndUpdate({ userID }, {
        phone: phone, firstName: firstName,
        lastName: lastName, email: email
    })
        .then(() => {
            console.log('update successful');
            res.status(200).send('success');
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('error');
        });

    /* update email in aws cognito + email verification */

});

module.exports = router;
