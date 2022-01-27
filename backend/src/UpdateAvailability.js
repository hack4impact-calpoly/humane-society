const express = require('express');
const router = express.Router();
require('dotenv').config()

const Availability = require('../models/availability');



router.post('/newAvailability', async (req, res) => {
    const { day, times, employee } = req.body
    let usingDefaultTimes = true;
    let completed = false;
    let completedStatusSet = false;
    let availability = Availability;
    console.log()

 
           var doc;
            doc = new availability({
                day, times, employee, usingDefaultTimes, completed, completedStatusSet
            })

            doc.save()
            console.log("availability added")
            res.status(200).send("success")
    


});

router.post('/updateAvailability', async (req, res) => {
    const { times, _id } = req.body
    let availability = Availability;
    console.log()
    console.log(times)

    availability.updateOne({ '_id': _id },{ times : times }).then(function (result) {
        if (result) {
            res.status(200).send("updated successfully")
        }
    }).catch(err => {
        console.log(err)
        res.status(500).send("could not update")
    })
        

});

module.exports = router;