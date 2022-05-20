/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
require('dotenv').config();

const Scheduling = require('../models/schedule');
const { Token } = require('../token');

/* creates a new schedule with given attributes */
router.post('/newSchedule', async (req, res) => {
  const {
    token, scheduleID, userID, Date, startTime, endTime, Tasks,
  } = req.body;
  const userData = Token(token);
  if (userData == null) {
    res.status(403).send('Unauthorized user');
    return;
  }
  const schedules = Scheduling;
  let doc;
  doc = new schedules({
    scheduleID, userID, Date, startTime, endTime, Tasks,
  });

  doc.save();
  console.log('schedule added');
  res.status(200).send('success');
});

router.post('/updateScheduleTasks', async (req, res) => {
    const {
        token, _id, taskID
    } = req.body;
    const userData = Token(token);
    if (userData == null) {
        res.status(403).send('Unauthorized user');
        return;
    }

    const schedules = Scheduling;

    await schedules.findByIdAndUpdate({ _id: _id }, { $addToSet: {Tasks: taskID}, }).then((result) => {
        if (result) {
            res.status(200).send('updated successfully');
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).send('could not update');
    });
});

/* gets all schedules */
router.post('/getAllSchedules', async (req, res) => {
  const { token } = req.body;
  const userData = Token(token);
  if (userData == null) {
    res.status(403).send('Unauthorized user');
    return;
  }
  const schedules = Scheduling;

  /* get all schedules  */
  schedules.find().then((result) => {
    if (!result) {
      res.status(404).send('No schedules found');
    } else {
      res.status(200).send(result);
    }
  }).catch((err) => {
    console.log(err);
    res.status(500).send('error');
  });
});

/* gets the schedules a specific user */
router.post('/getUserSchedules', async (req, res) => {
  const { token, userID } = req.body;
  const userData = Token(token);
  if (userData == null) {
    res.status(403).send('Unauthorized user');
    return;
  }
  const schedules = Scheduling;
  /* get all schedules for a user */
  schedules.find({
    userID,
  }).then((result) => {
    if (!result) {
      res.status(404).send('No schedules found');
    } else {
      res.status(200).send(result);
    }
  }).catch((err) => {
    console.log(err);
    res.status(500).send('error');
  });
});

/* gets the schedules in a week's time frame */
router.post('/getWeekSchedules', async (req, res) => {
  const { token, weekStart, weekEnd } = req.body;
  const userData = Token(token);
  if (userData == null) {
    res.status(403).send('Unauthorized user');
    return;
  }
  const schedules = Scheduling;
  /* get all schedules for a in a specified time frame  */
  schedules.find({
    Date: {
      $gte: weekStart,
      $lt: weekEnd,
    },
  }).then((result) => {
    if (!result) {
      res.status(404).send('No schedules found');
    } else {
      res.status(200).send(result);
    }
  }).catch((err) => {
    console.log(err);
    res.status(500).send('error');
  });
});

module.exports = router;
