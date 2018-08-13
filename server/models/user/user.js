import mongoose from 'mongoose'
import mongo from '../../mongo/mongo'

const Schema = mongoose.Schema

const userSchema = new Schema({
  code: Number,
  data: {
    user_id: Number,
    userName: String,
    password: String,
    avatar: String,
    tel: Number,
    addr: String,
    createTime: String,
    updateTime: String
  }
})

const User = mongo.model('User', userSchema)

export default User
