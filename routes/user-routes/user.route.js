const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');

const User = require('../../models/user');

// GET user profile page
router.get('/user-profile', (req, res) => {

    res.render('user-views/user-profile.hbs');
    
});

router.post('/logout', (req, res, next) => {
    req.session.destroy();
    res.redirect('/');
})

module.exports = router;