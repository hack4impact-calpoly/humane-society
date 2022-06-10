/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
const express = require('express');

const router = express.Router();
const { Token } = require('../token');

require('dotenv').config();

const User = require('../models/user');


/* updates a specific user to have a new admin status */
router.post('/updateAdminStatus', async (req, res) => {
    const {
        _id, isAdmin,
    } = req.body;
    User.updateOne({ _id }, {
        $set: {
            isAdmin,
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


router.post('/getAllUsers', async (req, res) => {
    const { token } = req.body;
    const userData = Token(token);
    if (userData == null) {
        res.status(403).send('Unauthorized user');
        return;
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
    const userData = Token(token);
    if (userData == null) {
        res.status(403).send('Unauthorized user');
        return;
    }
    User.find().then((result) => {
        if (!result) {
            res.status(404).send('No Users Found');
        } else {
            const rows = [];

            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < result.length; i++) {
                rows.push({
                    id: result[i].userID, name: (`${result[i].firstName} ${result[i].lastName}`), email: result[i].email,
                    phoneNumber: `${result[i].phone.substring(-1, 3)}-${result[i].phone.substring(3, 6)}-${result[i].phone.substring(6, 10)}`,
                    isAdmin: result[i].isAdmin == true ? 'admin' : 'employee',
                });

            }
            res.status(200).send(rows);
        }
    });
});

router.post('/getUserById', async (req, res) => {
    const { token, id } = req.body;
    const userData = Token(token);
    if (userData == null) {
        res.status(403).send('Unauthorized user');
        return;
    }
    User.findOne({ userID: id }).then((result) => {
        if (!result) {
            res.status(404).send('Invalid User ID');
        } else {
            res.status(200).send(result);
        }
    }).catch((err) => {
        console.log(err);
        res.status(404).send(err);
    });
});

router.post('/isAdmin', async (req, res) => {
    const { userID } = req.body;
    User.findOne({ userID }, { isAdmin: 1 }).then((result) => {
        if (!result) {
            res.status(404).send('Invalid User ID');
        } else {
            res.status(200).send(result.isAdmin);
        }
    }).catch((err) => {
        console.log(err);
        res.status(404).send(err);
    });
});

module.exports = router;
