const express = require('express');
const router = express.Router();
require('dotenv').config()

const Availability = require('../models/availability');


router.post('/', async (req, res) => {
    const { day, times, employee } = req.body
    let usingDefaultTimes = true;
    let completed = false;
    let completedStatusSet = false;
    let availability = Availability;
    console.log()

    availability.findOne({ 'employee': employee }).then(function (result) {
        if (result) {
            availability.times = times;
            availability.day = day;
            res.status(404).send("updating..")
        }
        else {
            var doc;
            doc = new availability({
                day, times, employee, usingDefaultTimes, completed, completedStatusSet
            })

            doc.save()
            console.log("availability added")
            res.status(200).send("success")
        }
    }).catch(err => {
        console.log(err)
        res.status(500).send("error")
    })
        

});

module.exports = router;