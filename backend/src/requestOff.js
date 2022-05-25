const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
require('dotenv').config();

const RequestOff = require('../models/requestOff');
const { MongoDBNamespace } = require('mongodb');

router.post('/', async (req, res) => {
  const {
    userID, startDate, endDate, notes,
  } = req.body;

  const doc = new RequestOff({
    userID, startDate, endDate, notes, approved: 0,
  });
  doc.save();
  console.log('requestOff created');
  res.status(200).send('success');
});

router.delete('/', async (req, res) => {
  const { _id } = req.body;

  RequestOff.deleteOne({ _id }).then((result) => {
    if (result) {
      res.status(200).send('deleted successfully');
    }
  }).catch((err) => {
    console.log(err);
    res.status(500).send('could not delete');
  });
});

router.post('/pending', async (req, res) => {
  const { _id } = req.body;

  RequestOff.updateOne({ _id }, {
    $set: {
      approved: 0,
    },
  }).then((result) => {
    if (result) {
      res.status(200).send('updated successfully');
    }
  }).catch((err) => {
    console.log(err);
    res.status(500).send('could not update');
  });
});

router.post('/approve', async (req, res) => {
  const { _id } = req.body;

  RequestOff.updateOne({ _id }, {
    $set: {
      approved: 1,
    },
  }).then((result) => {
    if (result) {
      res.status(200).send('updated successfully');
    }
  }).catch((err) => {
    console.log(err);
    res.status(500).send('could not update');
  });
});

router.post('/deny', async (req, res) => {
  const { _id } = req.body;

  RequestOff.updateOne({ _id }, {
    $set: {
      approved: 2,
    },
  }).then((result) => {
    if (result) {
      res.status(200).send('updated successfully');
    }
  }).catch((err) => {
    console.log(err);
    res.status(500).send('could not update');
  });
});

router.post('/user', async (req, res) => {
  const { userID } = req.body;

  RequestOff.find({ userID }).then((result) => {
    if (!result) {
      res.status(404).send('No users found');
    } else {
      res.status(200).send(result);
    }
  }).catch((err) => {
    console.log(err);
    res.status(500).send('error');
  });
});

router.post('/all', async (req, res) => {
  RequestOff.find().then((result) => {
    if (!result) {
      res.status(404).send('No users found');
    } else {
      res.status(200).send(result);
    }
  }).catch((err) => {
    console.log(err);
    res.status(500).send('error');
  });
});

module.exports = router;
