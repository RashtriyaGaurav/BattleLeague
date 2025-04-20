const express = require('express');
const router = express.Router();
const tShowModel = require('../models/tShowModel');
const { isLoggedin } = require('../middlewares/isLoggedin');

router.get('/', isLoggedin, async function (req, res) {
    tournaments = await tShowModel.find();
    res.render('ui/home', { tournaments:tournaments });
})

router.get('/home', isLoggedin, async function (req, res) {
    tournaments = await tShowModel.find();
    res.render('ui/home', { tournaments:tournaments });
})

router.get('/wallet', isLoggedin, function (req, res) {
    res.render('ui/wallet');
})

router.get('/worldChat', isLoggedin, function (req, res) {
    res.render('ui/worldChat');
})

router.get('/profile', isLoggedin, function (req, res) {
    res.render('ui/profile');
})

router.get('/createTournament', isLoggedin, function (req, res) {
    res.render('ui/createTournament', { user: req.user });
})

router.post('/createTournament/:userid', isLoggedin, async function (req, res) {
    const { title, description, matchType, players, banner, createdBy, tDate, tTime } = req.body;
    await tShowModel.create({ title, description, matchType, players, banner, createdBy, tDate, tTime });
    res.render('ui/home')
})

module.exports = router;
