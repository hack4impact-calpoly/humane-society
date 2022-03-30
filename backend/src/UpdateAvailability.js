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

/* gets the availabilities in a week's time frame */
router.get('/getAvailabilities', async (req, res) => {
    const { weekStart, weekEnd } = req.body;
    const availability = Availability;
    /* get all availibilies for a in a specified time frame  */
    availability.find({
        startDate: {
            $gte: weekStart,
            $lt: weekEnd
        }, endDate: {
            $gte: weekStart,
            $lt: weekEnd}
    }).then((result) => {
        if (!result) {
            res.status(404).send('No users found');
        } else {
            res.status(200).send(result);
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).send('error');
    });
});


/* gets the availabilities for the week for a specific user */
router.get('/getUserAvailabilities', async (req, res) => {
    const { userID, weekStart, weekEnd} = req.body;
    const availability = Availability;
    /* get all availibilies for a user in a specified time frame  */
    availability.find({userID: userID, startDate: {
            $gte: weekStart,
            $lt: weekEnd}, endDate: {
            $gte: weekStart,
            $lt: weekEnd } }).then((result) => {
        if (!result) {
            res.status(404).send('No users found');
        } else {
            res.status(200).send(result);
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).send('error');
    });
});

module.exports = router;
