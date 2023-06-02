const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:String,
    phone:Number,
    role:String

});

mongoose.model('users' , userSchema);
module.exports = mongoose.model('users');