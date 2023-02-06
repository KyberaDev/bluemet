const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/signin', function (req, res) {
    res.render('auth/login')
});

router.post('/signin', function (req, res, next) {
    passport.authenticate('local.signin', {
        successRedirect: '/dashboard',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logOut(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
});

module.exports = router;