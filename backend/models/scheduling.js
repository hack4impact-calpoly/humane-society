const mongoose = require('mongoose');
const { userConnection } = require('../connection');

const SchedulingSchema = new mongoose.Schema({
    scheduleID: { type: String, required: true },
    userID: { type: String, required: true },
    Date: { type: Date, required: false },
    startTime: { type: Date, required: false },
    endTime: { type: Date, required: false },
    Tasks: [{ type: String, required: true }],
});

SchedulingSchema.pre('validate', function (next) {
    if (this.startDate > this.endDate) {
        next(new Error('End Time must be greater than Start Time'));
    } else {
        next();
    }
});

const Scheduling = userConnection.model('scheduling', SchedulingSchema);
module.exports = Scheduling;
