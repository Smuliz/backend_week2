"use strict";
// userController
const userModel = require("../models/userModel");
const { validationResult } = require("express-validator");

const user_create_post = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    res.status(422).json({ errors: errors.array() });
  } else {
    const params = [req.body.name, req.body.email, req.body.passwd];
    const result = await userModel.addUser(params);
    await res.json(result);
  }
};

const user_get = async (req, res) => {
  const user = await userModel.getUser(req.params.id);
  // delete user[0].password;
  await res.json(user[0]);
};

const user_list_get = async (req, res) => {
  const users = await userModel.getAllUsers();
  // let i = 0;
  // while (i <= users.length) {
  //     delete users[i].password
  //     i++;
  // }
  await res.json(users);
};

module.exports = {
  user_list_get,
  user_get,
  user_create_post
};
