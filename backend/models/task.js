const mongoose = require('mongoose');
const { userConnection } = require('../connection');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, required: true },
});

const Task = userConnection.model('task', TaskSchema);
module.exports = Task;
