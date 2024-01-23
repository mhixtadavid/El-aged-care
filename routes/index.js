var express         = require("express"),
    router          = express.Router(),
    passport        = require('passport'),
    User            = require('../models/user'),
    Clients         = require('../models/clients'),
    Assessments     = require('../models/assessments'),
    flash           = require('connect-flash'),
    nodemailer      = require('nodemailer');

router.get('/', (req, res) => {
    res.render('index')
});

router.get('/clients', (req, res) => {
    Clients.find()
    .then((allClients) => {
        res.render('client', {clients: allClients});
    })
    .catch((err) => {
        console.log(err);
    })
})

router.get('/:id', (req, res) => {
    Clients.findById
    Clients.find()
    .then((allAssessments) => {
        res.render('profile', {clients: allAssessments})
    })
    .catch((err) => {
        console.log(err)
    })
});

router.get('/contact-us', (req, res) => {
    res.render('contact')
});

router.post("/contact-us", function(req, res){
    var transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 587, false for other ports
            requireTLS: true,
            auth: {
                user: process.env.EMAIL, 
                pass: process.env.PASSWORD, 
            },
        });
    
    
    
    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: req.body.email, // sender address
        to: process.env.R_EMAIL, // list of receivers
        subject: req.body.subject, // Subject line
        //text: req.body.message, // plaintext body
        html: req.body.message + ", - " + req.body.name + ", " + req.body.email  // html body
    };
    
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
      req.flash("success", "Message sent successfully! You'll receive a reply shortly");
      res.redirect("/contact-us");
    });

    router.post('/clients/add', (req, res) => {
        //get data from the form and add it to the client array
        var firstName        = req.body.fname;
        var lastName         = req.body.lname;
        var gender           = req.body.gender;
        var age              = req.body.age;
        var town             = req.body.town;
        var state            = req.body.state;
        var phoneNumber      = req.body.pnumber;
        var email            = req.body.email;
        var address          = req.body.address;
        var comment          = req.body.comment;

        var newClient = {firstName: firstName, lastName: lastName, gender: gender, age:age, town: town, state: state, phoneNumber: phoneNumber, email: email, address: address, comment: comment}
        //Create a new client and save to the database
        Clients.create(newClient)
            .then((newlyCreated) => {
                res.redirect('/clients');
            })
            .catch((err) => {
                console.log(err)
            })  
        });

    router.post('/:id/add-assessment', (req, res) => {
        var temperature        = req.body.temperature;
        var respiratoryRate    = req.body.rRate;
        var heartRate          = req.body.hRate;
        var bloodPressure      = req.body.bPressure;
        var bloodSugar         = req.body.bSugar;
        var painLevel          = req.body.pLevel;
        var status             = req.body.status;

        var newAssessment = {temperature: temperature, respiratoryRate: respiratoryRate, heartRate: heartRate, bloodPressure: bloodPressure, bloodSugar: bloodSugar, painLevel: painLevel, status: status}

        Assessments.create(newAssessment)
        .then((newlyCreated) => {
            res.redirect('/clients');
        })
        .catch((err) => {
            console.log(err)
        })
    })

module.exports = router;