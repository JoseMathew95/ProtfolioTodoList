var express = require('express');
var passport = require('passport');
var router = express.Router();

var User = require('../models/user');
var Contact = require('../models/contact');

/* Render home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Home',
        displayName: req.user ? req.user.displayName : ''
    });
});

/* Render Contact Page. */
router.get('/contactForm', function (req, res, next) {
    res.render('contactForm', {
        title: 'Contact_Form',
        displayName: req.user ? req.user.displayName : ''
    });
});

router.post('/contactForm', function (req, res, next) {
   Contact.create({
       name: req.body.name,
       email: req.body.email,
       phone: req.body.phone,
       message: req.body.message},
       function (err, Contact){if(err) {
      console.log(err);
      req.end(err);
    }
    else{
      res.redirect('/');
    }
  });
   });
   
   
   
  



/* Render Login page. */
router.get('/login', function (req, res, next) {
    if (!req.user) {
        res.render('login', {
            title: 'Login',
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else {
        return res.redirect('/users');
    }
});

/* Process the Login Request */
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/contacts',
    failureRedirect: '/login',
    failureFlash: true
}));

/* Show Registration Page */
router.get('/register', function (req, res, next) {
    if (!req.user) {
        res.render('register', {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else {
        return res.redirect('/');
    }
});

/* POST signup data. */
router.post('/register', passport.authenticate('local-registration', {
    //Success go to Profile Page / Fail go to Signup page
    successRedirect : '/contacts',
    failureRedirect : '/register',
    failureFlash : true
}));


/* Process Logout Request */
router.get('/logout', function (req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;


/* Show Todo List Page */
router.get('/todolist', function (req, res, next) {

        res.render('todolist', {
            title: 'Todos',
            displayName: req.user ? req.user.displayName : '',
            username: req.user ? req.user.username : '' 
        });

});