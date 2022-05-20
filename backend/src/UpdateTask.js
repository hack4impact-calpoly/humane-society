/* eslint-disable no-console */

const express = require('express');

const router = express.Router();
require('dotenv').config();

const Scheduling = require('../models/schedule');
const Task = require('../models/task');
const { Token } = require('../token');

router.post('/createTask', async (req, res) => {
  const { token, title, description } = req.body;
  const userData = Token(token);
  if (userData == null) {
    res.status(403).send('Unauthorized user');
    return;
  }
  const completed = false;
  const newTask = new Task({
    title, description, completed,
  });
  newTask.save();
    res.status(200).send(newTask._id);
});

router.post('/updateTask', async (req, res) => {
  const {
    token, taskID, title, description,
  } = req.body;
  const userData = Token(token);
  if (userData == null) {
    res.status(403).send('Unauthorized user');
    return;
  }
  await Task.findByIdAndUpdate(taskID, { title, description }).then((result) => {
    if (result) {
      res.status(200).send('updated successfully');
    }
  }).catch((err) => {
    console.log(err);
    res.status(500).send('could not update');
  });
});

router.post('/getTask', async (req, res) => {
  const { token, taskID } = req.body;
  const userData = Token(token);
  if (userData == null) {
    res.status(403).send('Unauthorized user');
    return;
  }
  Task.findById(taskID).then((result) => {
    if (!result) {
      res.status(404).send('Invalid Task ID');
    } else {
      res.status(200).send(result);
    }
  });
});

router.post('/updateStatus', async (req, res) => {
  const { token, taskID, completed } = req.body;
  const userData = Token(token);
  if (userData == null) {
    res.status(403).send('Unauthorized user');
    return;
  }
  await Task.findByIdAndUpdate(taskID, { $set: { completed } }).then((result) => {
    if (result) {
      res.status(200).send('updated successfully');
    }
  }).catch((err) => {
    console.log(err);
    res.status(500).send('could not update');
  });
});

/* gets the tasks for a specific user on a specific day */
router.post('/getTasks', async (req, res) => {
  const {
    token, userID, startDate, endDate,
  } = req.body;
  const userData = Token(token);
  if (userData == null) {
    res.status(403).send('Unauthorized user');
    return;
  }
  Scheduling.find({
    userID,
    Date: {
      $gte: startDate,
      $lt: endDate,
    },
  }, { Tasks: 1 })
    .then((result) => {
      if (!result) {
        res.status(300).send('No schedule found');
      } else {
        const taskIDs = [];
        result.forEach((obj) => {
          obj.Tasks.forEach((taskID) => {
            taskIDs.push(taskID);
          });
        });
        Task.find({ _id: { $in: taskIDs } }).then((data) => {
          if (!data) {
            res.status(404).send('Invalid Task ID ');
          } else {
            res.status(200).send(data);
          }
        });
      }
    });
});

module.exports = router;
