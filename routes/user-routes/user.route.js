const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');

const User = require('../../models/user');
const guardRoute = require('../../config/route-guard');

// GET user profile page
router.get('/user-profile', guardRoute, (req, res) => {

    res.render('user-views/user-profile.hbs');
    
});

router.post('/logout', (req, res, next) => {
    req.session.destroy();
    res.redirect('/');
})

module.exports = router;