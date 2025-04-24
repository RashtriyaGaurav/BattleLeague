const express = require('express');
const router = express.Router();
const tShowModel = require('../models/tShowModel');
const { isLoggedin } = require('../middlewares/isLoggedin');
const userModel = require('../models/userModel');

router.get('/', isLoggedin, async function (req, res) {
    tournaments = await tShowModel.find();
    res.render('ui/home', { tournaments: tournaments });
})

router.get('/home', isLoggedin, async function (req, res) {
    tournaments = await tShowModel.find();
    res.render('ui/home', { tournaments: tournaments });
})

router.get('/wallet', isLoggedin, function (req, res) {
    res.render('ui/wallet');
})

router.get('/hostedTournaments', isLoggedin,async function (req, res) {
    let tournaments = req.user.tournaments;
    res.render('ui/hostedTournaments',{tournaments});
})

router.get('/worldChat', isLoggedin, function (req, res) {
    res.render('ui/worldChat');
})

router.get('/profile', isLoggedin, function (req, res) {
    res.render('ui/profile', { user: req.user });
})

router.get('/followersList', isLoggedin, async function (req, res) {
    const user = req.user;
    const users = user.followers
    res.render('ui/followersList', { users });
})

router.get('/createTournament', isLoggedin, function (req, res) {
    res.render('ui/createTournament', { user: req.user });
})

router.post('/createTournament/:userid', isLoggedin, async function (req, res) {
    const { title, description, matchType, players, banner, createdBy, tDate, tTime, entryFee, winPrize } = req.body;
    let newTournament = await tShowModel.create({ title, description, matchType, players, banner, createdBy, entryFee, winPrize, tDate, tTime });

    req.user.tournaments.push(newTournament);


    await req.user.save();
    res.render('ui/home')
})

router.get('/details/:tid', isLoggedin, async function (req, res) {
    tournament = await tShowModel.findOne({ _id: req.params.tid })
    res.render('ui/details', { tournament });
})

module.exports = router;
