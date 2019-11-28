"use strict";
// userController
const userModel = require("../models/userModel");


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
};
