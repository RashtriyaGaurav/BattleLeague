const express = require('express');
const router = express.Router();
const { isLoggedin } = require('../middlewares/isLoggedin');

router.get('/',isLoggedin,function(req,res){
    res.render('ui/home');
})

router.get('/home',isLoggedin,function(req,res){
    res.render('ui/home');
})

router.get('/wallet',isLoggedin,function(req,res){
    res.render('ui/wallet');
})

router.get('/worldChat',isLoggedin,function(req,res){
    res.render('ui/worldChat');
})

router.get('/profile',isLoggedin,function(req,res){
    res.render('ui/profile');
})

module.exports = router;
