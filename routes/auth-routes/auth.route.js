const express = require('express');
const router  = express.Router();

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

    bcryptjs
        .genSalt(saltRounds)
        .then(salt => bcryptjs.hash(password, salt))
        .then(hashedPassword => {

            return User.create({
                        username,
                        email,
                        passwordHash: hashedPassword
                    })

        }).then(userDoc => console.log(userDoc))
        .catch(err => console.log({err}));

    res.redirect('/');
})

/* GET user login page*/
router.get('/login', (req, res, next) => {
    res.render('auth-views/auth-login.hbs');
})

/* POST user login form */
router.post('/login', (req, res, next) => {
    const {username, email, password} = req.body;

    if (!username || !email || !password){
        res.render('auth-views/auth-login.hbs', {errorMessage: "All fields must be filled in."});
        return;
    }
    
    bcryptjs
        .genSalt(saltRounds)
        .then(salt => bcryptjs.hash(password, salt))
        .then(hashedPassword => {

            console.log(`hash: ${hashedPassword}`);

            User
                .find({email: email, username: username})
                .then(userFromDB => {

                    // console.log({userFromDB});

                    if (bcryptjs.compare(userFromDB.hashedPassword, hashedPassword)){
                        console.log(`User validated: ${userFromDB}`);
                    } else {
                        //not working..res.redirect('/) runs
                        res.render('auth-views/auth-login.hbs', {errorMessage: "username and password do not match."});
                        return;
                    }
                    res.redirect('/');
                }).catch(err => {
                    console.log(`User not found: ${err}`);
                    res.render('auth-views/auth-login.hbs', {errorMessage: "Account not found."})
                });

                
            })
            .catch(err => console.log(`hashed password error:${err}`));

    
})

module.exports = router;