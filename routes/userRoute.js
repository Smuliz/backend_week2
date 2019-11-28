"use strict";
// userRoute
const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const router = express.Router();
const userController = require("../controllers/userController");
const { body } = require("express-validator");
const { sanitizeBody } = require('express-validator');

router.get("/", userController.user_list_get);
router.get("/:id", userController.user_get);

router.get("/user", (req, res) => {
  res.send("With this endpoint you can get users.");
});

router.post("/", upload.single("user"), (req, res, next) => {
  //req.body.filename = req.file.filename;
  next();
});
// Tupla escapet(), kummatkin tavat toimivia.


// router.post('/user', (req, res) => {
//     res.send('With this endpoint you can add users.');
//   });

// router.put('/user', (req, res) => {
//     res.send('With this endpoint you can edit users.');
//   });

// router.delete('/user', (req, res) => {
//     res.send('With this endpoint you can delete users.');
//   });

// router.get('/user/:id', (req, res) => {
//     res.send('You requested a user whose id is' + id);
// });

module.exports = router;
