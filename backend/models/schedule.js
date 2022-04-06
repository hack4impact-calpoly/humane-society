const mongoose = require('mongoose');
const { userConnection } = require('../connection');

const SchedulingSchema = new mongoose.Schema({
    scheduleID: { type: String, required: true },
    userID: { type: String, required: true },
    Date: { type: Date, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    Tasks: [{ type: String, required: true }],
});

SchedulingSchema.pre('validate', function (next) {
    if (this.startTime > this.endTime) {
        next(new Error('End Time must be greater than Start Time'));
    } else {
        next();
    }
});

const Scheduling = userConnection.model('schedule', SchedulingSchema);
module.exports = Scheduling;
