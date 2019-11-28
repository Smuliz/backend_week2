"use strict";
const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = require("passport-local").Strategy;
const userModel = require("../models/userModel");

// local strategy for username password login
passport.use(
  new Strategy(async (username, password, done) => {
    const params = [username, password];
    try {
      const [user] = await userModel.getUserLogin(params);
      console.log("Local strategy", user); // result is binary row
      if (user === undefined) {
        return done(null, false, { message: "Incorrect email or password." });
      }
      return done(null, {...user}, { message: "Logged In Successfully" }); // use spread syntax to create shallow copy to get rid of binary row type
    } catch (err) {
      return done(err);
    }
  })
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "suolattu_avain"
    },
    async (jwtPayload, done) => {
        console.log('Payoad', jwtPayload);
        try {
            const [user] = await userModel.getUserLogin(jwtPayload.user_id);
            if ([user] === undefined) {
                return done(null, false);
            } else {
            return done(null, {...user[0]});
            }
        } catch (err) {
            return done(err);
        }
    //   return userModel.getUser(jwtPayload.user_id)
    //     .then(user => {
    //       return done(null, {...user[0]});
    //     })
    //     .catch(err => {
    //       return done(err);
    //     });
    }
  )
);

// TODO: JWT strategy for handling bearer token

module.exports = passport;
