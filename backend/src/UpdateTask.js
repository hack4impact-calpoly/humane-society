const express = require('express');

const router = express.Router();
require('dotenv').config();

const Task = require('../models/task');

router.post('/createTask', async (req, res) => {
  const { title, description } = req.body;
  const completed = false;
  const newTask = new Task({
    title, description, completed,
  });
  newTask.save();
  res.status(200).send('success');
});

router.post('/updateTask', async (req, res) => {
  const {
    taskID, title, description,
  } = req.body;
  await Task.findByIdAndUpdate(taskID, { title, description }).then((result) => {
    if (result) {
      res.status(200).send('updated successfully');
    }
  }).catch((err) => {
    console.log(err);
    res.status(500).send('could not update');
  });
});

router.get('/getTask', async (req, res) => {
  const { taskID } = req.body;
  Task.findById(taskID).then((result) => {
    if (!result) {
      res.status(404).send('Invalid Task ID');
    } else {
      res.status(200).send(result);
    }
  });
});

router.post('/updateStatus', async (req, res) => {
  const { taskID, completed } = req.body;
  await Task.findByIdAndUpdate(taskID, { $set: { completed } }).then((result) => {
    if (result) {
      res.status(200).send('updated successfully');
    }
  }).catch((err) => {
    console.log(err);
    res.status(500).send('could not update');
  });
});

module.exports = router;
