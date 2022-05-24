const express = require('express');
const mongodb = require('mongodb');
const rrule = require('rrule');

const router = express.Router();
require('dotenv').config();

const Availability = require('../models/availability');
const RequestOff = require('../models/requestOff');
const { Token } = require('../token');

/* creates a new availability with given attributes */
router.post('/newAvailability', async (req, res) => {
  const {
    userID, startDate, endDate, rRule, exDate,
  } = req.body;

  const doc = new Availability({
    userID, startDate, endDate, rRule, exDate,
  });

  doc.save();
  // console.log(doc._id);
  console.log('availability added');
  res.status(200).send(doc);
});

/* updates a availability based on given attributes */
router.post('/updateAvailability', async (req, res) => {
  const {
    _id, startDate, endDate, rRule, exDate,
  } = req.body;
  Availability.updateOne({ _id }, {
    $set: {
      startDate, endDate, rRule, exDate,
    },
  }).then((result) => {
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

  Availability.deleteOne({ _id: new mongodb.ObjectID(_id) }).then((result) => {
    if (result) {
      res.status(200).send('deleted successfully');
    }
  }).catch((err) => {
    console.log(err);
    res.status(500).send('could not delete');
  });
});

/* gets the availabilities in a week's time frame */
// router.post('/getAvailabilities', async (req, res) => {
//   const { weekStart, weekEnd } = req.body;
//   /* get all availibilies for a in a specified time frame  */
//   Availability.find({
//     startDate: {
//       $gte: weekStart,
//       $lt: weekEnd,
//     },
//     endDate: {
//       $gte: weekStart,
//       $lt: weekEnd,
//     },
//   }).then((result) => {
//     if (!result) {
//       res.status(200).send('no availabilies'); // double check this
//     } else {
//       res.status(200).send(result);
//     }
//   }).catch((err) => {
//     console.log(err);
//     res.status(500).send('error');
//   });
// });

router.post('/getUserAvailabilities', async (req, res) => {
  const { userID } = req.body;
  /* get all availibilies for a user in a specified time frame  */
  Availability.find({
    userID,
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

router.post('/getAvailabilities', async (req, res) => {
  /* get all availibilities for a specified date. startDate must be the UTC beginning of the 
  desired date and endDate must be the UTC end of the desired date */
  const { token, startDate, endDate,
  } = req.body;
  const userData = Token(token);
  if (userData == null) {
    res.status(403).send('Unauthorized user');
    return;
  }
  const promise1 = Availability.find({ rRule: { $ne: null } }).then((result) => {
    const availabilities = [];
    if (result) {
      result.forEach((avail) => {
        const options = rrule.RRule.parseString((avail.rRule).slice(6));
        options.dtstart = new Date(avail.startDate);
        let rule = new rrule.RRule(options);
        if (avail.exDate !== undefined && avail.exDate !== '') {
          rule = rrule.rrulestr(`${rule.toString()}\nEXDATE:${avail.exDate}`);
        }
        const temp = rule.between(new Date(startDate), new Date(endDate));
        if (temp.length > 0) {
          availabilities.push(avail);
        }
      });
    }
    return availabilities;
  }).catch((err) => {
    console.log(err, 'error in finding rrule availabilities');
    return [];
  });
  // find all availabilities without any rrules
  const promise2 = Availability.find({
    rRule: { $eq: null },
    startDate: { $gte: startDate, $lt: endDate },
  }).then((result) => result).catch((err) => {
    console.log(err, 'error in no rrule availabilities');
  });
  // find all ongoing approved request offs
  const promise3 = RequestOff.find({
    startDate: { $lte: startDate },
    endDate: { $gte: endDate },
    approved: { $eq: 1 },
  }, { userID: 1 }).then((result) => result).catch((err) => {
    console.log(err, 'error in finding request offs');
  });
  Promise.all([promise1, promise2, promise3]).then((data) => {
    const availabilities = [...data[1], ...data[0]];
    const requestOffs = [...data[2]];
    // add userIDs to set
    const userIDSet = new Set();
    requestOffs.forEach((request) => {
      userIDSet.add(request.userID);
    });
    const result = availabilities.filter((avail) => !userIDSet.has(avail.userID));
    res.status(200).send(result);
  }).catch((err) => {
    console.log(err);
    res.status(400).send('an error occured');
  });
});

module.exports = router;