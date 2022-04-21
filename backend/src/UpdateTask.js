/* eslint-disable no-console */

const express = require('express');

const router = express.Router();
require('dotenv').config();

const Task = require('../models/task');
const { Token } = require("../token.js");

router.post('/createTask', async (req, res) => {
    const { token, title, description } = req.body;
    let userData = Token(token)
    if (userData == null) {
        res.status(403).send("Unauthorized user")
        return
    }
    const completed = false;
    const newTask = new Task({
        title, description, completed,
    });
    newTask.save();
    res.status(200).send('success');
});

router.post('/updateTask', async (req, res) => {
    const {
        token, taskID, title, description,
    } = req.body;
    let userData = Token(token)
    if (userData == null) {
        res.status(403).send("Unauthorized user")
        return
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
    let userData = Token(token)
    if (userData == null) {
        res.status(403).send("Unauthorized user")
        return
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
    let userData = Token(token)
    if (userData == null) {
        res.status(403).send("Unauthorized user")
        return
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

module.exports = router;
