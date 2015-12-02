var express = require('express');

var router = express.Router();

var Contact = require('../models/contact');


router.get('/',  function (req, res, next) {
    Contact.find(function (err, contacts) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('contacts/index', {
                title: 'Contacts',
                contacts: contacts,
                displayName: req.user ? req.user.displayName : ''
            });
        }
    });
});


router.get('/add',  function (req, res, next) {
    res.render('contacts/add', {
        title: 'Contacts',
        displayName: req.user ? req.user.displayName : ''
    });
});



router.post('/add', function(req,res,next) {
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
      res.redirect('/contacts');
    }
  });
   });
   
   
router.get('/:id',  function (req, res, next) {
    // create an id variable
    var id = req.params.id;
    // use mongoose and our model to find the right user
    Contact.findById(id, function (err, contact) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            //show the edit view
            res.render('contacts/edit', {
                title: 'Contacts',
                contact: contact,
                displayName: req.user ? req.user.displayName : ''
            });
        }
    });
});


router.post('/:id',  function (req, res, next) {
    var id = req.params.id;
    var contact = new Contact({
    
    _id : id,
    name : req.body.name,
    email : req.body.email,
    message : req.body.message
    
    });
    // use mongoose to do the update
    Contact.update({ _id : id }, contact, function (err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/contacts');
        }
    });
});



//deleting the contact
router.get('/delete/:id',  function (req, res, next) {
    var id = req.params.id;
    Contact.remove({ _id: id }, function (err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/contacts');
        }
    });
});

module.exports = router;