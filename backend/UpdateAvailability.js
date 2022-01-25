const express = require('express');
const router = express.Router();
require('dotenv').config()

const Availability = require('./models/availability');


router.post('/', async (req, res) => {
    const { day, times, volunteer } = req.body
    let usingDefaultTimes = true;
    let completed = false;
    let completedStatusSet = false;
    let availability = Availability;
    console.log(user)
    console.log(userName)
    console.log(email)

    availability.findOne({ 'volunteer': volunteer }).then(function (result) {
        if (result) {

            // update times
            res.status(404).send("email already in use")
        }
        else {
            var doc;
            doc = new user({
                day, times, volunteer, usingDefaultTimes, completed, completedStatusSet
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