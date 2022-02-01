const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/user');

router.put('/', async (req, res) => {
  const { email } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const newPassword = bcrypt.hashSync(req.body.password, salt);

  const user = User;
  console.log('Updating password...');
  const update = { password: newPassword };

  user.findOneAndUpdate({ email }, update)
    .then(() => {
      console.log('password update successful');
      res.status(200).send('success');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('error');
    });
});

module.exports = router;
