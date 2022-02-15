/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
const express = require('express');

const router = express.Router();
require('dotenv').config();

const User = require('../models/user');

router.get('/getAllUsers', async (req, res) => {
  User.find().then((result) => {
    if (!result) {
      res.status(404).send('No Users Found');
    } else {
      res.status(200).send(result);
    }
  });
});

router.get('/getUserById', async (req, res) => {
  const { id } = req.body;

  User.findOne({ userID: id }).then((result) => {
    if (!result) {
      res.status(404).send('Invalid User ID');
    } else {
      res.status(200).send(result);
    }
  });
});

module.exports = router;
