# MoviesWeb_plus
此项目需要 电脑上 安装有 node+MongoDB数据库
app.js启动node服务器。
# 该项目是MoviesWeb的升级版，在原有的基础上，进行了优化了项目目录 和代码。
1.加了用户的登录注册

2.以及管理员的权限管理。

3.实现了用户的修改和删除。

4.密码实现了 MD5加盐（加密）

5.用户登录会话 ，做了持久化处理。

6.增加某个电影的访客量。

7。增加了首页 ，电影的增加效果，以及美化

 # 电影首页--localhost:3000/index
 
 电影详情页--localhost:3000/detail
 
 电影后台列表页--localhost:3000/film/list
 
 电影后台录入页--localhost:3000/film/admin
 
 用户 登录--localhost:3000/user/signin
 
 用户 注册--localhost:3000/user/signup
 
 用户 列表--localhost:3000/user/list
 
 用户 详情--localhost:3000/user/detail

因为注册用户的权限默认为0，权限大于10（不包括10）才能访问 后台页面。
所以，大家可以把config目录下的routes.js中的app.get("/user/list", User.signinRequired, User.adminRequired, User.userlist);//列表 页
----改成app.get("/user/list", User.userlist);//列表 页（去掉中间件），运行，进入localhost:3000/user/list，进行权限修改。

欢迎大家的下载和修改。
