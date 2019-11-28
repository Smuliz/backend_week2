"use strict";
const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = require("passport-local").Strategy;
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);


// local strategy for username password login
passport.use(
  new Strategy(async (username, password, done) => {
    const params = [username];
    try {
      const [user] = await userModel.getUserLogin(params);
      console.log("Local strategy", user); // result is binary row
      if (user === undefined) {
        return done(null, false, { message: "Incorrect email." });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: "Incorrect password." });
      }
      delete user.password; // poistetaan salasana user objektista ennen returnia
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
        console.log('Payload', jwtPayload);
        try {
            const [user] = await userModel.getUser(jwtPayload.user_id);
            if (user === undefined) {
                return done(null, false);
            } else {
            return done(null, {...user});
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
    },
  )
);

// TODO: JWT strategy for handling bearer token

module.exports = passport;
