/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
const express = require('express');

const router = express.Router();
const { Token } = require("../token.js");

require('dotenv').config();

const User = require('../models/user');

router.post('/getAllUsers', async (req, res) => {
    const { token } = req.body;
    let userData = Token(token)
    if (userData == null) {
        res.status(403).send("Unauthorized user")
        return
    }
    User.find().then((result) => {
        if (!result) {
            res.status(404).send('No Users Found');
        } else {
            res.status(200).send(result);
        }
    });
});

/* gets all the users into a specific format to be generated on the contacts page */
router.post('/getFormattedUsers', async (req, res) => {
    const { token } = req.body;
    let userData = Token(token)
    if (userData == null) {
        res.status(403).send("Unauthorized user")
        return
    }
    User.find().then((result) => {
        if (!result) {
            res.status(404).send('No Users Found');
        } else {
            const rows = [];

            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < result.length; i++) {
                rows.push({
                    id: result[i].userID, name: (`${result[i].firstName} ${result[i].lastName}`), email: result[i].email, phoneNumber: `${result[i].phone.substring(-1, 3)}-${result[i].phone.substring(3, 6)}-${result[i].phone.substring(6, 10)}`,
                });
            }
            res.status(200).send(rows);
        }
    });
});

router.post('/getUserById', async (req, res) => {

    const { token, id } = req.body;
    let userData = Token(token)
    if (userData == null) {
        res.status(403).send("Unauthorized user")
        return
    }
    User.findOne({ userID: id }).then((result) => {
        if (!result) {
            res.status(404).send('Invalid User ID');
        } else {
            res.status(200).send(result);
        }
    });
});

module.exports = router;
