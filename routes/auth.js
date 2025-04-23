const express = require('express');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateToken');
const router = express.Router();

router.get('/register', function (req, res) {
    res.render('auth/register', { error: null });
});


router.post('/register', async function (req, res) {
    try {
        const { name, email, username, password, ffname } = req.body;

        const existingUser = await userModel.findOne({ username });
        if (existingUser) {
            return res.render('auth/register', {
                error: 'Username already exists!',
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await userModel.create({ name, email, username, password: hash, ffname });

        const token = generateToken(user);
        res.cookie("token", token);
        res.redirect('/home',{success: 'Registration successful!'});
    } catch (err) {
        res.render('auth/register', {
            error: err.message
        });
    }
});



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
