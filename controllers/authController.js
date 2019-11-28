"use strict";
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const userModel = require('../models/userModel');

const login = (req, res) => {
  passport.authenticate('local', { session: false }, (err, user) => {
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
      return res.json({user, token});
    });
  })(req, res);
  // TODO: add passport authenticate - DONE
};

const user_create_post = async (req, res, next) => {
  // Extract the validation errors from a request.
  const errors = validationResult(req); // TODO require validationResult, see userController

  if (!errors.isEmpty()) {
    console.log('user create error', errors);
    res.send(errors.array());
  } else {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    // TODO: bcrypt password

    const params = [
      req.body.name,
      req.body.username,
      hash, // TODO: save hash instead of the actual password
    ];
    
    if (await userModel.addUser(params)) {
      next();
    } else {
      res.status(400).json({error: 'register error'});
    }   
  }
};

const logout = (req, res) => {
  req.logout();
  res.json({message: 'logout'});
};

module.exports = {
  login,
  user_create_post,
  logout,
};
