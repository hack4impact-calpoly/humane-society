const express = require('express');

const router = express.Router();
require('dotenv').config();

const Availability = require('../models/availability');

router.post('/newAvailability', async (req, res) => {
  const { day, times, userID } = req.body;
  const usingDefaultTimes = true;
  const completed = false;
  const completedStatusSet = false;
  const availability = Availability;
  console.log('inside function');

  let doc;
  doc = new availability({
    day, times, userID, usingDefaultTimes, completed, completedStatusSet,
  });

  doc.save();
  console.log('availability added');
  res.status(200).send('success');
});

router.post('/updateAvailability', async (req, res) => {
  const { times, _id } = req.body;
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
