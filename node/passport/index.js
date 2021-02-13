const passport = require('passport');

const local = require('./localStrategy');
const User = require('../models/user');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.name);
    });

    passport.deserializeUser((name, done) => {
        User.findOne({ where: { name }})
            .then(user => done(null, user))
            .catch(err => done(err));
    });
    local();
}