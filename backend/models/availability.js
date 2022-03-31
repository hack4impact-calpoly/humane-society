const mongoose = require('mongoose');
const { userConnection } = require('../connection');

const AvailabilitySchema = new mongoose.Schema({
    userID: { type: String, required: true },
    times: [{ startTime: { type: Date, required: false }, endTime: { type: Date, required: false } }],
    startDate: { type: Date, required: false },
    endDate: { type: Date, required: false },
    reoccurrence: { type: Boolean, required: true, default: false },
    recDay:  [{ type: Number, min: 0, max: 6 }],
});

const Availability = userConnection.model('availability', AvailabilitySchema);
module.exports = Availability;
