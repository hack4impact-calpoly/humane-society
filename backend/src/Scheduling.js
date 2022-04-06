const express = require('express');

const router = express.Router();
require('dotenv').config();

const Scheduling = require('../models/availability');


/* creates a new availability with given attributes */
router.post('/newSchedule', async (req, res) => {
    const { scheduleID, userID, Date, startTime, endTime, Tasks } = req.body;
    const availability = Availability;

    let doc;
    doc = new availability({
        scheduleID, userID, Date, startTime, endTime, Tasks,
    });

    doc.save();
    console.log('availability added');
    res.status(200).send('success');
});

/* gets all schedules */
router.get('/getAllSchedules', async (req, res) => {
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
router.get('/getUserSchedules', async (req, res) => {
    const { userID } = req.body;
    const schedules = Scheduling;
    /* get all schedules for a user */
    schedules.find({
        userID: userID
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
router.get('/getWeekSchedules', async (req, res) => {
    const { weekStart, weekEnd } = req.body;
    const availability = Availability;
    /* get all schedules for a in a specified time frame  */
    availability.find({
        startTime: {
            $gte: weekStart,
            $lt: weekEnd
        }, endTime: {
            $gte: weekStart,
            $lt: weekEnd
        }
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
