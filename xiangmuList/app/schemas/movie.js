/**
 * Created by Administrator on 2017/3/21.
 */
var mongoose = require('mongoose');

var MovieSchema = new mongoose.Schema({
    doctor: String,//导演
    title: String,
    language: String,
    country: String,
    summary: String,//简介
    flash: String,//片源的地址
    poster: String,//海报的地址
    year: Number,
    visitors: {
        type: Number,
        defult: 0
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

MovieSchema.pre('save', function (next) {
//每次存储数据都会调用该方法
    if (this.isNew) {
        //判断数据是否为新
        this.mate.createAt = this.mate.updateAt = Date.now();
    }
    else {
        this.mate.updateAt = Date.now();
    }
    next();//存储流程走下去
})

MovieSchema.statics = {
    fetch: function (cb) {
        //取出数据库所有数据
        return this
            .find({})
            .sort('meta.updateAt')  //排序
            .exec(cb)
    },
    findById: function (id, cb) {
        //查询单条数据
        return this
            .findOne({_id: id})
            .exec(cb)
    }
}

module.exports = MovieSchema;     //导出