module.exports = {
    loggedIn: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next()
        }
        return res.redirect('/signin')
    }
}