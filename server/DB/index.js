const mongoose = require('mongoose')
const mongo = require('../lib/mongo')

// 定义数据库实例
var baseSchema = new mongoose.Schema({
    name: String,
    pwd: String,
    sex: String,
    idCard: String,
    tel: Number
})

/**
 * 添加数据
 * @param  {[type]} data 需要保存的数据对象
 */

baseSchema.methods.createData = function (data) {
    return new Promise((resolve, reject) => {
        BaseModel.create(data, (error, doc) => {
            if (error) {
                reject(error)
            } else {
                resolve(doc)
            }
        })
    })
}

baseSchema.methods.checkData = function (data) {
    return new Promise((resolve, reject) => {
        BaseModel.find(data, (error, doc) => {
            if (error) {
                reject(error)
            } else {
                resolve(doc)
            }
        })
    })
}

baseSchema.methods.findOnly = function (data) {
    return new Promise((resolve, reject) => {
        BaseModel.findOne(data, (error, doc) => {
            if (error) {
                reject(error)
            } else {
                resolve(doc)
            }
        })
    })
}

var BaseModel = mongo.model('base', baseSchema, 'base')
var base = new BaseModel()

module.exports = base