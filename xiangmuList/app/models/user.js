/**
 * Created by Administrator on 2017/4/11.
 */
var mongoose = require('mongoose');
var UserSchema = require('../schemas/user.js');
var User = mongoose.model('User', UserSchema);

module.exports = User;