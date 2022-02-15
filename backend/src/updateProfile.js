const express = require('express');

const router = express.Router();
require('dotenv').config();

const User = require('../models/user');

router.put('/', async (req, res) => {
    const { userID } = req.userID;
    const newPhoneNumber = req.body.phoneNumber;
    const newFirstName = req.body.firstName;
    const newLastName = req.body.lastName;
    const newEmail = req.body.email;

    const user = User;
    console.log('Updating profile...');

    user.findOneAndUpdate({ userID }, { phoneNumber:  newPhoneNumber })
        .then(() => {
            console.log('update successful');
            res.status(200).send('success');
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('error');
        });

    user.findOneAndUpdate({ userID }, { firstName: newFirstName })
        .then(() => {
            console.log('update successful');
            res.status(200).send('success');
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('error');
        });

    user.findOneAndUpdate({ userID }, { lastName: newLastName })
        .then(() => {
            console.log('update successful');
            res.status(200).send('success');
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('error');
        });

    user.findOneAndUpdate({ userID }, { email: newEmail })
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
