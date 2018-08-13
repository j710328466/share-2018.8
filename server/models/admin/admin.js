import mongoose from 'mongoose'

const Schema = mongoose.Schema

const adminSchema = new Schema({
  name: String,
  pwd: String,
  id: Number,
  createTime: String,
  admin: { type: String, default: '管理员' },
  level: { type: Number, default: 1 },  //  1:普通管理、 2:超级管理员
  avatar: { type: String, default: 'default.jpg' }
})

// adminSchema.index({ id: 1 });

const Admin = mongoose.model('Admin', adminSchema)

export default Admin
