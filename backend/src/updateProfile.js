/* eslint-disable no-console */

const express = require('express');
const { emit } = require('process');

const { Auth } = 'aws-amplify';

const router = express.Router();
require('dotenv').config();
const { Token } = require("../token.js");

const User = require('../models/user');

router.post('/', async (req, res) => {
    const {
        token, userID, phone, firstName, lastName, email,
    } = req.body;
    let userData = Token(token)
    if (userData == null) {
        res.status(403).send("Unauthorized user")
        return
    }
    const user = User;
    console.log('Updating profile...');
    console.log(userID);
    console.log(firstName);
    user.findOneAndUpdate({ userID }, {
        phone,
        firstName,
        lastName,
        email,
    })
        .then(() => {
            console.log('update successful');
            res.status(200).send('success');
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('error');
        });
    /* update other attributes */
    /* update email in aws cognito + email verification */
    // {bypassCache: true}
    // NOTE: Come back once user auth is fully integrated
    /* const awsUser = await Auth.currentAuthenticatedUser().then(() => {
          await Auth.updateUserAttributes(awsUser, {
              'phone': phone, 'firstName': firstName, 'lastName': lastName
          })
          console.log('update successful');
          res.status(200).send('success');
      })
          .catch((err) => {
              console.log(err);
              res.status(500).send('error');
          });
      */
});

module.exports = router;
