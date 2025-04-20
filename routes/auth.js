const express = require('express');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateToken');
const router = express.Router();

router.get('/register', function (req, res) {
    res.render('auth/register');
})

router.post('/register', function (req, res) {
    let { name, email, username, password, ffname } = req.body;
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            if (err) {
                res.send(err.message)
                res.redirect('/register');
            } else {
                let user = await userModel.create({ name, username, email, password: hash, ffname });
                let token = generateToken(user);
                res.cookie("token", token);
                res.redirect('../home');
            }
        });
    });
})

router.get('/login', function (req, res) {
    res.render('auth/login');
})

router.post('/login', async function (req, res) {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email: email });
    if (!user) { return res.status(400).send("Email or password incorrect!") }
    let isMatch = await bcrypt.compare(password, user.password, async function (err, result) {
        if (result) {
            let token = generateToken(user);
            res.cookie("token", token)
            res.redirect('/');

        }
        else {
            return res.status(400).send("Email or password incorrect!")
        }
    });
})


module.exports = router;
