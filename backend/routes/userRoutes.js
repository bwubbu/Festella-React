const express = require('express');
const router = express.Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

router.post('/register', async (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        });

        newUser.save((err) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send('User registered successfully!');
            }
        });
    });
});

module.exports = router;