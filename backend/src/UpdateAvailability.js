const express = require('express');

const router = express.Router();
require('dotenv').config();

const Availability = require('../models/availability');

/* creates a new availability with given attributes */
router.post('/newAvailability', async (req, res) => {
  const { userID, times, startDate, endDate, reoccurrence, recDay } = req.body;
  const availability = Availability;
  console.log('inside function');

  let doc;
  doc = new availability({
    userID, times, startDate, endDate, reoccurrence, recDay,
  });

  doc.save();
  console.log('availability added');
  res.status(200).send('success');
});

/* updates a availability based on given attributes */
router.post('/updateAvailability', async (req, res) => {
    const { _id, times, reoccurrence, recDay } = req.body;
  const availability = Availability;
  console.log(times);

    availability.updateOne({ _id }, { times, reoccurrence, recDay }).then((result) => {
    if (result) {
      res.status(200).send('updated successfully');
    }
  }).catch((err) => {
    console.log(err);
    res.status(500).send('could not update');
  });
});

/* deletes a availibility document based on userID */
router.post('/deleteAvailability', async (req, res) => {
    const { _id } = req.body;
    const availability = Availability;
    var mongodb = require('mongodb');

    availability.deleteOne({ _id: new mongodb.ObjectID(_id) }).then((result) => {
        if (result) {
            res.status(200).send('deleted successfully');
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).send('could not delete');
    });
});

module.exports = router;
