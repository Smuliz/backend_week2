'use strict';
// const users = [
//   {
//     id: '1',
//     name: 'John Doe',
//     email: 'john@metropolia.fi',
//     password: '1234',
//   },
//   {
//     id: '2',
//     name: 'Jane Doez',
//     email: 'jane@metropolia.fi',
//     password: 'qwer',
//   },
// ];

// module.exports = {
//   users,
// };

const pool = require('../database/db');
const promisePool = pool.promise();

const getAllUsers = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM wop_user');
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

const getUser = async (id) => {
  try {
    const [rows] = await promisePool.execute ('SELECT * FROM wop_user WHERE user_id = ?', [id]);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

const addUser = async (params) => {
  try {
    const [rows] = await promisePool.execute ('INSERT INTO wop_user (name, email, password) VALUES (?,?,?);', params);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

const getUserLogin = async (params) => {
  try {
    console.log(params);
    const [rows] = await promisePool.execute(
        'SELECT user_id, name, email FROM wop_user WHERE email = ? AND password = ?;',
        params);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};


module.exports = {
  getAllUsers,
  getUser,
  addUser,
  getUserLogin,
}