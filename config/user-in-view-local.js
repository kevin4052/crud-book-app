module.exports = (req, res, next) => {
    console.log('session: ', req.session.loggedInUser);
    res.locals.user = req.session.loggedInUser;
    next();
}