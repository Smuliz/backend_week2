"use strict";
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const mysql = require("mysql2");
const dotenv = require("dotenv").config();
const passport = require("./utils/pass")

const app = express();
const port = 3000;
const catRoute = require("./routes/catRoute.js");
const userRoute = require("./routes/userRoute.js");
const authRoute = require("./routes/authRoute.js")

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("uploads"));

app.use("/cat", passport.authenticate('jwt', {session:false}), catRoute);
app.use("/user", passport.authenticate('jwt', {session:false}), userRoute);
app.use("/auth", authRoute);

app.get("/", (req, res, next) => {
  res.json({ msg: "This is CORS-enabled for all origins!" });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
