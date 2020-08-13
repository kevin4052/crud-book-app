const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');

const User = require('../../models/user');
const Book = require('../../models/books');
const Author = require('../../models/authors');

const guardRoute = require('../../config/route-guard');

// GET user profile page
router.get('/user-profile', guardRoute, (req, res) => {
    const user = req.session.loggedInUser;

    User
        .findById(user._id)
        .populate('books')
        .then(userFromDB => {

            console.log({userFromDB});
            req.session.loggedInUser = userFromDB;
            res.render('user-views/user-profile.hbs');

        }).catch(err => console.log(err));

    
});

router.post('/logout', (req, res, next) => {
    req.session.destroy();
    res.redirect('/');
})

router.post('/add-book-favorite/:bookId', (req, res, next) => {
    const { bookId } = req.params;
    const user = req.session.loggedInUser;

    if (!user.books.includes(bookId)) user.books.push(bookId);    

    User
        .findByIdAndUpdate(user._id, user, {new: true})
        .then(userDoc => {
            req.session.loggedInUser = userDoc;
            console.log(`updated user: ${userDoc}`);
            res.redirect('/books');
        }).catch(err => console.log(err))


})

module.exports = router;