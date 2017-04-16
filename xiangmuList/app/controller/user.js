/**
 * Created by Administrator on 2017/4/11.
 */
var _ = require('underscore');
var User = require('../models/user');//登录注册模块

//注册页面
exports.signup = function (req, res, next) {
    console.log("********注册 GET 请求********");
    res.sendfile("xiangmuList/app/views/userhtml/signup.html");
};

//登录页面
exports.signin = function (req, res, next) {
    console.log("********登录 GET 请求********");
    res.sendfile("xiangmuList/app/views/userhtml/signin.html");
};

//用户修改页
exports.userupdate = function (req, res, next) {
    console.log("********用户修改 GET 请求********");
    res.sendfile("xiangmuList/app/views/userhtml/userChange.html");
};
//用户详情页
exports.userdetail = function (req, res, next) {
    console.log("********用户详情页 GET 请求********");
    res.sendfile("xiangmuList/app/views/userhtml/userDetail.html");
};
//注册列表页list
exports.userlist = function (req, res, next) {
    console.log("********登录 GET 请求********");
    res.sendfile("xiangmuList/app/views/userhtml/userList.html");
};

//**********************************数据处理 分层**********************************************
//注册页数据处理
exports.userSignup = function (req, res, next) {
    var userObj = req.body.user;

    User.findOne({name: userObj.name}, function (err, user) {
        if (err) {
            console.log(err);
        }
        else if (user) {
            return res.redirect("/signin");
        }
        else {
            if (userObj.name == '' || userObj.password == '') {
                return res.redirect("/signup");
            }
            else {
                //注册user
                var user = new User({
                    name: userObj.name,
                    password: userObj.password,//密码
                    age: userObj.age,//年龄
                    //0普通用户
                    //1高级 用户
                    //2、3、4...预留（以备升级使用）
                    //11管理员
                    role: userObj.role
                });

                user.save(function (err, user) {
                    if (err) {
                        console.log(err);
                    }
                    console.log("检验name:" + user.name);

                    req.session.user = user;//会话存到内存中

                    res.redirect("/index");
                })
            }
        }
    })
};

//登录  数据处理

exports.userSignin = function (req, res, next) {
    var userObj = req.body.user;
    var name = userObj.name;
    var password = userObj.password;


    User.findOne({name: name}, function (err, user) {
        if (err) {
            console.log(err);
        }
        else if (!user || name == '') {
            console.log("该用户名不存在！");
            return res.redirect("/signup");
        }
        else {
            //比较加密后的密码
            user.comparePassword(password, function (err, isMatch) {
                if (err) {
                    console.log(err);
                }
                else if (isMatch) {
                    console.log("登录成功！");

                    req.session.user = user;//会话存到内存中
                    console.log("登录用户状态：" + req.session.user);

                    res.redirect("/index");
                }
                else {
                    console.log("用户名跟密码不匹配！！！");
                    return res.redirect("/signin");
                }
            });
        }
    })
};

//修改user 数据处理
exports.userUpdate = function (req, res, next) {
    var userObj = req.body.user;
    var id = req.body.user._id;
    var password = req.body.user.password;
    var _user;

    //更新user
    if (id !== 'undefined') {
        User.findById(id, function (err, user) {
            if (err) {
                console.log(err)
            }
            _user = _.extend(user, userObj)
            _user.save(function (err, user) {
                if (err) {
                    console.log(err)
                }

                res.redirect('/user/detail/' + id);//重定向 到详情页
            })
        })
    }
};

//user列表 数据处理
exports.userList = function (req, res, next) {

    User.fetch(function (err, users) {
        if (err) {
            console.log(err)
        }
        else {
            res.json({users: users});
        }
    })
};


//后台 用户 详情页和修改页 数据路由页
exports.userDetail = function (req, res, next) {
    console.log("********后台 用户详情页和修改页 数据请求路由页********");
    var id = req.body._id;//获取客户端传来的 _id
    User.findById(id, function (err, user) {
        //通过定义的findById函数获取 数据库指定id的 电影数据
        if (err) {
            console.log(err)
        }
        res.json({
            user: user
        })
    })
}

//后台 user 删除页
exports.userDelete = function (req, res) {
    var id = req.query.id;//获取 ？后面的 参数

    if (id) {
        User.remove({_id: id}, function (err, user) {
            if (err) {
                console.log(err);
            }
            else {
                res.json({success: 1})
            }
        })
    }
};

//退出登录
exports.userlogout = function (req, res, next) {
    delete req.session.user;//删除会话
    console.log("登录用户状态：" + req.session.user);
    res.redirect("/index");
};

//权限管理 ,中间件
exports.signinRequired = function (req, res, next) {

    var user = req.session.user;
    console.log("中间件状态：" + req.session.user);

    if (!user || user.role == '') {
        return res.redirect("/signin");
    }

    next();
};

//权限管理 ，管理员中间件。<10 的没权限
exports.adminRequired = function (req, res, next) {

    var user = req.session.user;

    if (user.role < 10) {
        return res.redirect("/index");
    }

    next();
};