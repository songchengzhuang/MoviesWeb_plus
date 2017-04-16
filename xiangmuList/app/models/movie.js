/**
 * Created by Administrator on 2017/3/21.
 */
var mongoose = require('mongoose');
var MovieSchema = require('../schemas/movie.js');
var Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;