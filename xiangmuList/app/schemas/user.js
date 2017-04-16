/**
 * Created by Administrator on 2017/4/11.
 */
var mongoose = require('mongoose');
var md5 = require('js-md5');//引入MD5加密模块。(加盐)npm install js-md5 --save
var bcrypt = require("bcryptjs");//会生成一个随机的盐npm install bcrypt --save
SALT_WORK_FACTOR = 10;

//创建一个新的对象
var UserSchema = new mongoose.Schema({
    name: {
        unique: true,//姓名是唯一的
        type: String
    },
    password: String,//密码
    age: Number,//年龄
    //0普通用户
    //1高级 用户
    //2、3、4...预留（以备升级使用）
    //11管理员
    role: {
        type: Number,
        default: 0
    },
    mate: {
        createAt: {
            type: Date,
            defult: Date.now()
        },
        updateAt: {
            type: Date,
            defult: Date.now()
        }
    }
})

//保存对象
UserSchema.pre('save', function (next) {    //每次存储数据都会调用该方法

    var user = this;

    if (this.isNew) {
        //判断数据是否为新
        this.mate.createAt = this.mate.updateAt = Date.now();
    }
    else {
        this.mate.updateAt = Date.now();
    }

    //密码 加盐
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        //可通过bcrypt.genSalt(安全等级, function(err,返回的盐对象){......})加盐。
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, function (err, hash) {
            //通过bcrypt.hash(加密前的内容, 盐, 回调函数function(err,加密后的内容){......})
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });//生成随机的盐

    //next();  //异步执行，不然密码不加盐,存储流程走下去
});

//密码判断
UserSchema.methods = {
    comparePassword: function (_password, cb) {
        bcrypt.compare(_password, this.password, function (err, isMatch) {
            if (err) {
                return cb(err);
            }
            else {
                cb(null, isMatch);
            }
        })
    }
}

UserSchema.statics = {
    fetch: function (cb) {       //取出数据库所有数据
        return this
            .find({})
            .sort('meta.updateAt')  //排序
            .exec(cb)
    },
    findById: function (id, cb) {     //查询单条数据
        return this
            .findOne({_id: id})
            .exec(cb)
    }
}

module.exports = UserSchema;     //导出