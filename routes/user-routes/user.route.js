const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');

// GET user profile page
router.get('/user-profile', (req, res) => {
    res.render('auth-views/auth-login.hbs');
});

module.exports = router;