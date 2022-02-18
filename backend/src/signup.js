const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/user');

router.post('/email-taken', async (req, res) => {
  const { email } = req.body;
  const user = User;

  user.findOne({ email }).then((result) => {
    if (result) {
      console.log('email in use');
      res.status(404).send('email in use');
    } else {
      res.status(200).send('valid');
    }
  });
});

router.post('/', async (req, res) => {
  const {
    firstName, lastName, phone, email, isStudent, isAdmin, studentSchool,
  } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const password = bcrypt.hashSync(req.body.password, salt); // creates password hash

  const user = User;
  console.log(user);
  console.log(email);
  user.findOne({ email }).then((result) => {
    if (result) {
      console.log('email already in use');
      res.status(404).send('email already in use');
    } else {
      const userID = `_${Math.random().toString(36).substr(2, 9)}`; // random ID
      const doc = new User({
        userID, firstName, lastName, email, phone, password, isStudent, studentSchool, isAdmin,
      });

      doc.save();
      console.log('user added');
      res.status(200).send('success');
    }
  }).catch((err) => {
    console.log(err);
    res.status(500).send('error');
  });
});

module.exports = router;
