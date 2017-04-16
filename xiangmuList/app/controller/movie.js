/**
 * Created by Administrator on 2017/4/11.
 */
var _ = require('underscore');
var Movie = require('../models/movie');

//用express设置  电影首页路由
exports.index = function (req, res, next) {
    console.log("********电影首页 GET 请求********");
    res.sendfile("xiangmuList/index.html");
}

//设置电影详情页路由
exports.filmdetail = function (req, res, next) {
    console.log("********电影详情页 GET 请求********");
    res.sendfile("xiangmuList/app/views/moviehtml/movieDetail.html");
}

//设置后台录入路由
exports.filmadmin = function (req, res, next) {
    console.log("********后台录入 GET 请求********");
    res.sendfile("xiangmuList/app/views/moviehtml/movieAdmin.html")
}

//设置电影列表路由
exports.filmlist = function (req, res, next) {
    console.log("********电影列表 GET 请求********");
    res.sendfile("xiangmuList/app/views/moviehtml/movieList.html");
}

//列表更新页
exports.filmupdate = function (req, res, next) {
    console.log("********电影详情页 GET 请求********");
    res.sendfile("xiangmuList/app/views/moviehtml/movieAdmin.html");
}

//******************************数据处理 路由分层**********************************************

//后台 电影主页和列表页 数据处理路由页
exports.filmListIndex = function (req, res, next) {
    console.log("********后台 电影主页和列表页  数据处理路由页********");

    Movie.fetch(function (err, movies) {
        //通过定义的fetch函数获取 数据库全部的 电影数据
        if (err) {
            console.log(err)
        }
        res.json({
            movies: movies
        })
    })
}

//后台 电影详情页和修改页 数据处理路由页
exports.filmchange = function (req, res, next) {
    console.log("********后台 电影详情页和修改页 数据处理 路由页********");
    var id = req.body._id;//获取客户端传来的 _id

    Movie.update({_id: id}, {$inc: {visitors: 1}}, function (err) {
        //修改器$inc可以对文档的某个值为数字型（只能为满足要求的数字）的键进行增减的操作。
        if (err) {
            console.log("访客量错误" + err);
        }
    });

    Movie.findById(id, function (err, movie) {
        //通过定义的findById函数获取 数据库指定id的 电影数据
        if (err) {
            console.log(err)
        }
        res.json({
            movie: movie
        })
    })
}

//后台 电影 删除页
exports.filmdelete = function (req, res) {
    // var id = req.body._id;//获取客户端传来的 _id
    var id = req.query.id;//获取 ？后面的 参数

    if (id) {
        Movie.remove({_id: id}, function (err, movie) {
            if (err) {
                console.log(err);
            }
            else {
                res.json({success: 1})
            }
        })
    }
}

//******************************数据存入 数据库 路由分层***************************************

//电影数据的存储(数据库)，加入一个路由.以及更新信息
exports.filmnew = function (req, res, next) {
    console.log("********后台录入数据库 post 请求********");
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie;

    if (id !== 'undefined') {
        Movie.findById(id, function (err, movie) {
            if (err) {
                console.log(err)
            }
            _movie = _.extend(movie, movieObj)
            _movie.save(function (err, movie) {
                if (err) {
                    console.log(err)
                }

                res.redirect('/movie/' + id);//重定向 到详情页
            })
        })
    }
    else {
        //创建一个想的对象模型
        _movie = new Movie({
            doctor: movieObj.doctor,
            title: movieObj.title,
            language: movieObj.language,
            country: movieObj.country,
            summary: movieObj.summary,
            flash: movieObj.flash,
            year: movieObj.year,
            poster: movieObj.poster
        })
        _movie.save(function (err, movie) {
            if (err) {
                console.log(err)
            }

            res.redirect('/film/list');//重定向 到列表页
        })
    }
};
