const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
const { Token, makeToken } = require('../token');
require('dotenv').config();

const User = require('../models/user');

router.post('/', async (req, res) => {
  const { user, email, password } = req.body;

  const userObj = User;
  console.log('logging in...');

  userObj.findOne({ email }).then((result) => {
    if (!result) {
      console.log('Invalid email');
      res.status(404).send('Invalid email');
    } else if (bcrypt.compareSync(password, result.password)) // compare password
    {
      console.log('logged in');
      // prepare login data
      const { userID } = result;
      console.log(userID);
      const data = {
        email,
        user,
        userID,
      };
      // make login token
      const token = makeToken(data);
      result.token = token;
      res.send({ result, token });
      res.status(200).send('valid');
    } else {
      res.status(404).send('Invalid email/password');
    }
  });
});

module.exports = router;
