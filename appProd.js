"use strict";
const express = require("express");
const cors = require("cors");
const passport = require("./utils/pass")
const fs      = require('fs');
const https   = require('https');


const app = express();
const port = 8000;
const httpsPort = 3000;
const catRoute = require("./routes/catRoute.js");
const userRoute = require("./routes/userRoute.js");
const authRoute = require("./routes/authRoute.js")

const sslkey  = fs.readFileSync('/etc/pki/tls/private/ca.key');
const sslcert = fs.readFileSync('/etc/pki/tls/certs/ca.crt');

app.use('/thumbnails', express.static('thumbnails'));

app.use(cors());

//force https
// app.use((req, res, next) => {
//     if (!req.secure) {
//         res.status(403).send('use https');
//     } else {
//         next();
//     }
// }

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("uploads"));

app.use("/auth", authRoute);
app.use("/cat", passport.authenticate('jwt', {session:false}), catRoute);
app.use("/user", passport.authenticate('jwt', {session:false}), userRoute);

// app.get("/", (req, res, next) => {
//   res.json({ msg: "This is CORS-enabled for all origins!" });
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
https.createServer(options, app).listen(httpsPort); //https traffic
