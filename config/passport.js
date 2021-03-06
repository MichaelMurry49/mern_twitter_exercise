const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('./keys');

// debugger;
const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretOrKey;

// module.exports = passport => {
//     passport.use(new JwtStrategy(options, (jwt_payload, done) => {
//         console.log(jwt_payload);
//         done();
//     }))
// }

module.exports = passport => {
    // debugger;
    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
        // debugger;
        User.findById(jwt_payload.id)
            .then(user => {
                if (user) {
                    // return the user to the frontend
                    return done(null, user);
                }
                // return false since there is no user
                return done(null, false);
            })
            .catch(err => console.log(err));
    }));
};