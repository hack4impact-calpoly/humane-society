/* eslint-disable no-param-reassign */
const express = require('express');

const router = express.Router();
require('dotenv').config();

const User = require('../models/user');

router.get('/getAllUsers', async (req, res) => {
    const allUsers = await User.find({});
    res.json(allUsers);
  });
  
  router.get('/getUserById', async (req, res) => {
    const userId = parseInt(req.query.userID);
    const user = await User.findOne({ userID: userId });
    res.json(user);
  });

module.exports = router;