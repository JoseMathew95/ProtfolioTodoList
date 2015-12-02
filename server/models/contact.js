// Import mongoose and bcrypt
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// need an alias for mongoose.Schema
var Schema = mongoose.Schema;

// Define our user Schema
var UserSchema = new Schema({
	name: String,
	email: String,
	phone: String,
	message: String
}, {
	collection: 'contactInfo'
});


module.exports = mongoose.model('Contact', UserSchema);