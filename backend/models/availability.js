const mongoose = require("mongoose")
const { userConnection } = require('../backend');

const AvailabilitySchema = new mongoose.Schema({
    day: { type: Date, required: false },
    times: [{ start: { type: Date, required: false }, end: { type: Date, required: false } }],
    volunteer: {
        type: {
            userID: { type: String, required: true },
            firstName: { type: String, required: true },
            lastName: { type: String, required: true },
            userName: { type: String, required: true },
            email: { type: String, required: true },
        },
        required: true,
    },
    usingDefaultTimes: { type: Boolean, required: true },
    completed: { type: Boolean, required: false, default: false },
    completedStatusSet: { type: Boolean, required: false, default: false },
})

const Availability = userConnection.model('availability', AvailabilitySchema);
module.exports = Availability