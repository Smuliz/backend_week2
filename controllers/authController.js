"use strict";
const jwt = require("jsonwebtoken");
const passport = require("../utils/pass.js");


const login = (req, res) => {
  passport.authenticate("local", { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        message: "Something went wrong",
        user: user
      });
    }
    req.login(user, { session: false }, err => {
      if (err) {
        res.send(err);
      }
      const token = jwt.sign(user, "suolattu_avain");
      return res.json({ user, token });
    })(req, res);
  });
  // TODO: add passport authenticate
};

module.exports = {
  login
};
