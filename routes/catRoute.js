"use strict";
// catRoute
const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const router = express.Router();
const catController = require("../controllers/catController");
const { body } = require("express-validator");

router.get("/", catController.cat_list_get);
router.get("/:id", catController.cat_get);

router.get("/cat", (req, res) => {
  res.send("With this endpoint you can get cats.");
});

router.post("/", upload.single("cat"), (req, res, next) => {
  // req.body.filename = req.file.filename;
  next();
});

router.post(
  "/",
  [
    body('name').isLength([1,]),
    body("age").isNumeric().isLength([1,]),
    body("weight").isNumeric().isLength([1,]),
    body("owner").isLength([1,]),
    body("cat").matches('\.(jpg|gif|png)$')
  ],
  catController.cat_create_post
);

router.put(
  "/",
  [
    body('name').isLength([1,]),
    body("age").isNumeric().isLength([1,]),
    body("weight").isNumeric().isLength([1,]),
    body("owner").isLength([1,]),
    body("cat").matches('\.(jpg|gif|png)$')
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
