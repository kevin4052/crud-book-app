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


module.exports = router;