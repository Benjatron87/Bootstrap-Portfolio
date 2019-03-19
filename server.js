    // var config = {
    //     apiKey: "AIzaSyDRl7cubdOdfy-8rUZ2x_MhKy_TZuTlFk0",
    //     authDomain: "portfolio-contact-5eb08.firebaseapp.com",
    //     databaseURL: "https://portfolio-contact-5eb08.firebaseio.com",
    //     projectId: "portfolio-contact-5eb08",
    //     storageBucket: "portfolio-contact-5eb08.appspot.com",
    //     messagingSenderId: "1061816302264"
    //   };
    //   firebase.initializeApp(config);

    //   let database = firebase.database();

    // $(".reload").on('click', function(){

    //     window.location.reload(true);

    // })

    // $(".submit").on('click', function(){

    //     var name = $("#name").val().trim();
    //     var email = $("#email").val().trim();
    //     var phone = $("#phone").val().trim();
    //     var subject = $("#subject").val().trim();
    //     var message = $("#message").val().trim();

    //     database.ref().push({
    //         name: name,
    //         email: email,
    //         phone: phone,
    //         subject: subject,
    //         message: message
    //     });

    //     $(".form-control").val('');
    //     $("#hide").empty();

    //     $("#thank-you").html('Thank You For Your Response!');

    //     $(".submit").removeAttr('class', 'submit').addClass('reload');
    // })

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
    // refreshToken: process.env.TOKEN                      
  }
});

const emails = require("./app/data/emails");

transporter.sendMail(emails[0], function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});

app.get("/api/emails", function(req, res) {
res.json(emails);
});

app.post("/api/emails", function(req, res) {

    emails.push(req.body);

    res.json(true)
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
