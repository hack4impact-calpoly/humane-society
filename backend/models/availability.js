const mongoose = require('mongoose');
const { userConnection } = require('../connection');

const AvailabilitySchema = new mongoose.Schema({
  userID: { type: String, required: true },
  startDate: { type: Date, required: false },
  endDate: { type: Date, required: false },
  rRule: { type: String, required: false },
  exDate: [{ type: String, required: false }],
});

const Availability = userConnection.model('availability', AvailabilitySchema);
module.exports = Availability;
