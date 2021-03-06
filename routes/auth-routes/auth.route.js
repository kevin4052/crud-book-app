const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');

const bcryptjs = require('bcrypt');
const saltRounds = 10;

const User = require('../../models/user');

/* GET signup page */
router.get('/signup', (req, res, next) => {
  res.render('auth-views/auth-signup.hbs');
});

/* POST signup form */
router.post('/signup', (req, res, next) => {
    const {username, email, password} = req.body;

    if (!username || !email || !password){
        res.render('auth-views/auth-signup.hbs', {errorMessage: "All fields must be filled in."});
        return;
    }

    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!regex.test(password)) {
        res
        .status(500)
        .render('auth-views/auth-signup', { errorMessage: 'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.' });
        return;
    }

    bcryptjs
        .genSalt(saltRounds)
        .then(salt => bcryptjs.hash(password, salt))
        .then(hashedPassword => {

            return User.create({
                        username,
                        email,
                        passwordHash: hashedPassword
                    })

        }).then(userDoc => {
            console.log(userDoc);
            res.redirect('/');
        })
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.status(500).render('auth-views/auth-signup', { errorMessage: error.message });
            } else if (error === 11000) {
                res.status(500).render('auth-views/auth-signup', {
                   errorMessage: 'Username and email need to be unique. Either username or email is already used.'
                });
              } else {
                next(error);
              }
            });

})

/* GET user login page*/
router.get('/login', (req, res, next) => {
    res.render('auth-views/auth-login.hbs');
})

/* POST user login form */
router.post('/login', (req, res, next) => {
    const {email, password} = req.body;

    // console.log(req.body);

    if (!email || !password){
        res.render('auth-views/auth-login.hbs', {errorMessage: "All fields must be filled in."});
        return;
    }

    User
        .findOne({ email })
        .then(userFromDB => {

            // console.log(password, userFromDB.passwordHash);

            if(!userFromDB){

                res.render('auth-views/auth-login.hbs', {errorMessage: "Email is not recognized."});
                return;

            } else if (bcryptjs.compareSync(password, userFromDB.passwordHash)){

                req.session.loggedInUser = userFromDB;
                // console.log(`User validated: ${userFromDB}`);
                res.redirect(`../user/user-profile`);
                return;

            } else {
                //not working..res.redirect('/) runs
                res.render('auth-views/auth-login.hbs', {errorMessage: "username and password do not match."});
                return;
            }
            
        }).catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.status(500).render('auth-views/auth-login', { errorMessage: error.message });
            } else {
                next(error);
              }
            });    
})



module.exports = router;