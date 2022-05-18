// import { RRuleSet, rrulestr} from 'rrule';

const express = require('express');
const mongodb = require('mongodb');
const rrule = require('rrule');

const router = express.Router();
require('dotenv').config();

const Availability = require('../models/availability');
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
  /* get all availibilies in a specified date  */
  const {
    token, startDate, endDate,
  } = req.body;
  // const userData = Token(token);
  // if (userData == null) {
  //   res.status(403).send('Unauthorized user');
  //   return;
  // }
  /*
    get all availabilities with rrules
    for each rrule availability
      get all dates
      filter availabities within the specified date
    get all availabilities within the date range
    concat all availabilities together
    get all request offs within date range (group by userId)
    for each availability
      if userId in request offs
        remove availability
    return availabilities
  */
  // get all availabilities with a rrule
  const availabilities = [];
  Availability.find({ rRule: { $ne: null } }).then((result) => {
    if (result) {
      result.forEach((avail) => {
        const rruleSet = new rrule.RRuleSet();
        rruleSet.rrule(rrule.rrulestr(avail.rRule));
        // remove all the excluded dates
        // const exDates = avail.exDate.split(',');
        // exDates.forEach((exDate) => {
        //   console.log(exDate);
        //   // regex here
        //   const dt = new Date(exDate);
        //   console.log(dt);
        //   rruleSet.exdate(new Date(dt));
        // });
        // console.log(rruleSet.all());
        // add availabilities that has recurrence in specified date
        const temp = rruleSet.between(new Date(startDate), new Date(endDate));
        if (temp.length > 0) {
          availabilities.push(avail);
        }
      });
      // console.log(availabilies);
    }
  }).catch((err) => {
    console.log(err, 'error in finding rrule availabilities');
  });
  // find all availabilities without any rrules
  Availability.find({
    rRule: { $eq: null },
    startDate: { $gte: startDate, $lt: endDate },
  }).then((result) => {
    if (result) {
      console.log(result, 'result of finding w/o rrule');
      availabilities.concat(result);
    }
  }).catch((err) => {
    console.log(err, 'error in no rrule availabilities');
  });
  if (availabilities.length === 0) {
    res.status(200).send('No availabilities found');
  }
});

module.exports = router;
