const express = require('express');

const router = express.Router();
require('dotenv').config();

const Task = require('../models/task');

router.get('/', async (req, res) => {
  console.log('made it');
  res.status(200).send('hellow');
});

router.post('/newTask', async (req, res) => {
  const { taskID, title, description } = req.body;
  const completed = false;
  Task.findOne({ taskID }).then((task) => {
    if (task) {
      console.log(task);
      res.status(404).send('another task has the same taskID');
    } else {
      const newTask = new Task({
        taskID, title, description, completed,
      });
      newTask.save();
      res.status(200).send('success');
    }
  });
});

router.post('/updateTask', async (req, res) => {
  const { taskID, title, description } = req.body;
  await Task.updateOne({ taskID }, { title, description }).then((result) => {
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
  Task.findOne({taskID}).then((result) => {
    if (!result) {
      res.status(404).send('Invalid Task ID');
    } else {
      res.status(200).send(result);
    }
  });
});

router.post('/completeTask', async (req, res) => {
  const { taskID } = req.body;
  await Task.updateOne({ taskID }, { $set: { completed: true } }).then((result) => {
    if (result) {
      res.status(200).send('updated successfully');
    }
  }).catch((err) => {
    console.log(err);
    res.status(500).send('could not update');
  });
});

module.exports = router;
