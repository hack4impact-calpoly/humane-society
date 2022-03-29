const express = require('express');

const router = express.Router();
require('dotenv').config();

const Availability = require('../models/availability');

router.post('/newAvailability', async (req, res) => {
  const { userID, times, startDate, endDate, reoccurrence } = req.body;
  const availability = Availability;
  console.log('inside function');

  let doc;
  doc = new availability({
    userID, times, startDate, endDate, reoccurrence,
  });

  doc.save();
  console.log('availability added');
  res.status(200).send('success');
});

router.post('/updateAvailability', async (req, res) => {
  const { _id, times } = req.body;
  const availability = Availability;
  console.log(times);

  availability.updateOne({ _id }, { times }).then((result) => {
    if (result) {
      res.status(200).send('updated successfully');
    }
  }).catch((err) => {
    console.log(err);
    res.status(500).send('could not update');
  });
});

module.exports = router;
