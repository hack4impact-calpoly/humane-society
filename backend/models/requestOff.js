const mongoose = require('mongoose');
const { userConnection } = require('../connection');

const RequestOffSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  notes: { type: String, required: true },
  approved: { type: Number, required: true },
});

RequestOffSchema.pre('validate', (next) => {
  if (this.startDate > this.endDate) {
    next(new Error('End Time must be greater than Start Time'));
  } else {
    next();
  }
});

const RequestOff = userConnection.model('requestOff', RequestOffSchema);
module.exports = RequestOff;
