require("dotenv").config();

const express = require("express");
const nodemailer = require('nodemailer');
const app = express();
const path = require("path");

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('images'))

var transporter = nodemailer.createTransport({     
  host: "smtp.gmail.com",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL,
    clientId: process.env.ID,
    clientSecret: process.env.SECRET,
    refreshToken: process.env.TOKEN                      
  }
});

const emails = require("./app/data/emails");

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});

// app.get("/api/emails", function(req, res) {
//      res.json(emails);
// });

app.post("/api/emails", function(req, res) {

    emails.push(req.body);

    transporter.sendMail(emails[0], function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    // res.json(true)
});

app.get("/portfolio", function(req, res) {
res.sendFile(path.join(__dirname, "./public/portfolio.html"));
});

app.get("/contact", function(req, res) {
res.sendFile(path.join(__dirname, "./public/contact.html"));
});

app.get("*", function(req, res) {
res.sendFile(path.join(__dirname, "./public/index.html"));
});
