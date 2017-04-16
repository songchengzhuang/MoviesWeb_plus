/**
 * Created by Administrator on 2017/4/11.
 */
var User = require('../app/controller/user');//user模块--"./"当前目录，"../"上级目录
var Movie = require('../app/controller/movie');//movie模块

module.exports = function (app) {

    //会话session处理
    app.get("/localuser", function (req, res, next) {

        var _user = req.session.user;
        //app.locals.user = _user;//app.locals在整个生命周期中有用，res.locals只在当前请求有用。
        console.log("会话用户状态：" + _user);
        if (_user == undefined) {
            res.json({
                _user: {
                    name: '',
                    role: ''
                }
            });
        }
        else {
            res.json({
                _user: {
                    name: _user.name,
                    role: _user.role
                }
            });
        }

        next();
    });


//*********************************电影 路由处理**********************************
    //User.signinRequired和User.adminRequired。这是中间件，又来权限管理。

    app.get('/index', Movie.index);// 电影首页
    app.get('/movie/:id', Movie.filmdetail);//电影详情页
    app.get('/update/:id', User.signinRequired, User.adminRequired, Movie.filmupdate);//列表更新页
    app.get('/film/admin', User.signinRequired, User.adminRequired, Movie.filmadmin);//movie后台录入
    app.get('/film/list', User.signinRequired, User.adminRequired, Movie.filmlist);//电影列表

    app.get('/film/index', Movie.filmListIndex);//后台 电影主页和列表页 数据处理路由页
    app.post('/film/movieDetail', Movie.filmchange);//后台 电影详情页和修改页 数据处理路由页
    app.delete('/film/delete', User.signinRequired, User.adminRequired, Movie.filmdelete);// 电影 删除页

    app.post('/save/film/new', Movie.filmnew);//电影数据的存储(数据库)，加入一个路由.以及更新信息


//***********************************用户 路由处理*************************************
    app.get('/signup', User.signup);//注册页面
    app.get('/signin', User.signin);//登录页面
    app.get('/user/update/:id', User.signinRequired, User.adminRequired, User.userupdate);//用户更新页
    app.get('/user/detail/:id', User.signinRequired, User.adminRequired, User.userdetail);//用户详情页
    app.get("/user/list", User.signinRequired, User.adminRequired, User.userlist);//列表 页

    app.post("/admin/signup", User.userSignup);//注册 数据处理页
    app.post("/admin/signin", User.userSignin);//登录 数据处理页
    app.post("/admin/update", User.signinRequired, User.adminRequired, User.userUpdate);//更新 数据处理
    app.get("/admin/list", User.userList);//user列表 数据处理

    app.post('/admin/changdetail', User.userDetail);//后台 用户 详情页和修改页 数据处理路由页
    app.delete('/admin/delete', User.signinRequired, User.adminRequired, User.userDelete);//后台 user 删除页

    app.get('/logout', User.userlogout);//退出登录
}