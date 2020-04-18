"use strict";

var mongose = require('mongoose');

var bcrypt = require('bcryptjs');

var saltRounds = 10;
var Schema = mongose.Schema;
var UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    trim: true,
    required: true,
    select: false
  },
  role: {
    type: String,
    trim: true,
    "default": 'ADMIN'
  }
}, {
  versionKey: false
});
UserSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});
module.exports = mongose.model('Users', UserSchema);