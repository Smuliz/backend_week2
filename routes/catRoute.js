"use strict";
// catRoute
const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const router = express.Router();
const catController = require("../controllers/catController");
const { body } = require("express-validator");
const { sanitizeBody } = require('express-validator');

router.get("/", catController.cat_list_get);
router.get("/:id", catController.cat_get);

router.get("/cat", (req, res) => {
  res.send("With this endpoint you can get cats.");
});

router.post("/", upload.single("cat"), (req, res, next) => {
  // req.body.filename = req.file.filename;
  if (req.file === undefined) {
    res.json({
      error: 'No file',
    });
  } else if (!req.file.mimetype.includes('image')){
    res.json({
      error: 'Not an image',
    });
  } else {
    next();
  }
});
// Tupla escapet(), kummatkin tavat toimivia.
router.post(
  "/",
  [
    body('name').isLength({min: 1}).escape(),
    body("age").isNumeric().isLength({min: 1}),
    body("weight").isNumeric().isLength({min: 1}),
    body("owner").isLength({min: 1}),
    sanitizeBody('name').escape(),
  ],
  catController.cat_create_post
);

router.put(
  "/",
  [
    body('name').isLength({min: 1}).escape(),
    body("age").isNumeric().isLength({min: 1}),
    body("weight").isNumeric().isLength({min: 1}),
    body("owner").isLength({min: 1}),
    sanitizeBody('name').escape(),
  ],
  catController.cat_update_put
);

router.delete("/:id", catController.cat_delete);

// router.post('/cat', (req, res) => {
//     res.send('With this endpoint you can add cats.');
//   });

// router.put('/cat', (req, res) => {
//     res.send('With this endpoint you can edit cats.');
//   });

// router.delete('/cat', (req, res) => {
//     res.send('With this endpoint you can delete cats.');
//   });

// router.get('/cat/:id', (req, res) => {
//     res.send('You requested a cat whose id is' + id);
// });

module.exports = router;
