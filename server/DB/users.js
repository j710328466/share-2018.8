const mongoose = require('mongoose')
const mongo = require('../lib/mongo')

// 定义数据库实例
var Users = new mongoose.Schema({
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

Users.methods.createData = function (data) {
    return new Promise((resolve, reject) => {
        UsersModel.create(data, (error, doc) => {
            if (error) {
                reject(error)
            } else {
                resolve(doc)
            }
        })
    })
}

Users.methods.checkData = function (data) {
    return new Promise((resolve, reject) => {
        UsersModel.find(data, (error, doc) => {
            if (error) {
                reject(error)
            } else {
                resolve(doc)
            }
        })
    })
}

Users.methods.findOnly = function (data) {
    return new Promise((resolve, reject) => {
        UsersModel.findOne(data, (error, doc) => {
            if (error) {
                reject(error)
            } else {
                resolve(doc)
            }
        })
    })
}

var UsersModel = mongo.model('users', Users, 'users')
var users = new UsersModel()

module.exports = users