const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');
const User = require('../../models/user');

// GET user profile page
router.get('/user-profile/:id', (req, res) => {
    const userId = req.params.id;

    User
        .findById(userId)
        .then(userFromDB => {

            console.log(`from profile route: ${userFromDB}`);
            res.render('user-views/user-profile.hbs', { user: userFromDB });
            
        }).catch(error => console.log(error))
    
});

module.exports = router;