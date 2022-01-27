const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/user');

router.put('/', async (req, res) => {
  const { email } = req.body;
});
