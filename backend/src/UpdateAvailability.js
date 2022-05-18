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
  /* get all availibilies in a specified date  */
  const { startDate, endDate,
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
  // const availabilities = [];
  const promise1 = Availability.find({ rRule: { $ne: null } }).then((result) => {
    const availabilities = [];
    if (result) {
      result.forEach((avail) => {
        const rruleSet = new rrule.RRuleSet();
        let rule = avail.rRule;
        // if (avail.exDate !== '') {
        //   rule = `${avail.rRule}\nEXDATE:${avail.exDate}`;
        // }
        // console.log(rule);
        rruleSet.rrule(rrule.rrulestr(rule));
        rruleSet.rdate(new Date(avail.startDate));
        // add availabilities that has recurrence in specified date
        // console.log(rruleSet.all());
        const temp = rruleSet.between(new Date(startDate), new Date(endDate));
        if (temp.length > 0) {
          availabilities.push(avail);
        }
      });
      // console.log(availabilities);
      return availabilities;
    }
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
  }).then((result) => result).catch((err) => {
    console.log(err, 'error in finding request offs');
  });
  Promise.all([promise1, promise2, promise3]).then((data) => {
    // ! put availabilities into one array
    const availabilities = data[1];
    availabilities.concat(data[0]);
    const requestOffs = data[2];
    console.log(requestOffs);
    if (availabilities.length === 0) {
      res.status(200).send('No availabilities found');
    }
    res.status(200).send(availabilities);
  });
});

module.exports = router;
