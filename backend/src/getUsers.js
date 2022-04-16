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

/* gets all the users into a specific format to be generated on the contacts page */
router.get('/getFormattedUsers', async (req, res) => {
  User.find().then((result) => {
    if (!result) {
      res.status(404).send('No Users Found');
    } else {
      const rows = [];

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < result.length; i++) {
        rows.push({
          id: result[i].userID, name: (`${result[i].firstName} ${result[i].lastName}`), email: result[i].email, phoneNumber: `${result[i].phone.substring(-1, 3)}-${result[i].phone.substring(3, 6)}-${result[i].phone.substring(6, 10)}`,
        });
      }
      res.status(200).send(rows);
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
