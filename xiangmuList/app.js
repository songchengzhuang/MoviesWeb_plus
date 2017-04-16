/**
 * Created by Administrator on 2017/3/18.
 * 作者：宋呈状
 * 入口文件。nodejs操作
 */
//**************************加载 模块，启动 web服务********************************************

var express = require('express'); //加载express模块
var path = require('path');
var mongoose = require('mongoose');//mongodb数据库模块
var session = require("cookie-session");//session会话模块，自动做了持久化.var session = require('express-session');//过时了
var logger = require("morgan");//npm install morgan --save
var bodyParser = require('body-parser');//需要载入body-parser中间件才可以使用req.body

var port = process.env.PORT || 3000; //设置端口号3000
var app = express(); //启动一个web服务器

mongoose.connect('mongodb://localhost/films');//在本地mongodb数据库创建films库

//app.set('views','../../views');
//app.set('views',path.join(__dirname +'./views'));//设置默认视图路径。
app.set('view engine', 'html') //设置默认的模板引擎
app.use(bodyParser.urlencoded({extended: true}))//将表单数据 编码解析
app.use(express.static(path.join(__dirname + '/public')));//设置静态资源的默认位置
app.use(bodyParser.urlencoded({extended: true})) //将表单数据 编码解析
app.use(bodyParser.json());//json数据类型

app.use(session({secret: "users"}));//会话预处理

//本地环境下 检测入口文件 运行状态,会在服务器下打印。
if ("development" === app.get("env")) {
    app.set("showStackError", true);//有错误会在控制台打印错误
    app.use(logger(":method:url:status"));//请求的 类型，路径，状态
    app.locals.pretty = true;//源码格式化，便于阅读
    mongoose.set("debug", true);//设置MongoDB开发调试环境

}

require("./config/routes.js")(app);//载入routes.js

app.listen(port);
console.log('web服务器已经启动，端口号为：' + port);


